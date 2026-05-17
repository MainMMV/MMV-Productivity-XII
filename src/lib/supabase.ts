import { createClient } from "@supabase/supabase-js";

// We use the anon public key provided by the user
const supabaseUrl = "https://ehtmrgfdyhnirleixviz.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodG1yZ2ZkeWhuaXJsZWl4dml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDU0NzMsImV4cCI6MjA5NDUyMTQ3M30.h5rx4i0hRSIGnDL7wtR_49tWieVxeV3LBrBFZ3mgtsw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
