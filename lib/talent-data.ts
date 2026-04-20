// lib/talent-data.ts - Sample data for athlete dashboard

export interface Talent {
  id: string
  name: string
  image: string
  aiScore: number
  country: string
  position: string
  age: number
  height: string
  messages: Message[]
}

export interface Message {
  id: string
  fromScout: string
  toTalentId: string
  content: string
  timestamp: string
  replied: boolean
}

export const talents: Talent[] = [
  {
    id: '1',
    name: 'João Silva',
    image: '/data/joao-silva.jpg',
    aiScore: 89,
    country: 'Brazil',
    position: 'ST',
    age: 17,
    height: '1.82m',
    messages: [
      {
        id: 'm1',
        fromScout: 'FC Barcelona Scout',
        toTalentId: '1',
        content: 'Impressive footage! Interested in trial.',
        timestamp: '2024-07-15',
        replied: false
      }
    ]
  },
  // Add more sample talents
  {
    id: '2',
    name: 'Ahmed Khalil',
    image: '/data/ahmed-khalil.jpg',
    aiScore: 85,
    country: 'Egypt',
    position: 'LW',
    age: 16,
    height: '1.75m',
    messages: []
  }
]

export function getTalentById(id: string): Talent | undefined {
  return talents.find(t => t.id === id)
}
