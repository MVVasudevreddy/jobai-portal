import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Job & Internship Portal',
  description:
    'Build ATS resumes, tailor per JD, auto-apply to Naukri, LinkedIn and more',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
            <Link href="/" className="text-emerald-400 font-bold text-lg">
              JobAI Portal
            </Link>
            <div className="flex items-center gap-1 flex-wrap">
              <Link
                href="/jobs"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
              >
                Jobs
              </Link>
              <Link
                href="/resumes"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
              >
                Resumes
              </Link>
              <Link
                href="/tailor"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
              >
                AI Tailor
              </Link>
              <Link
                href="/company"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
              >
                Companies
              </Link>
              <Link
                href="/interview"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-all font-medium"
              >
                Interview Prep
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-all font-semibold"
              >
                Admin
              </Link>
              <Link
                href="/dashboard"
                className="ml-2 px-4 py-1.5 text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-md transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
