import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient('https://fcrkmsjhceswscumxqlz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcmttc2poY2Vzd3NjdW14cWx6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzczOTM3NSwiZXhwIjoxOTYzMzE1Mzc1fQ.lpuJsLpCEIfdoymiInXICrxknqYxJPFOKIpQhZxFJqo')