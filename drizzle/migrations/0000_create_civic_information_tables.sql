CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  office TEXT NOT NULL CHECK (office IN ('Mayor', 'Council')),
  website TEXT,
  email TEXT,
  response_received BOOLEAN NOT NULL DEFAULT false,
  response_date DATE,
  question_1 TEXT,
  question_2 TEXT,
  question_3 TEXT,
  response_source TEXT,
  notes TEXT,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.candidates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.candidates TO authenticated;
GRANT ALL ON public.candidates TO service_role;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates are publicly readable" ON public.candidates FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  published_date DATE,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  summary TEXT NOT NULL,
  primary_source BOOLEAN NOT NULL DEFAULT false,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sources TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sources TO authenticated;
GRANT ALL ON public.sources TO service_role;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sources are publicly readable" ON public.sources FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.community_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  relationship TEXT NOT NULL,
  story TEXT NOT NULL,
  consent_to_publish BOOLEAN NOT NULL DEFAULT false,
  review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'declined')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.community_stories TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.community_stories TO authenticated;
GRANT ALL ON public.community_stories TO service_role;
ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Residents may submit stories" ON public.community_stories FOR INSERT TO anon, authenticated WITH CHECK (review_status = 'pending');

CREATE INDEX candidates_name_idx ON public.candidates (name);
CREATE INDEX sources_category_date_idx ON public.sources (category, published_date DESC);
CREATE INDEX community_stories_status_idx ON public.community_stories (review_status, submitted_at DESC);