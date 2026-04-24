import OpenAI from 'openai';

export async function analyzeAthleteVideo(params: {
  muxPlaybackId: string
  playerName: string
  matchInfo: string
  sport: string
}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const frameTimestamps = [5, 15, 30, 60, 90, 120, 150, 180, 210, 240]; // seconds
  
  const frameUrls = frameTimestamps.map(t =>
    `https://image.mux.com/${params.muxPlaybackId}/thumbnail.jpg?time=${t}s&width=1280&height=720&fit_mode=smartpad`
  );

  const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    {
      type: 'text',
      text: `You are an elite AI sports scout for Talent Scout Manager (TSM).

Analyze this ${params.sport} player's performance from these video frames.
Athlete: ${params.playerName}
Match/Context: ${params.matchInfo}

Scoring criteria (0-100):
- Technical skill: passing, shooting, dribbling, first touch
- Speed & agility: sprints, direction changes, reactions
- Ball control: close control, trapping, shielding
- Tactical awareness: positioning, decision making, reading game
- Physical condition: fitness, strength, aerial duels

Return ONLY valid JSON:
{
  "overall_score": number (0-100),
  "technical_skill": {"score": number, "notes": "string"},
  "speed_agility": {"score": number, "notes": "string"},
  "ball_control": {"score": number, "notes": "string"},
  "tactical_awareness": {"score": number, "notes": "string"},
  "physical_condition": {"score": number, "notes": "string"},
  "potential_rating": "Exceptional|High|Good|Average|Low",
  "ai_commentary": "3-4 paragraphs professional scouting report",
  "recommended_positions": ["position1", "position2"],
  "development_areas": ["area1", "area2"],
  "scout_recommendation": "Sign Now|Follow Up|Monitor|Pass",
  "comparable_player_style": "e.g. like young Ronaldo"
}`
    },
    ...frameUrls.map(url => ({
      type: 'image_url' as const,
      image_url: { 
        url, 
        detail: 'high' as const 
      }
    }))
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content }],
    max_tokens: 2000,
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const jsonString = response.choices[0].message.content;
  return JSON.parse(jsonString!);
}

