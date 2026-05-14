'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type StatCard = { label: string; value: string | number; color: string; icon: string; link: string; };
type Application = {
  id: string;
  job_id?: string;
  status: string;
  applied_at?: string;
  company?: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: 'Total Applied', value: '...', color: 'text-blue-400', icon: '📋', link: '/admin/applications' },
    { label: 'Interviews', value: '...', color: 'text-emerald-400', icon: '🎯', link: '/admin/applications' },
    { label: 'Pending', value: '...', color: 'text-amber-400', icon: '⏳', link: '/admin/applications' },
    { label: 'Offers', value: '...', color: 'text-purple-400', icon: '🎉', link: '/admin/applications' },
    { label: 'Total Jobs', value: '...', color: 'text-cyan-400', icon: '💼', link: '/jobs' },
    { label: 'Students', value: '...', color: 'text-pink-400', icon: '👩‍💻', link: '/admin/students' },
  ]);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [appsRes, jobsRes, studentsRes] = await Promise.all([
          supabase.from('applications').select('id, status, applied_at'),
          supabase.from('jobs').select('id', { count: 'exact' }).eq('is_active', true),
          supabase.from('students').select('id', { count: 'exact' }),
        ]);

        const apps = appsRes.data || [];
        const totalApps = apps.length;
        const interviews = apps.filter((a: any) => a.status === 'Interview' || a.status === 'interview').length;
        const pending = apps.filter((a: any) => a.status === 'Applied' || a.status === 'Pending' || a.status === 'applied').length;
        const offers = apps.filter((a: any) => a.status === 'Offer' || a.status === 'offer').length;
        const jobCount = jobsRes.count || 0;
        const studentCount = studentsRes.count || 0;

        setStats([
          { label: 'Total Applied', value: totalApps, color: 'text-blue-400', icon: '📋', link: '/admin/applications' },
          { label: 'Interviews', value: interviews, color: 'text-emerald-400', icon: '🎯', link: '/admin/applications' },
          { label: 'Pending', value: pending, color: 'text-amber-400', icon: '⏳', link: '/admin/applications' },
          { label: 'Offers', value: offers, color: 'text-purple-400', icon: '🎉', link: '/admin/applications' },
          { label: 'Active Jobs', value: jobCount, color: 'text-cyan-400', icon: '💼', link: '/jobs' },
          { label: 'Students', value: studentCount, color: 'text-pink-400', icon: '👩‍💻', link: '/admin/students' },
        ]);

        const { data: recentData } = await supabase
          .from('applications')
          .select('id, status, applied_at')
          .order('applied_at', { ascending: false })
          .limit(5);
        setRecentApps(recentData || []);
      } catch (e) {
        console.error('Dashboard error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statusColors: Record<string, string> = {
    Applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Interview: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    interview: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Offer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    offer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const quickActions = [
    { label: 'Browse Jobs', href: '/jobs', icon: '🔍', desc: 'Find new opportunities' },
    { label: 'Build Resume', href: '/resumes', icon: '📄', desc: 'Create ATS-ready resume' },
    { label: 'AI Tailor', href: '/tailor', icon: '🤖', desc: 'Tailor resume to JD' },
    { label: 'Interview Prep', href: '/interview', icon: '🎯', desc: 'Practice with AI' },
    { label: 'Companies', href: '/company', icon: '🏢', desc: 'Explore top employers' },
    { label: 'Post a Job', href: '/dashboard/post-job', icon: '➕', desc: 'Add new job listing' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Your <span className="text-emerald-400">Dashboard</span></h1>
          <p className="text-slate-400">Track your job search progress and manage applications</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map(stat => (
            <Link key={stat.label} href={stat.link}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all text-center group">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {loading ? '...' : stat.value}
              </div>
              <div className="text-xs text-slate-500 group-hover:text-slate-400">{stat.label}</div>
            </Link>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map(action => (
              <Link key={action.label} href={action.href}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all group">
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-sm font-medium text-white group-hover:text-emerald-400 mb-1">{action.label}</div>
                <div className="text-xs text-slate-500">{action.desc}</div>
              </Link>
            ))}
          </div>
        </div>
        {/* Recent Applications */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link href="/admin/applications" className="text-emerald-400 text-sm hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="text-slate-500 text-center py-8">Loading...</div>
          ) : recentApps.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-500 mb-4">No applications yet</p>
              <Link href="/jobs" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm">Browse Jobs</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentApps.map(app => (
                <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Application #{app.id.slice(0, 8)}</p>
                    <p className="text-slate-500 text-sm">{app.applied_at ? new Date(app.applied_at).toLocaleDateString('en-IN') : 'N/A'}</p>
                  </div>
                  <span className={`text-xs border px-3 py-1 rounded-full ${statusColors[app.status] || statusColors['Pending']}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Admin Panel Link */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Admin Panel</h3>
            <p className="text-slate-400 text-sm">Manage jobs, companies, students, and applications</p>
          </div>
          <Link href="/admin" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Go to Admin
          </Link>
        </div>
      </div>
    </main>
  );
}