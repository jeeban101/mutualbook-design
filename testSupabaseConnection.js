import { createClient } from '@supabase/supabase-js';

// Replace with your actual credentials
const SUPABASE_URL = 'https://twsjvklyybsxmioigvjp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c2p2a2x5eWJzeG1pb2lndmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTI1NTYsImV4cCI6MjA2NTgyODU1Nn0.bO5PABuO1clBOjDeyQCqOdHVQeTMVRdRMwn-p3aaQ_I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
    const { data, error } = await supabase.auth.getSession();
  
    if (error) {
      console.error('❌ Failed to connect:', error.message);
    } else {
      console.log('✅ Connection successful. Session info:', data);
    }
  }

testConnection();
