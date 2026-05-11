'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/jobs', label: 'Jobs & Internships', icon: '💼' },
  { href: '/admin/companies', label: 'Companies', icon: '🏢' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/resumes', label: 'Resumes', icon: '📄' },
  { href: '/admin/applications', label: 'Applications', icon: '📋' },
  { href: '/admin/students', label: 'Students', icon: '🎓' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
            Admin Panel
          </p>
          <h1 className="text-base font-bold text-white mt-0.5">
            JobAI Control
          </h1>
          <span className="inline-block mt-1 text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full">
            Admin Access
          </span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                path === n.href
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all"
          >
            <span>←</span>
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
