import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://uwrvcnnbdstgzaoiggmm.supabase.co';
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cnZjbm5iZHN0Z3phb2lnZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4MTk5MzcsImV4cCI6MTk4NDM5NTkzN30.CgLW9-Zf0gGyGxXpv0S7N_-T4rGdKuHD_1fbOWblbjk';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from('video').select('*');
    },
  };
}
