import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-1 mb-4">
            AI-Powered • Free Forever • Jobs + Internships
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your AI Job &amp; Internship
            <span className="text-emerald-400"> Copilot</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Build ATS-ready resumes for Fresher to Senior profiles, tailor them
            per job description, and auto-apply to Naukri, LinkedIn, Indeed and
            more — all from one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/dashboard"
              className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-8 py-3 transition-all"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/jobs"
              className="rounded-lg border border-slate-600 hover:border-emerald-500 text-white px-8 py-3 transition-all"
            >
              Browse Jobs &amp; Internships
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Everything you need to land your job
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📄',
                title: 'ATS Resume Builder',
                desc: 'Build professional resumes for Fresher, Junior, Mid, and Senior profiles. Live preview and PDF export.',
              },
              {
                icon: '🤖',
                title: 'AI Job Description Tailor',
                desc: 'Paste any JD and get instant resume tailoring: summary rewrite, skills reorder, custom bullets.',
              },
              {
                icon: '⚡',
                title: 'Auto Apply Engine',
                desc: 'Schedule auto-apply to Naukri, LinkedIn, Indeed. Apply to both job and internship at same company in one click.',
              },
              {
                icon: '🏢',
                title: 'Company Tracker',
                desc: 'See all open jobs AND internships from same company side by side. Apply to both instantly.',
              },
              {
                icon: '📧',
                title: 'Gmail Integration',
                desc: 'Auto-read interview emails, update application status, push events to Google Calendar.',
              },
              {
                icon: '📊',
                title: 'Application Dashboard',
                desc: 'Track every application: Pending, Applied, Interview, Offer, Rejected — all in one view.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-700 bg-slate-800 p-6 hover:border-emerald-500 transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Portals */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6 text-slate-300">
            Supports all major job portals
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'Naukri',
              'LinkedIn',
              'Indeed',
              'Unstop',
              'Internshala',
              'Wellfound',
              'Google Jobs',
              'Glassdoor',
              'HackerEarth',
              'Shine',
            ].map((p) => (
              <span
                key={p}
                className="rounded-full border border-slate-700 text-slate-400 text-sm px-4 py-1"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to automate your job search?
        </h2>
        <p className="text-slate-400 mb-8">
          Free forever. No credit card needed.
        </p>
        <Link
          href="/dashboard"
          className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-10 py-3 transition-all"
        >
          Start Now — It is Free
        </Link>
      </section>
    </main>
  );
}
