import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ssrxdumarngprpvymksj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnhkdW1hcm5ncHJwdnlta3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTk5NTIsImV4cCI6MjAzMzQzNTk1Mn0.ch4sBqMgBliaeMNN-MAO7yqq_RmxvvNGYAuvoEhObOg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})