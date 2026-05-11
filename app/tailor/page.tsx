'use client';
import { useState } from 'react';

const sampleTailored = {
  summary:
    'Entry-level AI/ML Engineer with hands-on experience in Python, NLP, and model deployment. Built VoiceQuery AI (Speech-to-SQL) and TrollGuard (cyberbullying detector) using BERT, scikit-learn, and FastAPI. Strong foundation in SQL query optimization and data preprocessing pipelines. Ready to contribute to production ML systems from day one.',
  skills: [
    'Python',
    'SQL',
    'Machine Learning',
    'NLP',
    'BERT',
    'scikit-learn',
    'FastAPI',
    'PostgreSQL',
    'Pandas',
    'NumPy',
    'TensorFlow',
    'Git',
  ],
  bullets: [
    'Designed and deployed VoiceQuery AI, a Speech-to-SQL system that converts voice queries to parameterized PostgreSQL statements using NLP entity extraction, achieving 87% accuracy on domain-specific dataset',
    'Built TrollGuard cyberbullying detection system using BERT fine-tuning, achieving F1 score of 0.83 across 6 toxicity categories on custom annotated dataset',
    'Optimized database queries reducing average query execution time by 40% through proper indexing and query restructuring',
  ],
  matchScore: 91,
};

export default function TailorPage() {
  const [jd, setJd] = useState('');
  const [profile, setProfile] = useState('fresher-aiml');
  const [tailored, setTailored] = useState<typeof sampleTailored | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTailor() {
    if (!jd.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setTailored(sampleTailored);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Resume Tailor</h1>
          <p className="text-slate-400 text-sm">
            Paste any job description and get an ATS-optimised tailored resume
            instantly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Resume Profile
              </label>
              <select
                className="w-full rounded-md bg-slate-900 border border-slate-700 text-sm px-3 py-2 text-slate-300 focus:outline-none focus:border-emerald-500"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              >
                <option value="fresher-sql">SQL + Python Fresher</option>
                <option value="fresher-aiml">AI/ML Fresher</option>
                <option value="fresher-data">Data Analytics Fresher</option>
                <option value="junior-sde">Junior SDE (1-2 yrs)</option>
                <option value="mid-backend">
                  Mid Backend Engineer (3-5 yrs)
                </option>
                <option value="senior-arch">Senior / Architect (6+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Paste Job Description
              </label>
              <textarea
                className="w-full h-64 rounded-md bg-slate-900 border border-slate-700 text-sm px-3 py-2 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                placeholder="Paste the full job description here...&#10;&#10;Example: We are looking for a Machine Learning Engineer with experience in Python, TensorFlow, NLP, and model deployment. You will build production ML pipelines..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            <button
              onClick={handleTailor}
              disabled={loading || !jd.trim()}
              className="w-full rounded-md bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold py-2.5 text-sm transition-all"
            >
              {loading ? 'Tailoring resume...' : 'Tailor Resume with AI'}
            </button>

            <div className="rounded-md border border-slate-800 bg-slate-900 p-3 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-1">
                What happens when you click Tailor:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>AI extracts required skills from JD</li>
                <li>Summary is rewritten to match JD tone and keywords</li>
                <li>Skills are reordered by relevance to JD</li>
                <li>
                  Project bullets are tweaked to emphasize JD-matching skills
                </li>
                <li>ATS match score is calculated</li>
              </ul>
            </div>
          </div>

          {/* Output */}
          <div>
            {!tailored && !loading && (
              <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-slate-600 text-sm text-center p-8">
                Paste a JD and click Tailor to see AI-generated resume tailoring
                here
              </div>
            )}
            {loading && (
              <div className="h-full flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 text-sm text-center p-8">
                <div className="space-y-2">
                  <div className="text-2xl">&#129302;</div>
                  <p>AI is reading the JD and tailoring your resume...</p>
                </div>
              </div>
            )}
            {tailored && (
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Tailored Resume Output</h2>
                  <span className="text-emerald-400 font-bold text-lg">
                    {tailored.matchScore}% Match
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 mb-1">
                    Tailored Summary
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {tailored.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 mb-2">
                    Skills (JD-Matched)
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {tailored.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 mb-2">
                    Tailored Project Bullets
                  </h3>
                  <ul className="space-y-2">
                    {tailored.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-slate-300 flex gap-2">
                        <span className="text-emerald-400 mt-0.5">&#8226;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 text-xs transition-all">
                    Export as PDF
                  </button>
                  <button className="flex-1 rounded-md border border-slate-700 hover:border-emerald-500 text-slate-300 py-2 text-xs transition-all">
                    Save to Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
