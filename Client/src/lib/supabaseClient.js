import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mylppttomtgormkedulq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bHBwdHRvbXRnb3Jta2VkdWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjkxMTksImV4cCI6MjA3MzE0NTExOX0.m-J9E27rHuy2OEj-VW8XSNAgLOOBG1p2g92qNrjourI";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
