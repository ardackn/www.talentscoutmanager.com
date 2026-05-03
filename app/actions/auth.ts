"use server"

import { createClient } from '@supabase/supabase-js'

export async function createConfirmedUser(email: string, password: string, fullName: string, role: string, extraData: any = {}) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL eksik.')
    if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY eksik.')

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // 1. Create user and auto-confirm email
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: role }
    })

    if (error) {
      if (error.message.includes('already registered')) {
        return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' }
      }
      return { success: false, error: error.message }
    }

    const userId = data.user.id

    // 2. Create Profile (Admin bypass RLS)
    await supabaseAdmin.from('profiles').upsert({
      id: userId,
      role: role,
      full_name: fullName,
      email: email,
      subscription_tier: 'free'
    })

    // 3. Create Role-Specific Profile (Admin bypass RLS)
    if (role === 'athlete') {
      const slug = fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7)
      await supabaseAdmin.from('athlete_profiles').insert({
        user_id: userId,
        full_name: fullName,
        nationality: extraData.nationality || '',
        city: extraData.city || '',
        position: extraData.position || '',
        dominant_foot: extraData.dominantFoot || '',
        sport: 'Futbol',
        is_published: true,
        slug
      })
    } else if (role === 'scout') {
      await supabaseAdmin.from('scout_profiles').insert({
        user_id: userId,
        full_name: fullName,
        country: extraData.country || '',
        club_or_agency: extraData.organization || ''
      })
    }

    return { success: true, userId }
  } catch (err: any) {
    console.error('Server action error:', err)
    return { success: false, error: err.message || 'Sunucu hatası.' }
  }
}
