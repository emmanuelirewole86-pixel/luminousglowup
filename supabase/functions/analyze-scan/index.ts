import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are an expert AI face analyst for the Forge men's grooming and lifestyle app.
Analyze the provided face photo and return ONLY structured data via the provided tool.
Be specific and helpful. Avoid medical claims. Be encouraging in recommendations.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "imageBase64 required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not set");

    const dataUrl = imageBase64.startsWith("data:")
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this face and call the tool with the results." },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_face_analysis",
              description: "Detailed face analysis with personalized recommendations.",
              parameters: {
                type: "object",
                properties: {
                  eye_color: { type: "string", description: "e.g. Brown, Hazel, Blue" },
                  hair_color: { type: "string", description: "e.g. Black, Dark Brown, Blonde" },
                  skin_tone: { type: "string", description: "e.g. Fair, Olive, Medium, Deep" },
                  face_shape: {
                    type: "string",
                    enum: ["Oval", "Round", "Square", "Oblong", "Heart", "Diamond"],
                  },
                  recommendations: {
                    type: "object",
                    properties: {
                      hairstyles: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            why: { type: "string", description: "Why it suits this face" },
                          },
                          required: ["name", "why"],
                        },
                        description: "3-4 hairstyle suggestions tailored to face shape & hair color",
                      },
                      skincare: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            step: { type: "string", description: "e.g. Cleanser, SPF" },
                            product_type: { type: "string" },
                            tip: { type: "string" },
                          },
                          required: ["step", "product_type", "tip"],
                        },
                        description: "4-6 skincare routine steps tailored to skin tone",
                      },
                      lifestyle: {
                        type: "array",
                        items: { type: "string" },
                        description: "3-5 grooming / lifestyle tips",
                      },
                    },
                    required: ["hairstyles", "skincare", "lifestyle"],
                  },
                },
                required: ["eye_color", "hair_color", "skin_tone", "face_shape", "recommendations"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report_face_analysis" } },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("AI gateway error", response.status, text);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again in a minute." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace settings." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No analysis returned" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-scan error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
