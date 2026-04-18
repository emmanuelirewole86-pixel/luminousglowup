-- Add AI-vision detection fields and recommendations to scans
ALTER TABLE public.scans
  ADD COLUMN IF NOT EXISTS eye_color text,
  ADD COLUMN IF NOT EXISTS hair_color text,
  ADD COLUMN IF NOT EXISTS skin_tone text,
  ADD COLUMN IF NOT EXISTS face_shape text,
  ADD COLUMN IF NOT EXISTS recommendations jsonb;

-- Chat messages for the Discover AI coach
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user','assistant','system')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON public.chat_messages FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS chat_messages_user_created_idx
  ON public.chat_messages (user_id, created_at);