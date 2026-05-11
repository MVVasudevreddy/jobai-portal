import Link from 'next/link';

const stats = [
  { label: 'Total Applied', value: '24', color: 'text-emerald-400' },
  { label: 'Interviews', value: '3', color: 'text-blue-400' },
  { label: 'Pending', value: '8', color: 'text-yellow-400' },
  { label: 'Offers', value: '1', color: 'text-purple-400' },
];

const recentApps = [
  {
    company: 'TCS',
    role: 'Software Engineer',
    type: 'job',
    status: 'Applied',
    date: '2026-05-05',
    portal: 'Naukri',
  },
  {
    company: 'Infosys',
    role: 'SDE Intern',
    type: 'internship',
    status: 'Interview',
    date: '2026-05-04',
    portal: 'LinkedIn',
  },
  {
    company: 'Wipro',
    role: 'Data Analyst',
    type: 'job',
    status: 'Pending',
    date: '2026-05-03',
    portal: 'Indeed',
  },
  {
    company: 'Zoho',
    role: 'ML Engineer',
    type: 'job',
    status: 'Applied',
    date: '2026-05-02',
    portal: 'Naukri',
  },
  {
    company: 'Freshworks',
    role: 'Backend Intern',
    type: 'internship',
    status: 'Rejected',
    date: '2026-05-01',
    portal: 'Unstop',
  },
];

const statusColor: Record<string, string> = {
  Applied: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Interview: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
  Offer: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Welcome back! Here is your job search overview.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/jobs"
              className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500 transition-all"
            >
              Browse Jobs
            </Link>
            <Link
              href="/resumes"
              className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-sm transition-all"
            >
              Build Resume
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/jobs"
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500 transition-all"
          >
            <div className="text-2xl mb-2">&#128269;</div>
            <h3 className="font-semibold">Find Jobs &amp; Internships</h3>
            <p className="text-xs text-slate-400 mt-1">
              Search Naukri, LinkedIn, Indeed and more
            </p>
          </Link>
          <Link
            href="/tailor"
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500 transition-all"
          >
            <div className="text-2xl mb-2">&#129302;</div>
            <h3 className="font-semibold">AI Resume Tailor</h3>
            <p className="text-xs text-slate-400 mt-1">
              Paste JD and get tailored resume instantly
            </p>
          </Link>
          <Link
            href="/automation"
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500 transition-all"
          >
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold">Auto-Apply Engine</h3>
            <p className="text-xs text-slate-400 mt-1">
              Schedule auto-apply across all portals
            </p>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <h2 className="font-semibold">Recent Applications</h2>
            <Link
              href="/applications"
              className="text-xs text-emerald-400 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentApps.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3"
              >
                <div>
                  <p className="font-medium text-sm">{a.role}</p>
                  <p className="text-xs text-slate-400">
                    {a.company} • {a.portal} • {a.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{a.date}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      statusColor[a.status] || ''
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-semibold mb-4">Upcoming Interviews</h2>
          <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-sm font-medium text-emerald-400">
              Infosys - SDE Intern Interview
            </p>
            <p className="text-xs text-slate-400 mt-1">
              May 08, 2026 at 11:00 AM IST • Google Meet • Technical Round
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
