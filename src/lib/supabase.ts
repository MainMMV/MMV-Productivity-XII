import { createClient } from "@supabase/supabase-js";

// We use the anon public key provided by the user
const supabaseUrl = "https://ysjzqffgrzwklxlbwdby.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDA0NzUsImV4cCI6MjA4ODkxNjQ3NX0.hHJ6KwvZAqOz8tG2RFGNao21ojHnZhmpU9oijYnpoAs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
