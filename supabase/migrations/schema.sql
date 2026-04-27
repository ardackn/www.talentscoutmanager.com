-- Complete TSM Supabase Schema from Prompt 2 (merge with existing)
-- Execute in Supabase SQL Editor after backing up

-- Existing tables assumed (profiles, athletes, athlete_profiles, etc.)

-- PROFILES TABLE (extend if needed)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT CHECK (role IN ('athlete', 'scout')) NOT NULL DEFAULT 'athlete';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT CHECK (subscription_tier IN ('free', 'pro', 'elite')) DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS lemon_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS lemon_subscription_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS lemon_variant_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_period_end TIMESTAMPTZ;

-- ATHLETE VIDEOS
CREATE TABLE IF NOT EXISTS athlete_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_type TEXT CHECK (video_type IN ('match', 'training', 'highlight')),
  mux_asset_id TEXT,
  mux_playback_id TEXT,
  duration_seconds INT,
  thumbnail_url TEXT,
  youtube_url TEXT,
  is_primary BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ATHLETE PHOTOS
CREATE TABLE IF NOT EXISTS athlete_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCOUT PROFILES
CREATE TABLE IF NOT EXISTS scout_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  club_or_agency TEXT,
  country TEXT,
  region TEXT,
  license_number TEXT,
  years_experience INT,
  interested_sports TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SAVED ATHLETES
CREATE TABLE IF NOT EXISTS scout_saved_athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id UUID REFERENCES scout_profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  notes TEXT,
  tags TEXT[],
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(scout_id, athlete_id)
);

-- TRANSFER LISTINGS
CREATE TABLE IF NOT EXISTS transfer_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id UUID REFERENCES scout_profiles(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  player_age INT,
  nationality TEXT,
  position TEXT,
  height_cm INT,
  weight_kg INT,
  sport TEXT,
  current_club TEXT,
  status TEXT CHECK (status IN ('for_sale', 'on_loan')) NOT NULL,
  asking_fee_eur DECIMAL(12,2),
  notes TEXT,
  photo_url TEXT,
  video_url TEXT,
  mux_playback_id TEXT,
  athlete_id UUID REFERENCES athlete_profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT REQUESTS
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id UUID REFERENCES scout_profiles(id),
  athlete_id UUID REFERENCES athlete_profiles(id),
  scout_message TEXT,
  preferred_contact_time TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scout_saved_athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes manage own profile" ON athlete_profiles FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Public profiles viewable" ON athlete_profiles FOR SELECT USING (is_published = true);
CREATE POLICY "Scouts manage own profile" ON scout_profiles FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Scouts see own saved" ON scout_saved_athletes FOR ALL USING (scout_id IN (SELECT id FROM scout_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Elite scouts manage listings" ON transfer_listings FOR ALL USING (scout_id IN (SELECT sp.id FROM scout_profiles sp JOIN profiles p ON p.id = sp.user_id WHERE p.id = auth.uid() AND p.subscription_tier = 'elite'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_athlete_profiles_slug ON athlete_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_athlete_profiles_published ON athlete_profiles(is_published);
CREATE INDEX IF NOT EXISTS idx_athlete_videos_athlete ON athlete_videos(athlete_id);
CREATE INDEX IF NOT EXISTS idx_transfer_listings_active ON transfer_listings(is_active);

