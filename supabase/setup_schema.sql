-- 1. CLEANUP: Drop conflicting tables
DROP TABLE IF EXISTS public.athlete_videos CASCADE;
DROP TABLE IF EXISTS public.athlete_profiles CASCADE;
DROP TABLE IF EXISTS public.scout_profiles CASCADE;
DROP TABLE IF EXISTS public.analysis_reports CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.profiller CASCADE; -- Drop the Turkish version

-- 2. CREATE PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('athlete', 'scout', 'admin')) NOT NULL DEFAULT 'athlete',
  full_name TEXT,
  email TEXT,
  phone TEXT,
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'pro', 'elite')) DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  subscription_period_end TIMESTAMPTZ,
  lemon_customer_id TEXT,
  lemon_subscription_id TEXT,
  lemon_variant_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE ATHLETE_PROFILES TABLE
CREATE TABLE public.athlete_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  birth_date DATE,
  nationality TEXT,
  city TEXT,
  height_cm INT,
  weight_kg INT,
  dominant_foot TEXT,
  sport TEXT DEFAULT 'Football',
  position TEXT,
  current_club TEXT,
  bio TEXT, -- Changed from biography to bio to match player-register/page.tsx
  avatar_url TEXT,
  rating INT DEFAULT 0, -- Added for power ranking
  is_published BOOLEAN DEFAULT true,
  profile_views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE SCOUT_PROFILES TABLE
CREATE TABLE public.scout_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  club_or_agency TEXT, -- Changed to match scout-register/page.tsx
  country TEXT, -- Changed to match scout-register/page.tsx
  years_experience INT, -- Changed to match scout-register/page.tsx
  license_number TEXT, -- Changed to match scout-register/page.tsx
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT true,
  profile_views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CREATE ATHLETE_VIDEOS TABLE
CREATE TABLE public.athlete_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES public.athlete_profiles(id) ON DELETE CASCADE, -- Changed from athlete_profile_id to athlete_id to match player-register/page.tsx
  video_url TEXT, -- Made optional for initial insert
  storage_path TEXT, -- Added for player-register/page.tsx compatibility
  title TEXT,
  description TEXT,
  video_type TEXT CHECK (video_type IN ('match', 'training', 'highlight')),
  is_primary BOOLEAN DEFAULT false,
  mux_asset_id TEXT,
  mux_playback_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CREATE ANALYSIS_REPORTS TABLE
CREATE TABLE public.analysis_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id UUID REFERENCES public.profiles(id),
  athlete_id UUID REFERENCES public.athlete_profiles(id),
  mode TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CREATE TRANSFER_LISTINGS TABLE
CREATE TABLE public.transfer_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES public.athlete_profiles(id) ON DELETE SET NULL, -- Optional link to platform athlete
  full_name TEXT NOT NULL,
  position TEXT,
  age INT,
  image_url TEXT,
  features JSONB DEFAULT '{}',
  description TEXT,
  price TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scout_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfer_listings ENABLE ROW LEVEL SECURITY;

-- 9. RLS POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Athlete profiles are viewable by everyone" ON public.athlete_profiles FOR SELECT USING (is_published = true);
CREATE POLICY "Athletes can insert own athlete profile" ON public.athlete_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Athletes can update own athlete profile" ON public.athlete_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Athletes can delete own athlete profile" ON public.athlete_profiles FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Scout profiles are viewable by everyone" ON public.scout_profiles FOR SELECT USING (is_published = true);
CREATE POLICY "Scouts can insert own scout profile" ON public.scout_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Scouts can update own scout profile" ON public.scout_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Scouts can delete own scout profile" ON public.scout_profiles FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Transfer listings are viewable by everyone" ON public.transfer_listings FOR SELECT USING (is_published = true);
CREATE POLICY "Scouts can manage own transfer listings" ON public.transfer_listings FOR ALL USING (scout_id = auth.uid());

CREATE POLICY "Videos are viewable by everyone" ON public.athlete_videos FOR SELECT USING (true);
CREATE POLICY "Athletes can manage own videos" ON public.athlete_videos FOR ALL USING (
  athlete_id IN (SELECT id FROM public.athlete_profiles WHERE user_id = auth.uid())
);

-- 9. TRIGGER FOR NEW USER
-- Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'athlete')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
