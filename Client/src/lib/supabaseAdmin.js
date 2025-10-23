import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = "https://jsflhrolmamgepogoehf.supabase.co";
// const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZmxocm9sbWFtZ2Vwb2dvZWhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc5NTY1MSwiZXhwIjoyMDY2MzcxNjUxfQ.K-i_k8sT6l6Y2nCgI0gqXbJ5A9Z4wBv8jC4NIs_yYv0";


const supabaseUrl = "https://mylppttomtgormkedulq.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bHBwdHRvbXRnb3Jta2VkdWxxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzU2OTExOSwiZXhwIjoyMDczMTQ1MTE5fQ.TI4osrXTrdQwf9RwBgWSdq-LN9eJgzuQezPgreD17gk";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});








