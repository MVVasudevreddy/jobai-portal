import Link from 'next/link';

const profiles = [
  {
    id: 'fresher-sql',
    label: 'SQL + Python Fresher',
    seniority: 'Fresher',
    track: 'SQL / Python',
    atsScore: 88,
    lastUpdated: '2026-05-04',
    color: 'emerald',
  },
  {
    id: 'fresher-aiml',
    label: 'AI/ML Fresher',
    seniority: 'Fresher',
    track: 'AI / ML',
    atsScore: 85,
    lastUpdated: '2026-05-03',
    color: 'blue',
  },
  {
    id: 'fresher-data',
    label: 'Data Analytics Fresher',
    seniority: 'Fresher',
    track: 'Data Analytics',
    atsScore: 82,
    lastUpdated: '2026-05-02',
    color: 'purple',
  },
  {
    id: 'junior-sde',
    label: 'Junior SDE (1-2 yrs)',
    seniority: 'Junior',
    track: 'Generic SDE',
    atsScore: 90,
    lastUpdated: '2026-05-01',
    color: 'yellow',
  },
  {
    id: 'mid-backend',
    label: 'Mid Backend Engineer (3-5 yrs)',
    seniority: 'Mid',
    track: 'Backend',
    atsScore: 92,
    lastUpdated: '2026-04-30',
    color: 'orange',
  },
  {
    id: 'senior-arch',
    label: 'Senior / Architect (6+ yrs)',
    seniority: 'Senior',
    track: 'System Design',
    atsScore: 94,
    lastUpdated: '2026-04-29',
    color: 'red',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  blue: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
  purple: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
  yellow: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5',
  orange: 'border-orange-500/30 text-orange-400 bg-orange-500/5',
  red: 'border-red-500/30 text-red-400 bg-red-500/5',
};

export default function ResumesPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resume Profiles</h1>
            <p className="text-slate-400 text-sm">
              Manage ATS-ready resumes for every level and track
            </p>
          </div>
          <Link
            href="/resumes/new"
            className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-sm transition-all"
          >
            + New Resume
          </Link>
        </div>

        {/* ATS Score Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-center gap-4">
          <div className="text-3xl">&#129302;</div>
          <div>
            <h2 className="font-semibold text-sm">AI-Powered ATS Scoring</h2>
            <p className="text-xs text-slate-400">
              Each resume is scored against ATS parsers. Paste a JD in AI Tailor
              to get a tailored version with higher match score.
            </p>
          </div>
          <Link
            href="/tailor"
            className="ml-auto text-xs text-emerald-400 hover:underline whitespace-nowrap"
          >
            Go to AI Tailor
          </Link>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {profiles.map((p) => (
            <Link
              key={p.id}
              href={`/resumes/${p.id}`}
              className={`rounded-xl border p-5 hover:scale-[1.01] transition-all block ${
                colorMap[p.color]
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{p.label}</h2>
                  <p className="text-xs mt-1 opacity-75">
                    {p.seniority} • {p.track}
                  </p>
                  <p className="text-xs mt-1 opacity-60">
                    Last updated: {p.lastUpdated}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{p.atsScore}</div>
                  <p className="text-xs opacity-75">ATS Score</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="text-xs border border-current/30 rounded px-2 py-0.5 opacity-75">
                  Edit
                </span>
                <span className="text-xs border border-current/30 rounded px-2 py-0.5 opacity-75">
                  Preview
                </span>
                <span className="text-xs border border-current/30 rounded px-2 py-0.5 opacity-75">
                  Export PDF
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tips */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-semibold mb-3">ATS Resume Tips</h2>
          <div className="grid md:grid-cols-2 gap-3 text-xs text-slate-400">
            {[
              'Use single-column layout, no tables or text boxes',
              'Include keywords directly from the job description',
              'Standard section order: Summary, Skills, Experience, Projects, Education',
              'Use bullet points with What + How + Impact pattern',
              'Save as PDF with selectable text, not image',
              'Avoid headers, footers, columns, graphics in ATS mode',
              'Quantify achievements: Reduced query time by 40%, not just improved',
              'Match exact skill names from JD: PostgreSQL not just SQL',
            ].map((tip) => (
              <div key={tip} className="flex gap-2">
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
