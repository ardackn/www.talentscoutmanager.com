"use server"

import { createClient } from '@supabase/supabase-js'

export async function createConfirmedUser(email: string, password: string, fullName: string, role: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase admin credentials not configured on server.')
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Create user and auto-confirm email using admin API
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: role
      }
    })

    if (error) {
      if (error.message.includes('already been registered') || error.message.includes('already registered')) {
        return { success: false, error: 'Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapın.' }
      }
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Kullanıcı oluşturulamadı.' }
    }

    return { success: true, userId: data.user.id }
  } catch (err: any) {
    console.error('Server action error:', err)
    return { success: false, error: err.message || 'Bilinmeyen bir sunucu hatası oluştu.' }
  }
}
