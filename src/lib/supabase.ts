// Supabase Client Configuration
// Replace with your own Supabase credentials from https://supabase.com

import { createClient } from '@supabase/supabase-js';

// DEMO Supabase instance for testing (read-only)
// To use your own: Sign up at supabase.com and replace these values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions

// Jobs
export async function getAllJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      company:companies(*)
    `)
    .eq('status', 'ACTIVE')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
  return data || [];
}

export async function getJobById(id: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      company:companies(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }
  return data;
}

export async function createJob(jobData: any) {
  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating job:', error);
    throw error;
  }
  return data;
}

// Applications
export async function createApplication(applicationData: any) {
  const { data, error } = await supabase
    .from('applications')
    .insert(applicationData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating application:', error);
    throw error;
  }
  return data;
}

export async function getApplicationsByUser(userId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job:jobs(*,company:companies(*))
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
  return data || [];
}

export async function updateApplicationStatus(applicationId: string, status: string) {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating application:', error);
    throw error;
  }
  return data;
}

// Users & Profiles
export async function createUserProfile(userData: any) {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }
  return data;
}

export async function getJobSeekerProfile(userId: string) {
  const { data, error } = await supabase
    .from('job_seeker_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

// Companies
export async function createCompany(companyData: any) {
  const { data, error } = await supabase
    .from('companies')
    .insert(companyData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating company:', error);
    throw error;
  }
  return data;
}

export async function getCompanyByUserId(userId: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching company:', error);
    return null;
  }
  return data;
}