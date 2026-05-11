# 🚀 FREE Backend Setup for Job Portal

## ✅ 100% FREE Forever - No Credit Card Required

This guide shows you how to add a **permanent, free backend** to your job portal so data persists and the portal works like a real production app.

---

## 🎯 FREE Backend Stack

### **Option 1: Supabase (RECOMMENDED - Easiest)**

**What You Get FREE:**
- ✅ PostgreSQL Database (500MB storage)
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ✅ Authentication built-in
- ✅ Real-time subscriptions
- ✅ Auto-generated REST APIs
- ✅ **Never expires - 100% free tier forever**

### **Setup Steps:**

#### 1. Create Free Supabase Account
```
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (free)
4. Create a new project (takes 2 minutes)
5. Note your project URL and API key
```

#### 2. Install Supabase in This Project
```bash
npm install @supabase/supabase-js
```

#### 3. Add Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 4. Create Database Tables
Run this SQL in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('ADMIN', 'EMPLOYER', 'JOB_SEEKER')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Job Seeker Profiles
CREATE TABLE job_seeker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  phone TEXT,
  location TEXT,
  current_title TEXT,
  experience_years INTEGER,
  level TEXT,
  skills TEXT[],
  resume_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  size TEXT,
  description TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  responsibilities TEXT,
  requirements TEXT,
  location TEXT,
  min_salary INTEGER,
  max_salary INTEGER,
  job_type TEXT CHECK (job_type IN ('FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACT')),
  work_mode TEXT CHECK (work_mode IN ('REMOTE', 'ONSITE', 'HYBRID')),
  experience_min INTEGER,
  experience_max INTEGER,
  skills TEXT[],
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES job_seeker_profiles(id) ON DELETE CASCADE,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'SELECTED')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
```

#### 5. Create Supabase Client
Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 6. Use in Your Components

```typescript
// Example: Fetch jobs
import { supabase } from '@/lib/supabase';

const { data: jobs } = await supabase
  .from('jobs')
  .select('*, companies(*)')
  .eq('status', 'ACTIVE');

// Example: Create application
await supabase.from('applications').insert({
  job_id: jobId,
  profile_id: profileId,
  cover_letter: coverLetter,
  status: 'APPLIED'
});

// Example: Update application status
await supabase
  .from('applications')
  .update({ status: 'SHORTLISTED' })
  .eq('id', applicationId);
```

---

## 🌐 Deploy to FREE Hosting

### **Vercel (RECOMMENDED)**

**What You Get FREE:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ 100GB bandwidth/month
- ✅ Custom domain support
- ✅ **Never expires**

**Deploy Steps:**
```
1. Push code to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables (Supabase keys)
6. Click "Deploy"
7. Get URL: yourproject.vercel.app
```

**Or Deploy from StackBlitz:**
```
1. Click "Deploy" button in StackBlitz
2. Choose Vercel
3. Done! Get permanent URL
```

---

## 🔐 Authentication Setup

Supabase has built-in auth - just enable it:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@email.com',
  password: 'password123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password123'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();
```

---

## 📊 Alternative FREE Backends

### **Option 2: Firebase (Google)**
- Free tier: 1GB storage, 10GB/month bandwidth
- Real-time database
- Authentication included
- https://firebase.google.com

### **Option 3: PocketBase (Self-hosted)**
- 100% free
- Single file backend
- Deploy on Railway/Fly.io free tier
- https://pocketbase.io

### **Option 4: Appwrite (Open Source)**
- Free cloud tier
- Self-hostable
- https://appwrite.io

---

## 🎯 Quick Start (5 Minutes)

```bash
# 1. Install Supabase
npm install @supabase/supabase-js

# 2. Create .env.local with your Supabase credentials
# (Get from supabase.com after creating project)

# 3. Run the SQL schema above in Supabase dashboard

# 4. Update your components to use Supabase instead of mock data

# 5. Deploy to Vercel
npm run build
# Push to GitHub, deploy via Vercel
```

---

## ✨ What Changes in Your Code

**Before (Mock Data):**
```typescript
const JOBS = [...]; // Hardcoded
```

**After (Real Database):**
```typescript
const { data: jobs } = await supabase.from('jobs').select('*');
```

**That's it!** Everything else stays the same.

---

## 🚀 Your Portal Will Now Have:

✅ **Real user accounts** (sign up, login, logout)
✅ **Persistent data** (jobs, applications saved forever)
✅ **Multi-user support** (thousands of users can use it)
✅ **Always online** (deployed on Vercel, never goes down)
✅ **100% FREE** (Supabase + Vercel free tiers)
✅ **Production-ready** (can handle real traffic)

---

## 📝 Summary

**Total Cost: ₹0 (FREE FOREVER)**

1. **Database:** Supabase (free tier)
2. **Hosting:** Vercel (free tier)
3. **Auth:** Supabase Auth (included)
4. **Storage:** Supabase Storage for resumes (free tier)
5. **Domain:** yourproject.vercel.app (free)

**Optional paid upgrades later:**
- Custom domain: ₹500/year (optional)
- More storage: Only if you exceed 500MB
- More users: Only if you exceed 50k/month

---

## 🎉 Need Help?

1. Check Supabase docs: https://supabase.com/docs
2. Check Next.js docs: https://nextjs.org/docs
3. I can help you set it up step by step!

**Your job portal will work forever with real data, for FREE!** 🚀