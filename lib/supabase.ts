import { createClient } from '@supabase/supabase-js';

// Safe initialization: falls back to placeholder values so app doesn't crash
// when env vars are missing. Real DB queries will simply return empty results.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://placeholder.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'placeholder-anon-key';

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export type Student = {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: number;
  status: string;
  roll_number: string;
  phone: string;
  created_at: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  company_id?: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  experience_required?: number;
  description?: string;
  skills_required?: string[];
  is_active?: boolean;
  deadline?: string;
  created_at: string;
};

export type Application = {
  id: string;
  job_id?: string;
  student_id?: string;
  status: 'applied' | 'pending' | 'interview' | 'offer' | 'rejected';
  applied_at?: string;
  company?: string;
  title?: string;
  notes?: string;
};

export type Company = {
  id: string;
  name: string;
  location?: string;
  industry?: string;
  description?: string;
  website?: string;
  logo_url?: string;
  created_at?: string;
};
