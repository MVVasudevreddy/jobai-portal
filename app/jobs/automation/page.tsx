'use client';
import { useState } from 'react';

const tasks = [
  {
    id: 1,
    company: 'TCS',
    role: 'Software Engineer',
    type: 'job',
    portal: 'Naukri',
    status: 'completed',
    appliedAt: '2026-05-05 09:31',
  },
  {
    id: 2,
    company: 'Infosys',
    role: 'SDE Intern',
    type: 'internship',
    portal: 'LinkedIn',
    status: 'completed',
    appliedAt: '2026-05-04 14:12',
  },
  {
    id: 3,
    company: 'Wipro',
    role: 'Data Analyst',
    type: 'job',
    portal: 'Indeed',
    status: 'running',
    appliedAt: '...',
  },
  {
    id: 4,
    company: 'Zoho',
    role: 'ML Engineer',
    type: 'job',
    portal: 'Naukri',
    status: 'queued',
    appliedAt: '-',
  },
  {
    id: 5,
    company: 'Amazon',
    role: 'SDE Intern',
    type: 'internship',
    portal: 'LinkedIn',
    status: 'queued',
    appliedAt: '-',
  },
  {
    id: 6,
    company: 'Amazon',
    role: 'Data Engineer',
    type: 'job',
    portal: 'Indeed',
    status: 'queued',
    appliedAt: '-',
  },
];

const statusStyle: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  running: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  queued: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  failed: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function AutomationPage() {
  const [autoApply, setAutoApply] = useState(true);
  const [portals, setPortals] = useState({
    naukri: true,
    linkedin: true,
    indeed: true,
    unstop: false,
    internshala: false,
  });

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Auto-Apply Engine</h1>
          <p className="text-slate-400 text-sm">
            Schedule and monitor automated job applications across all portals
          </p>
        </div>

        {/* Status Banner */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Auto-Apply is {autoApply ? 'ACTIVE' : 'PAUSED'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Worker polls for new queued tasks every 5 minutes
            </p>
          </div>
          <button
            onClick={() => setAutoApply(!autoApply)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              autoApply
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            {autoApply ? 'Pause Auto-Apply' : 'Start Auto-Apply'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <h2 className="font-semibold">Auto-Apply Settings</h2>

            <div>
              <h3 className="text-xs font-medium text-slate-400 mb-2">
                Enable Portals
              </h3>
              <div className="space-y-2">
                {Object.entries(portals).map(([key, val]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      onClick={() =>
                        setPortals((p) => ({
                          ...p,
                          [key]: !p[key as keyof typeof p],
                        }))
                      }
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        val
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-slate-600'
                      }`}
                    >
                      {val && (
                        <span className="text-slate-950 text-xs">&#10003;</span>
                      )}
                    </div>
                    <span className="text-sm capitalize">{key}</span>
                    <span className="text-xs text-slate-500">
                      {key === 'naukri'
                        ? 'Best for India'
                        : key === 'linkedin'
                        ? 'Easy Apply'
                        : key === 'indeed'
                        ? 'Wide coverage'
                        : key === 'unstop'
                        ? 'Competitions + Jobs'
                        : 'Internships'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-slate-400 mb-2">
                Apply Rules
              </h3>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Max applications/day</span>
                  <span className="text-white">20</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience filter</span>
                  <span className="text-white">0-3 years</span>
                </div>
                <div className="flex justify-between">
                  <span>Location preference</span>
                  <span className="text-white">Chennai, Remote</span>
                </div>
                <div className="flex justify-between">
                  <span>Resume profile</span>
                  <span className="text-white">AI/ML Fresher</span>
                </div>
                <div className="flex justify-between">
                  <span>Skip if already applied</span>
                  <span className="text-emerald-400">Yes</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 text-xs transition-all">
                Save Settings
              </button>
              <button className="rounded-md border border-slate-700 hover:border-emerald-500 text-slate-300 py-2 text-xs transition-all">
                Run Now
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Completed', value: '2', color: 'text-emerald-400' },
                { label: 'Running', value: '1', color: 'text-blue-400' },
                { label: 'Queued', value: '3', color: 'text-yellow-400' },
                { label: 'Failed', value: '0', color: 'text-red-400' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-center"
                >
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Integrations */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h2 className="font-semibold text-sm mb-3">Integrations</h2>
              <div className="space-y-2">
                {[
                  {
                    name: 'Gmail',
                    desc: 'Read interview emails + update status',
                    connected: true,
                  },
                  {
                    name: 'Google Calendar',
                    desc: 'Auto-create interview events',
                    connected: true,
                  },
                  {
                    name: 'LinkedIn',
                    desc: 'Easy Apply automation',
                    connected: false,
                  },
                  {
                    name: 'GitHub',
                    desc: 'Auto-attach project links',
                    connected: true,
                  },
                ].map((i) => (
                  <div
                    key={i.name}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium">{i.name}</p>
                      <p className="text-xs text-slate-500">{i.desc}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        i.connected
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {i.connected ? 'Connected' : 'Connect'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task Log */}
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="font-semibold">Application Queue &amp; Log</h2>
            <button className="text-xs text-emerald-400 hover:underline">
              Clear completed
            </button>
          </div>
          <div className="divide-y divide-slate-800">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{t.role}</p>
                  <p className="text-xs text-slate-400">
                    {t.company} • {t.portal} • {t.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{t.appliedAt}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      statusStyle[t.status]
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
