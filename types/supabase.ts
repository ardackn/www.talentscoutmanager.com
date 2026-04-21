export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type TableDef<Row = Record<string, any>, Insert = Record<string, any>, Update = Record<string, any>> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: any[]
}

export interface Database {
  public: {
    Tables: {
      profiles: TableDef<{
        id: string
        role: string
        subscription_tier: string
        lemon_customer_id?: string | null
        lemon_subscription_id?: string | null
        lemon_variant_id?: string | null
        subscription_status: string
        subscription_period_end?: string | null
        created_at: string
        updated_at?: string | null
        user_id?: string | null
        full_name?: string | null
        email?: string | null
        phone?: string | null
        status?: string | null
      }>
      athletes: TableDef<{
        id: string
        name: string
        position: string
        nationality: string
        current_team: string
        speed: number
        skill: number
        jumping: number
        agility: number
        stamina: number
        image: string
        email: string
        phone: string | null
        created_at: string
      }>
      athlete_profiles: TableDef<{
        id: string
        user_id: string
        slug: string
        full_name: string
        birth_date: string
        nationality: string
        country_code: string
        city: string
        height_cm?: number | null
        weight_kg?: number | null
        dominant_foot?: string | null
        sport: string
        position: string
        current_club: string
        years_playing?: number | null
        is_licensed: boolean
        has_international_experience: boolean
        avatar_url?: string | null
        cover_url?: string | null
        instagram_handle?: string | null
        youtube_url?: string | null
        tiktok_handle?: string | null
        twitter_handle?: string | null
        bio?: string | null
        is_published: boolean
        profile_views?: number | null
        created_at: string
        updated_at?: string | null
      }>
      messages: TableDef<{
        id: string
        scout_id: string
        athlete_id: string
        content: string
        status: 'sent' | 'read'
        created_at: string
      }>
      contact_messages: TableDef<{
        id: string
        scout_id: string
        athlete_id: string
        scout_name: string
        scout_club: string | null
        message: string
        contact_email: string
        status: string
        created_at: string
      }>
      analysis_reports: TableDef<{
        id: string
        scout_id: string
        athlete_name: string
        match_info?: string | null
        video_url?: string | null
        mux_asset_id?: string | null
        overall_score?: number | null
        technical_skill?: number | null
        speed_agility?: number | null
        ball_control?: number | null
        tactical_awareness?: number | null
        physical_condition?: number | null
        potential_rating?: string | null
        ai_commentary?: string | null
        recommended_positions?: string[] | null
        development_areas?: string[] | null
        scout_recommendation?: string | null
        pdf_url?: string | null
        status: string
        created_at: string
        athlete_id?: string | null
        mode?: string | null
        payload?: Json | null
      }>
        athlete_videos: TableDef<{
          id: string
          athlete_id: string
          title: string
          description?: string | null
          video_type: string
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          duration_seconds?: number | null
          thumbnail_url?: string | null
          youtube_url?: string | null
          is_primary: boolean
          view_count?: number | null
          created_at: string
        }>,
        athlete_photos: TableDef<{
          id: string
          athlete_id: string
          storage_path: string
          public_url: string
          caption?: string | null
          sort_order?: number | null
          created_at: string
        }>,
        scout_profiles: TableDef<{
          id: string
          user_id: string
          full_name: string
          avatar_url?: string | null
          club_or_agency?: string | null
          country?: string | null
          region?: string | null
          license_number?: string | null
          years_experience?: number | null
          interested_sports?: string[] | null
          created_at: string
        }>,
        scout_saved_athletes: TableDef<{
          id: string
          scout_id: string
          athlete_id: string
          notes?: string | null
          tags?: string[] | null
          saved_at: string
        }>,
        transfer_listings: TableDef<{
          id: string
          scout_id: string
          player_name: string
          player_age?: number | null
          nationality: string
          position: string
          height_cm?: number | null
          weight_kg?: number | null
          sport: string
          current_club: string
          status: string
          asking_fee_eur?: number | null
          notes?: string | null
          photo_url?: string | null
          video_url?: string | null
          mux_playback_id?: string | null
          athlete_id?: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }>,
        contact_requests: TableDef<{
          id: string
          scout_id?: string | null
          athlete_id?: string | null
          scout_message?: string | null
          preferred_contact_time?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          status: string
          created_at: string
        }>,
      [key: string]: TableDef<any, any, any>
    }

    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}



