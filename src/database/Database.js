import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcrkmsjhceswscumxqlz.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcmttc2poY2Vzd3NjdW14cWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc3MzkzNzUsImV4cCI6MTk2MzMxNTM3NX0.4QSU6gfKPgXl8zkEbvfjGcKABCHeS9Sk0cOGHCSE5jo'
export const supabase = createClient(supabaseUrl, supabaseKey)