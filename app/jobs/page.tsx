'use client';
import { useState } from 'react';
import Link from 'next/link';

const allJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TCS',
    slug: 'tcs',
    type: 'job',
    location: 'Chennai',
    ctc: '3-6 LPA',
    exp: '0-2 yrs',
    skills: ['Python', 'SQL', 'Java'],
    portal: 'Naukri',
    posted: '2026-05-05',
  },
  {
    id: '2',
    title: 'SDE Intern',
    company: 'Infosys',
    slug: 'infosys',
    type: 'internship',
    location: 'Bengaluru',
    ctc: '₹15k/mo',
    exp: '0 yrs',
    skills: ['Java', 'Spring', 'SQL'],
    portal: 'LinkedIn',
    posted: '2026-05-04',
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Wipro',
    slug: 'wipro',
    type: 'job',
    location: 'Hyderabad',
    ctc: '4-7 LPA',
    exp: '0-2 yrs',
    skills: ['SQL', 'Python', 'Excel', 'Tableau'],
    portal: 'Indeed',
    posted: '2026-05-03',
  },
  {
    id: '4',
    title: 'ML Engineer',
    company: 'Zoho',
    slug: 'zoho',
    type: 'job',
    location: 'Chennai',
    ctc: '6-10 LPA',
    exp: '0-3 yrs',
    skills: ['Python', 'ML', 'TensorFlow'],
    portal: 'Naukri',
    posted: '2026-05-02',
  },
  {
    id: '5',
    title: 'Backend Intern',
    company: 'Freshworks',
    slug: 'freshworks',
    type: 'internship',
    location: 'Chennai / Remote',
    ctc: '₹20k/mo',
    exp: '0 yrs',
    skills: ['Node.js', 'React', 'MongoDB'],
    portal: 'Unstop',
    posted: '2026-05-01',
  },
  {
    id: '6',
    title: 'AI/ML Intern',
    company: 'Google',
    slug: 'google',
    type: 'internship',
    location: 'Hyderabad',
    ctc: '₹80k/mo',
    exp: '0 yrs',
    skills: ['Python', 'TensorFlow', 'ML', 'NLP'],
    portal: 'LinkedIn',
    posted: '2026-05-01',
  },
  {
    id: '7',
    title: 'Software Developer',
    company: 'Google',
    slug: 'google',
    type: 'job',
    location: 'Hyderabad',
    ctc: '15-30 LPA',
    exp: '0-2 yrs',
    skills: ['C++', 'Python', 'Algorithms'],
    portal: 'LinkedIn',
    posted: '2026-04-30',
  },
  {
    id: '8',
    title: 'Data Engineer',
    company: 'Amazon',
    slug: 'amazon',
    type: 'job',
    location: 'Bengaluru',
    ctc: '12-20 LPA',
    exp: '0-2 yrs',
    skills: ['SQL', 'Python', 'Spark', 'AWS'],
    portal: 'Indeed',
    posted: '2026-04-29',
  },
  {
    id: '9',
    title: 'SDE Intern',
    company: 'Amazon',
    slug: 'amazon',
    type: 'internship',
    location: 'Bengaluru',
    ctc: '₹60k/mo',
    exp: '0 yrs',
    skills: ['DSA', 'Java', 'Python'],
    portal: 'LinkedIn',
    posted: '2026-04-28',
  },
  {
    id: '10',
    title: 'Full Stack Developer',
    company: 'Startupe',
    slug: 'startupe',
    type: 'job',
    location: 'Remote',
    ctc: '4-8 LPA',
    exp: '0-2 yrs',
    skills: ['React', 'Node.js', 'MongoDB'],
    portal: 'Wellfound',
    posted: '2026-04-27',
  },
];

const portals = [
  'All',
  'Naukri',
  'LinkedIn',
  'Indeed',
  'Unstop',
  'Wellfound',
  'Internshala',
];
const types = ['All', 'job', 'internship'];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [portalFilter, setPortalFilter] = useState('All');

  const filtered = allJobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === 'All' || j.type === typeFilter;
    const matchPortal = portalFilter === 'All' || j.portal === portalFilter;
    return matchSearch && matchType && matchPortal;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Jobs &amp; Internships</h1>
          <p className="text-slate-400 text-sm">
            {filtered.length} opportunities found across all portals
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input
            className="rounded-md bg-slate-900 border border-slate-700 text-sm px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full md:w-72"
            placeholder="Search role, company, skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-md text-sm border transition-all ${
                  typeFilter === t
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-semibold'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {t === 'All'
                  ? 'All Types'
                  : t === 'job'
                  ? 'Jobs'
                  : 'Internships'}
              </button>
            ))}
          </div>
          <select
            className="rounded-md bg-slate-900 border border-slate-700 text-sm px-3 py-2 text-slate-300 focus:outline-none focus:border-emerald-500"
            value={portalFilter}
            onChange={(e) => setPortalFilter(e.target.value)}
          >
            {portals.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Job Cards */}
        <div className="grid gap-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold">{job.title}</h2>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        job.type === 'job'
                          ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                          : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                      }`}
                    >
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {job.company} • {job.location} • {job.ctc} • {job.exp}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    via {job.portal} • Posted {job.posted}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/company/${job.slug}`}
                    className="text-xs px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-center transition-all"
                  >
                    View Company
                  </Link>
                  <button className="text-xs px-3 py-1.5 rounded-md border border-slate-700 hover:border-emerald-500 text-slate-300 transition-all">
                    Quick Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
