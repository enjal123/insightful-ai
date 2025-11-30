-- Create enum for review platforms
CREATE TYPE public.review_platform AS ENUM ('google', 'yelp');

-- Create enum for review sentiment
CREATE TYPE public.review_sentiment AS ENUM ('positive', 'neutral', 'negative');

-- Table for storing OAuth credentials and platform connections
CREATE TABLE public.platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform review_platform NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  business_id TEXT NOT NULL,
  business_name TEXT,
  business_email TEXT,
  is_active BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_synced_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, platform, business_id)
);

-- Table for storing reviews from all platforms
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_connection_id UUID NOT NULL REFERENCES public.platform_connections(id) ON DELETE CASCADE,
  platform review_platform NOT NULL,
  platform_review_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_profile_photo TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMPTZ NOT NULL,
  sentiment review_sentiment,
  language TEXT,
  is_replied BOOLEAN DEFAULT false,
  ai_replied BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  verified_purchase BOOLEAN DEFAULT false,
  review_photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(platform, platform_review_id)
);

-- Table for storing review responses (both from business and existing responses)
CREATE TABLE public.review_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  response_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_from_platform BOOLEAN DEFAULT false,
  ai_generated BOOLEAN DEFAULT false,
  ai_tone TEXT,
  ai_length TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for storing reviewer profiles
CREATE TABLE public.reviewer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform review_platform NOT NULL,
  platform_reviewer_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  profile_photo TEXT,
  location TEXT,
  total_reviews INTEGER DEFAULT 0,
  is_elite BOOLEAN DEFAULT false,
  local_guide_level INTEGER,
  profile_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(platform, platform_reviewer_id)
);

-- Link reviewers to reviews
ALTER TABLE public.reviews ADD COLUMN reviewer_profile_id UUID REFERENCES public.reviewer_profiles(id);

-- Enable Row Level Security
ALTER TABLE public.platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviewer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for platform_connections
CREATE POLICY "Users can view their own platform connections"
  ON public.platform_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own platform connections"
  ON public.platform_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own platform connections"
  ON public.platform_connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own platform connections"
  ON public.platform_connections FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Users can view reviews from their connected platforms"
  ON public.reviews FOR SELECT
  USING (
    platform_connection_id IN (
      SELECT id FROM public.platform_connections WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (
    platform_connection_id IN (
      SELECT id FROM public.platform_connections WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update reviews from their platforms"
  ON public.reviews FOR UPDATE
  USING (
    platform_connection_id IN (
      SELECT id FROM public.platform_connections WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for review_responses
CREATE POLICY "Users can view responses for their reviews"
  ON public.review_responses FOR SELECT
  USING (
    review_id IN (
      SELECT r.id FROM public.reviews r
      INNER JOIN public.platform_connections pc ON r.platform_connection_id = pc.id
      WHERE pc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert responses for their reviews"
  ON public.review_responses FOR INSERT
  WITH CHECK (
    review_id IN (
      SELECT r.id FROM public.reviews r
      INNER JOIN public.platform_connections pc ON r.platform_connection_id = pc.id
      WHERE pc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their responses"
  ON public.review_responses FOR UPDATE
  USING (
    review_id IN (
      SELECT r.id FROM public.reviews r
      INNER JOIN public.platform_connections pc ON r.platform_connection_id = pc.id
      WHERE pc.user_id = auth.uid()
    )
  );

-- RLS Policies for reviewer_profiles (read-only for users)
CREATE POLICY "Users can view reviewer profiles for their reviews"
  ON public.reviewer_profiles FOR SELECT
  USING (
    id IN (
      SELECT reviewer_profile_id FROM public.reviews r
      INNER JOIN public.platform_connections pc ON r.platform_connection_id = pc.id
      WHERE pc.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX idx_platform_connections_user_id ON public.platform_connections(user_id);
CREATE INDEX idx_platform_connections_platform ON public.platform_connections(platform);
CREATE INDEX idx_reviews_platform_connection ON public.reviews(platform_connection_id);
CREATE INDEX idx_reviews_platform ON public.reviews(platform);
CREATE INDEX idx_reviews_sentiment ON public.reviews(sentiment);
CREATE INDEX idx_reviews_is_replied ON public.reviews(is_replied);
CREATE INDEX idx_review_responses_review_id ON public.review_responses(review_id);
CREATE INDEX idx_reviewer_profiles_platform_id ON public.reviewer_profiles(platform, platform_reviewer_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_review_responses_updated_at
  BEFORE UPDATE ON public.review_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviewer_profiles_updated_at
  BEFORE UPDATE ON public.reviewer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();