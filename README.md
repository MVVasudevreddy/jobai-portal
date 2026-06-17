# 🤖 JobAI Portal

> **Your AI-Powered Job & Internship Copilot** — Built with Next.js 14, Supabase, TypeScript & TailwindCSS

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00C7B7?style=for-the-badge&logo=vercel)](https://jobai-portal-lrawe7xym-mvvasudevreddys-projects.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2014%20%7C%20Supabase%20%7C%20TypeScript-blue?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](#)

---

## 📌 Overview

JobAI Portal is a full-stack AI-powered job and internship platform designed for freshers and students in India. It aggregates job listings, allows real-time application tracking, provides AI resume tailoring, interview prep, company research, and an admin panel — all in one dark-themed, modern UI.

**Built as a portfolio project** by [MVVasudevreddy](https://github.com/MVVasudevreddy) — AI/ML Engineer & Full-Stack Developer.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Jobs & Internships** | Browse 6+ opportunities from TCS, Google, Infosys, Amazon, Microsoft, Wipro |
| 🤖 **AI Resume Tailor** | Paste any JD and get an ATS-optimised resume instantly |
| 🎯 **Interview Prep** | AI-powered practice questions with real-time feedback |
| 🏢 **Company Explorer** | Browse top employers with job/internship counts |
| 📊 **Real-time Dashboard** | Live stats via Supabase subscriptions — updates on every DB change |
| 👩‍💻 **Student Management** | Admin panel to manage students, applications, and job postings |
| 📝 **Resume Builder** | Generate ATS-ready resumes for Fresher to Senior profiles |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend/DB**: Supabase (PostgreSQL + Real-time Subscriptions)
- **Auth**: Supabase Auth (configurable)
- **Deployment**: Vercel
- **Built with**: StackBlitz ⚡

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/MVVasudevreddy/jobai-portal.git
cd jobai-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
> **Note**: The app works without Supabase — it falls back to static demo data gracefully.

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Database Schema (Supabase)

Required tables for full functionality:

```sql
-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  job_type TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  skills_required TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  status TEXT DEFAULT 'applied',
  company TEXT,
  title TEXT,
  applied_at TIMESTAMPTZ DEFAULT now()
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  branch TEXT,
  year INTEGER,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

> Enable **Realtime** for `jobs`, `applications`, and `students` tables in Supabase dashboard for live dashboard updates.

---

## 📁 Project Structure

```
jobai-portal/
├── app/
│   ├── admin/          # Admin panel
│   ├── company/        # Company listings
│   ├── dashboard/      # Real-time dashboard
│   ├── interview/      # AI interview prep
│   ├── jobs/           # Job & internship listings
│   ├── resumes/        # Resume builder
│   └── tailor/         # AI resume tailor
├── lib/
│   └── supabase.ts     # Supabase client + types
├── public/             # Static assets
└── README.md
```

---

## 👨‍💻 Author

**MVVASUDEVAREDDY** (MVVasudevreddy)
- AI/ML Engineer | Python • TensorFlow • FastAPI • SQL
- Machine Learning Intern @ VCodez (Nov 2025 – Feb 2026)
- BTech CSE • BHARATH University • 2026
- 📬 [vasudevreddy7832@gmail.com](mailto:vasudevreddy7832@gmail.com)
- 🔗 [LinkedIn](https://linkedin.com/in/mvvasudevareddy) | [GitHub](https://github.com/MVVasudevreddy) | [Live Portfolio](https://mvvasudevreddy.github.io)

---

## 📄 License

MIT License — feel free to use and adapt for your own projects.
