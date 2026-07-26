import { supabase } from './supabase'

export async function getActiveLineup() {
  const { data, error } = await supabase
    .from('lineups')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  return data
}
