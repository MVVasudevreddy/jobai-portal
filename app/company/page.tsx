'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const staticCompanies = [
  { id: 1, name: 'Google', slug: 'google', hq: 'Hyderabad, India', size: '100,000+', industry: 'Technology', jobs: 1, internships: 1 },
  { id: 2, name: 'Amazon', slug: 'amazon', hq: 'Bengaluru, India', size: '1,500,000+', industry: 'E-commerce / Cloud', jobs: 1, internships: 1 },
  { id: 3, name: 'TCS', slug: 'tcs', hq: 'Mumbai, India', size: '600,000+', industry: 'IT Services', jobs: 1, internships: 1 },
  { id: 4, name: 'Infosys', slug: 'infosys', hq: 'Bengaluru, India', size: '300,000+', industry: 'IT Services', jobs: 0, internships: 1 },
  { id: 5, name: 'Microsoft', slug: 'microsoft', hq: 'Hyderabad, India', size: '200,000+', industry: 'Technology', jobs: 1, internships: 1 },
  { id: 6, name: 'Wipro', slug: 'wipro', hq: 'Bengaluru, India', size: '250,000+', industry: 'IT Services', jobs: 1, internships: 0 },
  { id: 7, name: 'Zoho', slug: 'zoho', hq: 'Chennai, India', size: '10,000+', industry: 'SaaS', jobs: 1, internships: 0 },
  { id: 8, name: 'Freshworks', slug: 'freshworks', hq: 'Chennai, India', size: '5,000+', industry: 'SaaS', jobs: 0, internships: 1 },
];

const industrys = ['All', 'Technology', 'IT Services', 'E-commerce / Cloud', 'SaaS'];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(staticCompanies);
  const [search, setSearch] = useState('');
  const [industry, setindustry] = useState('All');

  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('*');
      if (data && data.length > 0) setCompanies(data);
    }
    fetchCompanies();
  }, []);

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchindustry = industry === 'All' || c.industry === industry;
    return matchSearch && matchindustry;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Companies & <span className="text-emerald-400">Employers</span></h1>
          <p className="text-slate-400">Browse top companies hiring freshers and interns across India</p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <input type="text" placeholder="Search companies..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
          <select value={industry} onChange={e => setindustry(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500">
            {industrys.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <p className="text-slate-400 text-sm mb-4">{filtered.length} companies found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(company => (
            <Link key={company.id} href={`/company/${company.slug}`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {company.name[0]}
                </div>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">{company.industry}</span>
              </div>
              <h3 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors">{company.name}</h3>
              <p className="text-slate-500 text-sm mb-3">{company.hq}</p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">{company.jobs ?? 0} Jobs</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-full">{company.internships ?? 0} Internships</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">No companies found.</p>
          </div>
        )}
      </div>
    </main>
  );
}