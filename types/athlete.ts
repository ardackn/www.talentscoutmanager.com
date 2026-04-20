export interface AthletePublic {
  id: string
  name: string
  position: Position
  nationality: string
  current_team: string  // 'Amateur' if none
  speed: number        // 0-100
  skill: number        // 0-100
  jumping: number      // 0-100
  agility: number      // 0-100
  stamina: number      // 0-100
  image: string
  created_at: string
  ai_scores?: {
    scoutScore: number
    breakdown: Record<string, number>
    recommendation: string
  }
}

export interface AthletePrivate {
  id: string
  email: string
  phone?: string
}

export type Position = 
  | 'Goalkeeper'
  | 'Defender'
  | 'Right Back'
  | 'Left Back'
  | 'Defensive Midfielder'
  | 'Central Midfielder'
  | 'Attacking Midfielder'
  | 'Right Winger'
  | 'Left Winger'
  | 'Striker'

// Combined for admin/full access
export interface AthleteFull extends AthletePublic, AthletePrivate {}
