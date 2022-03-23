import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://fcrkmsjhceswscumxqlz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcmttc2poY2Vzd3NjdW14cWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTQyNzQsImV4cCI6MTk2MzU3MDI3NH0.ZbntvKBXFRy-hlkQbwSdNA8m79XF1w-0GS7KY67Hujs')