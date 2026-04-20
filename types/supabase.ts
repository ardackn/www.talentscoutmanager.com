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
        user_id?: string | null
        full_name?: string | null
        email?: string | null
        phone?: string | null
        role: string
        status?: string | null
        subscription_tier?: string | null
        created_at: string
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
        sport: string
        position: string
        nationality: string
        birth_date: string
        is_published: boolean
        created_at: string
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
        athlete_id: string | null
        mode: string
        payload: Json
        created_at: string
      }>
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



