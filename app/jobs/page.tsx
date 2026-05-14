'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Job = {
  id: string;
  title: string;
  company: string;
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

const staticJobs: Job[] = [
  { id: '1', title: 'Software Engineer', company: 'TCS', location: 'Chennai', job_type: 'Full-time', salary_min: 400000, salary_max: 700000, experience_required: 0, skills_required: ['Python', 'SQL', 'Java'], created_at: '2026-05-05' },
  { id: '2', title: 'SDE Intern', company: 'Infosys', location: 'Bengaluru', job_type: 'Internship', salary_min: 15000, salary_max: 15000, experience_required: 0, skills_required: ['Java', 'Spring', 'SQL'], created_at: '2026-05-04' },
  { id: '3', title: 'Data Analyst', company: 'Wipro', location: 'Hyderabad', job_type: 'Full-time', salary_min: 400000, salary_max: 700000, experience_required: 0, skills_required: ['SQL', 'Python', 'Excel', 'Tableau'], created_at: '2026-05-03' },
  { id: '4', title: 'Frontend Developer', company: 'Amazon', location: 'Bengaluru', job_type: 'Full-time', salary_min: 800000, salary_max: 1500000, experience_required: 1, skills_required: ['React', 'TypeScript', 'CSS'], created_at: '2026-05-02' },
  { id: '5', title: 'ML Engineer', company: 'Google', location: 'Hyderabad', job_type: 'Full-time', salary_min: 1200000, salary_max: 2000000, experience_required: 2, skills_required: ['Python', 'TensorFlow', 'ML'], created_at: '2026-05-01' },
  { id: '6', title: 'Cloud Intern', company: 'Microsoft', location: 'Hyderabad', job_type: 'Internship', salary_min: 50000, salary_max: 80000, experience_required: 0, skills_required: ['Azure', 'Python', 'Docker'], created_at: '2026-04-30' },
];

const typeColors: Record<string, string> = {
  'Full-time': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Internship': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Part-time': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Contract': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

function formatSalary(min?: number, max?: number, type?: string) {
  if (type === 'Internship') {
    if (!min) return 'Stipend negotiable';
    return `₹${Math.round(min / 1000)}k/mo`;
  }
  if (!min) return 'CTC negotiable';
  return `₹${(min / 100000).toFixed(0)}-${max ? (max / 100000).toFixed(0) : '?'} LPA`;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(staticJobs);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data } = await supabase
          .from('jobs')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (data && data.length > 0) setJobs(data);
      } catch (e) {
        console.error('Jobs fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      (j.skills_required || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === 'All' || j.job_type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Jobs & <span className="text-emerald-400">Internships</span></h1>
          <p className="text-slate-400">Discover opportunities from top companies across India</p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <input type="text" placeholder="Search jobs, companies, skills..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[250px] bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
          {['All', 'Full-time', 'Internship', 'Part-time', 'Contract'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === t ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}>{t}</button>
          ))}
        </div>
        <p className="text-slate-400 text-sm mb-4">{filtered.length} {typeFilter !== 'All' ? typeFilter.toLowerCase() : ''} opportunities</p>
        {loading && <div className="text-center py-12 text-slate-400">Loading jobs...</div>}
        <div className="space-y-4">
          {filtered.map(job => (
            <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-emerald-400 font-bold">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                      <p className="text-slate-400 text-sm">{job.company} · {job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`text-xs border px-2 py-1 rounded-full ${typeColors[job.job_type] || typeColors['Full-time']}`}>
                      {job.job_type}
                    </span>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">
                      {formatSalary(job.salary_min, job.salary_max, job.job_type)}
                    </span>
                    {job.experience_required !== undefined && (
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                        {job.experience_required === 0 ? 'Fresher' : `${job.experience_required}+ yrs`}
                      </span>
                    )}
                    {(job.skills_required || []).slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                    Apply Now
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-400 px-5 py-2 rounded-lg text-sm transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}