import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase-server';
import type { Position } from '@/types/athlete';
import { cookies } from 'next/headers';

interface AnalyzeRequest {
  height: number; // cm
  weight: number; // kg  
  age: number;
  position: Position;
}

interface AiScores {
  scoutScore: number; // 1-100 overall
  breakdown: {
    bmi: number;
    agility: number;
    power: number;
    endurance: number;
    positionMatch: number;
  };
  recommendation: string;
}

// Position benchmarks (mock professional averages)
const POSITION_BENCHMARKS: Record<Position, { idealBmi: [number, number], agilityWeight: number, powerWeight: number }> = {
  'Goalkeeper': { idealBmi: [24, 28], agilityWeight: 0.2, powerWeight: 0.5 },
  'Defender': { idealBmi: [23, 27], agilityWeight: 0.3, powerWeight: 0.6 },
  'Right Back': { idealBmi: [21, 25], agilityWeight: 0.5, powerWeight: 0.4 },
  'Left Back': { idealBmi: [21, 25], agilityWeight: 0.5, powerWeight: 0.4 },
  'Defensive Midfielder': { idealBmi: [22, 26], agilityWeight: 0.4, powerWeight: 0.5 },
  'Central Midfielder': { idealBmi: [21, 25], agilityWeight: 0.6, powerWeight: 0.3 },
  'Attacking Midfielder': { idealBmi: [20, 24], agilityWeight: 0.7, powerWeight: 0.2 },
  'Right Winger': { idealBmi: [19, 23], agilityWeight: 0.8, powerWeight: 0.1 },
  'Left Winger': { idealBmi: [19, 23], agilityWeight: 0.8, powerWeight: 0.1 },
  'Striker': { idealBmi: [20, 24], agilityWeight: 0.4, powerWeight: 0.7 }
};

function calculateScores(data: AnalyzeRequest): AiScores {
  const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);
  const ageFactor = Math.max(0, 100 - (data.age - 18) * 2); // Peak at 18-22

  // BMI fit to position ideal range
  const benchmark = POSITION_BENCHMARKS[data.position];
  const bmiScore = Math.max(0, 100 - Math.abs(parseFloat(bmi) - (benchmark.idealBmi[0] + benchmark.idealBmi[1]) / 2) * 10);

  // Agility score (inverse BMI + age)
  const agility = Math.min(100, 110 - parseFloat(bmi) * 3 + ageFactor * 0.3);

  // Power score (BMI * height factor)
  const power = Math.min(100, parseFloat(bmi) * 3 + (data.height / 200) * 50);

  // Endurance (age inverse)
  const endurance = Math.max(0, 110 - data.age * 2.5);

  // Position match
  const positionMatch = benchmark.agilityWeight * (agility / 100) + benchmark.powerWeight * (power / 100) * 100;

  const scoutScore = Math.round((bmiScore * 0.2 + agility * 0.3 + power * 0.25 + endurance * 0.15 + positionMatch * 0.1 + ageFactor * 0.1) / 1.1);

  const recommendation = scoutScore > 85 ? 'Elite prospect - immediate scout interest' : 
                        scoutScore > 70 ? 'Strong potential - develop & monitor' : 
                        'Gym work + technical development needed';

  return {
    scoutScore,
    breakdown: { bmi: parseFloat(bmi), agility: Math.round(agility), power: Math.round(power), endurance: Math.round(endurance), positionMatch: Math.round(positionMatch) },
    recommendation
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    
    if (!body.height || !body.weight || !body.age || !body.position) {
      return NextResponse.json({ error: 'Missing required fields: height(cm), weight(kg), age, position' }, { status: 400 });
    }

    const scores = calculateScores(body);

    // Optional: Save to Supabase athlete_profiles (requires auth)
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    // Uncomment if saving: await supabase.from('athlete_profiles').update({ ai_scores: scores }).eq('id', athleteId);

    return NextResponse.json({ 
      success: true, 
      scores,
      message: 'AI analysis complete' 
    });

  } catch (error) {
    console.error('AI Analyze error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

