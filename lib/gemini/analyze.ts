import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

function sanitizeJson(text: string) {
  return text.replace(/```json|```/g, '').trim()
}

export async function analyzeIndividualPlayer(params: {
  videoUrl: string
  playerName: string
  jerseyNumber?: number
  position?: string
  sport: string
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

  const prompt = `You are an elite AI sports talent scout with 20 years of experience.
Analyze this ${params.sport} player's performance in the video.
Player: ${params.playerName}
${params.jerseyNumber ? `Jersey Number: #${params.jerseyNumber} - FOCUS specifically on player wearing jersey #${params.jerseyNumber}` : ''}
Position: ${params.position || 'unknown'}
Return ONLY valid JSON with detailed scouting report and scores from 0-100.`

  const result = await model.generateContent([
    { text: prompt },
    { fileData: { mimeType: 'video/mp4', fileUri: params.videoUrl } },
  ])

  return JSON.parse(sanitizeJson(result.response.text()))
}

export async function analyzeTeamMatch(params: {
  videoUrl: string
  teamA: string
  teamB: string
  sport: string
  jerseyNumbersToFocus?: number[]
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

  const jerseyFocus = params.jerseyNumbersToFocus?.length
    ? `Pay special attention to players wearing jersey numbers: ${params.jerseyNumbersToFocus.join(', ')}`
    : 'Analyze all visible players'

  const prompt = `You are an elite AI football analyst. Analyze this full match video.
Teams: ${params.teamA} vs ${params.teamB}
Sport: ${params.sport}
${jerseyFocus}
Return ONLY valid JSON with team scores, standout players, key moments and tactical insights.`

  const result = await model.generateContent([
    { text: prompt },
    { fileData: { mimeType: 'video/mp4', fileUri: params.videoUrl } },
  ])

  return JSON.parse(sanitizeJson(result.response.text()))
}
