export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: string
          full_name: string | null
          email: string | null
          phone: string | null
          subscription_tier: string
          subscription_status: string
          subscription_period_end: string | null
          lemon_customer_id: string | null
          lemon_subscription_id: string | null
          lemon_variant_id: string | null
          created_at: string
          updated_at: string | null
          user_id?: string | null
          status?: string | null
        }
        Insert: {
          id: string
          role?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          subscription_tier?: string
          subscription_status?: string
          subscription_period_end?: string | null
          lemon_customer_id?: string | null
          lemon_subscription_id?: string | null
          lemon_variant_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          role?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          subscription_tier?: string
          subscription_status?: string
          subscription_period_end?: string | null
          lemon_customer_id?: string | null
          lemon_subscription_id?: string | null
          lemon_variant_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      athlete_profiles: {
        Row: {
          id: string
          user_id: string
          slug: string
          full_name: string
          birth_date: string | null
          nationality: string | null
          city: string | null
          height_cm: number | null
          weight_kg: number | null
          dominant_foot: string | null
          sport: string
          position: string | null
          current_club: string | null
          bio: string | null
          avatar_url: string | null
          is_published: boolean
          profile_views: number | null
          created_at: string
          updated_at: string | null
          country_code?: string | null
          years_playing?: number | null
          is_licensed?: boolean | null
          has_international_experience?: boolean | null
          cover_url?: string | null
          instagram_handle?: string | null
          youtube_url?: string | null
          tiktok_handle?: string | null
          twitter_handle?: string | null
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          full_name: string
          birth_date?: string | null
          nationality?: string | null
          city?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          dominant_foot?: string | null
          sport?: string
          position?: string | null
          current_club?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_published?: boolean
          profile_views?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          full_name?: string
          birth_date?: string | null
          nationality?: string | null
          city?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          dominant_foot?: string | null
          sport?: string
          position?: string | null
          current_club?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_published?: boolean
          profile_views?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scout_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          club_or_agency: string | null
          country: string | null
          years_experience: number | null
          license_number: string | null
          avatar_url: string | null
          is_published: boolean
          profile_views: number | null
          created_at: string
          updated_at: string | null
          region?: string | null
          interested_sports?: string[] | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          club_or_agency?: string | null
          country?: string | null
          years_experience?: number | null
          license_number?: string | null
          avatar_url?: string | null
          is_published?: boolean
          profile_views?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          club_or_agency?: string | null
          country?: string | null
          years_experience?: number | null
          license_number?: string | null
          avatar_url?: string | null
          is_published?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      athlete_videos: {
        Row: {
          id: string
          athlete_id: string
          video_url: string | null
          storage_path: string | null
          title: string | null
          description: string | null
          video_type: string | null
          is_primary: boolean
          mux_asset_id: string | null
          mux_playback_id: string | null
          created_at: string
          duration_seconds?: number | null
          thumbnail_url?: string | null
          youtube_url?: string | null
          view_count?: number | null
        }
        Insert: {
          id?: string
          athlete_id: string
          video_url?: string | null
          storage_path?: string | null
          title?: string | null
          description?: string | null
          video_type?: string | null
          is_primary?: boolean
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          created_at?: string
        }
        Update: {
          athlete_id?: string
          video_url?: string | null
          storage_path?: string | null
          title?: string | null
          description?: string | null
          video_type?: string | null
          is_primary?: boolean
          mux_asset_id?: string | null
          mux_playback_id?: string | null
        }
        Relationships: []
      }
      analysis_reports: {
        Row: {
          id: string
          scout_id: string | null
          athlete_id: string | null
          mode: string
          payload: Json
          created_at: string
          athlete_name?: string | null
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
          status?: string | null
        }
        Insert: {
          id?: string
          scout_id?: string | null
          athlete_id?: string | null
          mode?: string
          payload?: Json
          created_at?: string
        }
        Update: {
          scout_id?: string | null
          athlete_id?: string | null
          mode?: string
          payload?: Json
        }
        Relationships: []
      }
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
