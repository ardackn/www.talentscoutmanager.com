export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'scout' | 'athlete' | 'admin'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'scout' | 'athlete' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'scout' | 'athlete' | 'admin'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      athletes: {
        Row: {
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
        }
        Insert: {
          id?: string
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
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string
          nationality?: string
          current_team?: string
          speed?: number
          skill?: number
          jumping?: number
          agility?: number
          stamina?: number
          image?: string
          email?: string
          phone?: string | null
          created_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          scout_id: string
          athlete_id: string
          content: string
          status: 'sent' | 'read'
          created_at: string
        }
        Insert: {
          id?: string
          scout_id: string
          athlete_id: string
          content: string
          status?: 'sent' | 'read'
          created_at?: string
        }
        Update: {
          id?: string
          scout_id?: string
          athlete_id?: string
          content?: string
          status?: 'sent' | 'read'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_athlete_id_fkey",
            columns: ["athlete_id"],
            referencedRelation: "athletes",
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_scout_id_fkey",
            columns: ["scout_id"],
            referencedRelation: "profiles",
            referencedColumns: ["id"]
          }
        ]
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

