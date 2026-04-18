import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Msg { role: "user" | "assistant"; content: string; }

const SUGGESTIONS = [
  "Build me a 4-day push/pull/legs split",
  "What's the best meal before a heavy workout?",
  "How do I get a sharper jawline?",
  "Skincare routine for oily skin",
];

const DiscoverChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history
  useEffect(() => {
    if (!user) return;
    supabase
      .from("chat_messages")
      .select("role, content")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(100)
      .then(({ data }) => {
        if (data) setMessages(data.map(d => ({ role: d.role as "user" | "assistant", content: d.content })));
        setHistoryLoaded(true);
      });
  }, [user]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const persist = async (role: "user" | "assistant", content: string) => {
    if (!user) return;
    await supabase.from("chat_messages").insert({ user_id: user.id, role, content });
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    persist("user", text);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discover-chat`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });

      if (resp.status === 429) { toast.error("Too many requests, slow down"); setLoading(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted — add funds in workspace"); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (assistantSoFar) await persist("assistant", assistantSoFar);
    } catch (e: any) {
      toast.error(e.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (!user) return;
    await supabase.from("chat_messages").delete().eq("user_id", user.id);
    setMessages([]);
    toast.success("Chat cleared");
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
      <div className="flex items-center justify-between px-5 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Forge Coach</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="text-[11px] text-muted-foreground flex items-center gap-1 hover:text-destructive">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 space-y-3 pb-3">
        {historyLoaded && messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Ask anything</p>
              <p className="text-xs text-muted-foreground mt-1">Health • Fitness • Nutrition • Grooming • Style</p>
            </div>
            <div className="space-y-2 max-w-sm mx-auto">
              {SUGGESTIONS.map(s => (
                <motion.button key={s} whileTap={{ scale: 0.97 }} onClick={() => send(s)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-card/60 backdrop-blur-xl border border-border text-xs text-foreground hover:border-primary/40 transition-colors">
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card/70 backdrop-blur-xl border border-border text-foreground rounded-tl-sm"
              }`}>
                {m.role === "user" ? (
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>*]:my-1 [&_ul]:my-1 [&_li]:my-0">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-card/70 border border-border">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="px-5 pt-2">
        <div className="relative">
          <input value={input} onChange={e => setInput(e.target.value)} disabled={loading}
            placeholder="Ask Forge Coach…"
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-card/70 backdrop-blur-xl border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
          <motion.button whileTap={{ scale: 0.9 }} type="submit" disabled={loading || !input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default DiscoverChat;
