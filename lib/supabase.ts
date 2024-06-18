import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://euosgvbcbvouqnbfjnfd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1b3NndmJjYnZvdXFuYmZqbmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NDk1MTksImV4cCI6MjAzNDIyNTUxOX0.sq_i3rH3gn3iaOu6Xnln8aatCduLhldnSq8ECVbhOxk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
