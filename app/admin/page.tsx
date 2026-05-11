import Link from 'next/link';

const adminModules = [
  {
    title: 'Jobs & Internships',
    desc: 'Manage all job and internship listings',
    icon: '💼',
    href: '/admin/jobs',
    color: 'bg-blue-600',
    count: '47 active',
  },
  {
    title: 'Companies',
    desc: 'Add, edit and delete company profiles',
    icon: '🏢',
    href: '/admin/companies',
    color: 'bg-purple-600',
    count: '18 listed',
  },
  {
    title: 'Resumes',
    desc: 'Review and manage user resumes',
    icon: '📄',
    href: '/admin/resumes',
    color: 'bg-yellow-600',
    count: '134 uploaded',
  },
  {
    title: 'Users',
    desc: 'Manage user accounts and roles',
    icon: '👥',
    href: '/admin/users',
    color: 'bg-green-600',
    count: '892 users',
  },
  {
    title: 'Applications',
    desc: 'Track all job applications',
    icon: '📋',
    href: '/admin/applications',
    color: 'bg-pink-600',
    count: '321 total',
  },
  {
    title: 'Interview Questions',
    desc: 'CRUD for company-wise interview Q&A',
    icon: '🎯',
    href: '/admin/questions',
    color: 'bg-red-600',
    count: '500+ questions',
  },
];

const stats = [
  {
    label: 'Total Jobs',
    value: '47',
    change: '+3 today',
    color: 'text-blue-400',
  },
  {
    label: 'Internships',
    value: '23',
    change: '+1 today',
    color: 'text-emerald-400',
  },
  {
    label: 'Companies',
    value: '18',
    change: '+2 this week',
    color: 'text-purple-400',
  },
  {
    label: 'Users',
    value: '892',
    change: '+15 today',
    color: 'text-yellow-400',
  },
  {
    label: 'Applications',
    value: '321',
    change: '+28 today',
    color: 'text-pink-400',
  },
  {
    label: 'Resumes',
    value: '134',
    change: '+7 today',
    color: 'text-orange-400',
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Full control over JobAI Portal content and users
            </p>
          </div>
          <span className="px-3 py-1 bg-red-600/20 border border-red-500 text-red-400 rounded-full text-sm font-semibold">
            Admin Access
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4"
            >
              <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Admin Modules */}
        <h2 className="text-xl font-semibold text-white mb-4">
          Management Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((mod) => (
            <Link
              key={mod.title}
              href={mod.href}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center text-2xl`}
                >
                  {mod.icon}
                </div>
                <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded">
                  {mod.count}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors">
                {mod.title}
              </h3>
              <p className="text-slate-400 text-sm">{mod.desc}</p>
              <div className="mt-4 flex items-center text-slate-500 text-sm">
                <span>Manage</span>
                <span className="ml-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/jobs"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Add Job
            </Link>
            <Link
              href="/admin/companies"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Add Company
            </Link>
            <Link
              href="/admin/questions"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Add Interview Question
            </Link>
            <Link
              href="/admin/users"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Manage Users
            </Link>
            <Link
              href="/interview"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              View Interview Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
