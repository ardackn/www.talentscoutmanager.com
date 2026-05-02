-- FIX RLS: Allow INSERT during registration (user is authenticated after signUp)
-- The trigger handles profile creation, but we also allow manual inserts for robustness

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Athlete profiles are viewable by everyone" ON public.athlete_profiles;
DROP POLICY IF EXISTS "Athletes can update own athlete profile" ON public.athlete_profiles;
DROP POLICY IF EXISTS "Scout profiles are viewable by everyone" ON public.scout_profiles;
DROP POLICY IF EXISTS "Scouts can update own scout profile" ON public.scout_profiles;
DROP POLICY IF EXISTS "Videos are viewable by everyone" ON public.athlete_videos;
DROP POLICY IF EXISTS "Athletes can manage own videos" ON public.athlete_videos;

-- =====================
-- PROFILES TABLE POLICIES
-- =====================
-- SELECT: Anyone can read profiles (public)
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);

-- INSERT: Only authenticated users can insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE: Only own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- DELETE: Only own profile
CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- =====================
-- ATHLETE_PROFILES TABLE POLICIES
-- =====================
-- SELECT: Anyone can read published athlete profiles
CREATE POLICY "athlete_profiles_select_published" ON public.athlete_profiles
  FOR SELECT USING (is_published = true);

-- INSERT: Authenticated users can create athlete profile (for themselves)
CREATE POLICY "athlete_profiles_insert_own" ON public.athlete_profiles
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

-- UPDATE: Athletes can update own profile
CREATE POLICY "athlete_profiles_update_own" ON public.athlete_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- DELETE: Athletes can delete own profile
CREATE POLICY "athlete_profiles_delete_own" ON public.athlete_profiles
  FOR DELETE USING (user_id = auth.uid());

-- =====================
-- SCOUT_PROFILES TABLE POLICIES
-- =====================
-- SELECT: Anyone can read scout profiles
CREATE POLICY "scout_profiles_select_all" ON public.scout_profiles
  FOR SELECT USING (is_published = true);

-- INSERT: Authenticated scouts can create their profile
CREATE POLICY "scout_profiles_insert_own" ON public.scout_profiles
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

-- UPDATE: Scouts can update own profile
CREATE POLICY "scout_profiles_update_own" ON public.scout_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- DELETE: Scouts can delete own profile
CREATE POLICY "scout_profiles_delete_own" ON public.scout_profiles
  FOR DELETE USING (user_id = auth.uid());

-- =====================
-- ATHLETE_VIDEOS TABLE POLICIES
-- =====================
-- SELECT: Anyone can view videos
CREATE POLICY "athlete_videos_select_all" ON public.athlete_videos
  FOR SELECT USING (true);

-- INSERT: Athletes can upload videos to their own profile
CREATE POLICY "athlete_videos_insert_own" ON public.athlete_videos
  FOR INSERT WITH CHECK (
    athlete_id IN (
      SELECT id FROM public.athlete_profiles WHERE user_id = auth.uid()
    )
  );

-- UPDATE: Athletes can update their own videos
CREATE POLICY "athlete_videos_update_own" ON public.athlete_videos
  FOR UPDATE USING (
    athlete_id IN (
      SELECT id FROM public.athlete_profiles WHERE user_id = auth.uid()
    )
  );

-- DELETE: Athletes can delete their own videos
CREATE POLICY "athlete_videos_delete_own" ON public.athlete_videos
  FOR DELETE USING (
    athlete_id IN (
      SELECT id FROM public.athlete_profiles WHERE user_id = auth.uid()
    )
  );

-- =====================
-- ANALYSIS_REPORTS TABLE POLICIES
-- =====================
DROP POLICY IF EXISTS "athlete_profiles_select_all" ON public.analysis_reports;

CREATE POLICY "analysis_reports_select_own" ON public.analysis_reports
  FOR SELECT USING (
    scout_id = auth.uid()
    OR athlete_id IN (
      SELECT id FROM public.athlete_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "analysis_reports_insert_own" ON public.analysis_reports
  FOR INSERT WITH CHECK (scout_id = auth.uid());
