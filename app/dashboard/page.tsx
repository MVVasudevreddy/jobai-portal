'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type StatCard = {
  label: string;
  value: string | number;
  color: string;
  icon: string;
  link: string;
};

type Application = {
  id: string;
  job_id?: string;
  status: string;
  applied_at?: string;
  company?: string;
  title?: string;
};

// Fallback demo data shown instantly while Supabase loads
const FALLBACK_STATS: StatCard[] = [
  { label: 'Total Applied', value: 0, color: 'text-blue-400', icon: '📋', link: '/admin/applications' },
  { label: 'Interviews', value: 0, color: 'text-emerald-400', icon: '🎯', link: '/admin/applications' },
  { label: 'Pending', value: 0, color: 'text-amber-400', icon: '⏳', link: '/admin/applications' },
  { label: 'Offers', value: 0, color: 'text-purple-400', icon: '🎉', link: '/admin/applications' },
  { label: 'Total Jobs', value: 6, color: 'text-cyan-400', icon: '💼', link: '/jobs' },
  { label: 'Students', value: 0, color: 'text-pink-400', icon: '👩‍💻', link: '/admin/students' },
];

const QUICK_ACTIONS = [
  { title: 'Browse Jobs', desc: 'Find new opportunities', icon: '🔍', link: '/jobs' },
  { title: 'Build Resume', desc: 'Create ATS-ready resume', icon: '📝', link: '/resumes' },
  { title: 'AI Tailor', desc: 'Tailor resume to JD', icon: '🤖', link: '/tailor' },
  { title: 'Interview Prep', desc: 'Practice with AI', icon: '🎯', link: '/interview' },
  { title: 'Companies', desc: 'Explore top employers', icon: '🏢', link: '/company' },
  { title: 'Post a Job', desc: 'Add new job listing', icon: '➕', link: '/admin' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    interview: 'bg-emerald-900 text-emerald-300',
    offer: 'bg-purple-900 text-purple-300',
    rejected: 'bg-red-900 text-red-300',
    applied: 'bg-blue-900 text-blue-300',
    pending: 'bg-amber-900 text-amber-300',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${map[status] ?? 'bg-slate-700 text-slate-300'}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>(FALLBACK_STATS);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildStats = useCallback((
    apps: Application[],
    jobCount: number,
    studentCount: number
  ): StatCard[] => [
    { label: 'Total Applied', value: apps.length, color: 'text-blue-400', icon: '📋', link: '/admin/applications' },
    { label: 'Interviews', value: apps.filter(a => a.status === 'interview').length, color: 'text-emerald-400', icon: '🎯', link: '/admin/applications' },
    { label: 'Pending', value: apps.filter(a => ['pending','applied'].includes(a.status)).length, color: 'text-amber-400', icon: '⏳', link: '/admin/applications' },
    { label: 'Offers', value: apps.filter(a => a.status === 'offer').length, color: 'text-purple-400', icon: '🎉', link: '/admin/applications' },
    { label: 'Total Jobs', value: jobCount, color: 'text-cyan-400', icon: '💼', link: '/jobs' },
    { label: 'Students', value: studentCount, color: 'text-pink-400', icon: '👩‍💻', link: '/admin/students' },
  ], []);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      const [appsRes, jobsRes, studentsRes, recentRes] = await Promise.all([
        supabase.from('applications').select('id, status, applied_at, company, title'),
        supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('students').select('id', { count: 'exact', head: true }),
        supabase
          .from('applications')
          .select('id, status, applied_at, company, title')
          .order('applied_at', { ascending: false })
          .limit(5),
      ]);

      const allApps: Application[] = appsRes.data ?? [];
      const jobCount = jobsRes.count ?? 6;
      const studentCount = studentsRes.count ?? 0;

      setStats(buildStats(allApps, jobCount, studentCount));
      setRecentApps(recentRes.data ?? []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Could not connect to database. Showing cached data.');
    } finally {
      setLoading(false);
    }
  }, [buildStats]);

  // Initial load
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        fetchDashboardData();
      })
      .subscribe((status) => {
        setIsLive(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDashboardData]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Your <span className="text-emerald-400">Dashboard</span>
          </h1>
          <p className="text-slate-400">Track your job search progress and manage applications</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-xs text-slate-400">{isLive ? 'Live' : 'Offline'}</span>
          </div>
          {lastUpdated && (
            <span className="text-xs text-slate-500">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchDashboardData}
            className="text-xs text-emerald-400 hover:text-emerald-300 transition mt-1"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 bg-amber-900/30 border border-amber-700 text-amber-300 text-sm px-4 py-2 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.link}
            className="bg-slate-800 rounded-xl p-4 flex flex-col items-center hover:bg-slate-700 transition-all hover:scale-105 group"
          >
            <span className="text-3xl mb-2">{stat.icon}</span>
            <span className={`text-2xl font-bold ${stat.color}`}>
              {loading ? (
                <span className="inline-block w-8 h-6 bg-slate-700 rounded animate-pulse" />
              ) : stat.value}
            </span>
            <span className="text-xs text-slate-400 text-center mt-1 group-hover:text-slate-300">{stat.label}</span>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.title}
            href={action.link}
            className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition-all hover:scale-105"
          >
            <span className="text-2xl mb-2 block">{action.icon}</span>
            <p className="font-semibold text-sm">{action.title}</p>
            <p className="text-xs text-slate-400 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
        <Link href="/admin/applications" className="text-emerald-400 text-sm hover:underline">
          View all
        </Link>
      </div>
      <div className="bg-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="divide-y divide-slate-700">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-slate-700 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-slate-700 rounded animate-pulse" />
                </div>
                <div className="w-16 h-5 bg-slate-700 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : recentApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-slate-400 mb-2">No applications yet.</p>
            <Link href="/jobs" className="text-emerald-400 hover:underline text-sm">
              Browse jobs to get started →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 hover:bg-slate-750 transition">
                <div>
                  <p className="font-medium">{app.title || app.company || 'Job Application'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {app.company && app.title ? app.company + ' • ' : ''}
                    {app.applied_at
                      ? new Date(app.applied_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : 'Recently'}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
