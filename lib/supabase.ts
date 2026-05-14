import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  experience?: string;
  salary?: string;
  stipend?: string;
  description?: string;
  skills?: string[];
  status: 'active' | 'closed' | 'draft';
  posted_by?: string;
  deadline?: string;
  created_at: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  hq?: string;
  sector?: string;
  size?: string;
  website?: string;
  description?: string;
  jobs?: number;
  internships?: number;
  created_at?: string;
};

export type Application = {
  id: string;
  user_id?: string;
  student_name?: string;
  student_email?: string;
  job_id?: string;
  job_title?: string;
  company?: string;
  status: 'Pending' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  resume_url?: string;
  applied_at?: string;
  created_at: string;
};

export type Resume = {
  id: string;
  user_id?: string;
  student_name?: string;
  title?: string;
  level?: 'fresher' | 'junior' | 'mid' | 'senior';
  content?: string;
  file_url?: string;
  ats_score?: number;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: 'student' | 'admin' | 'recruiter';
  created_at: string;
};