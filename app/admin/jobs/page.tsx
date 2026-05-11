'use client';
import { useState } from 'react';

type Job = {
  id: number;
  title: string;
  company: string;
  slug: string;
  type: 'job' | 'internship';
  location: string;
  ctc: string;
  exp: string;
  skills: string;
  portal: string;
  isActive: boolean;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'TCS',
    slug: 'tcs',
    type: 'job',
    location: 'Chennai',
    ctc: '3-6 LPA',
    exp: '0-2 yrs',
    skills: 'Python,SQL,Java',
    portal: 'Naukri',
    isActive: true,
  },
  {
    id: 2,
    title: 'SDE Intern',
    company: 'Infosys',
    slug: 'infosys',
    type: 'internship',
    location: 'Bengaluru',
    ctc: '15k/mo',
    exp: '0 yrs',
    skills: 'Java,Spring,SQL',
    portal: 'LinkedIn',
    isActive: true,
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Wipro',
    slug: 'wipro',
    type: 'job',
    location: 'Hyderabad',
    ctc: '4-7 LPA',
    exp: '0-2 yrs',
    skills: 'SQL,Python,Excel',
    portal: 'Indeed',
    isActive: true,
  },
  {
    id: 4,
    title: 'ML Engineer',
    company: 'Zoho',
    slug: 'zoho',
    type: 'job',
    location: 'Chennai',
    ctc: '6-10 LPA',
    exp: '0-3 yrs',
    skills: 'Python,ML,TensorFlow',
    portal: 'Naukri',
    isActive: true,
  },
  {
    id: 5,
    title: 'Backend Intern',
    company: 'Freshworks',
    slug: 'freshworks',
    type: 'internship',
    location: 'Chennai',
    ctc: '20k/mo',
    exp: '0 yrs',
    skills: 'Node.js,React,MongoDB',
    portal: 'Unstop',
    isActive: true,
  },
  {
    id: 6,
    title: 'AI/ML Intern',
    company: 'Google',
    slug: 'google',
    type: 'internship',
    location: 'Hyderabad',
    ctc: '80k/mo',
    exp: '0 yrs',
    skills: 'Python,TensorFlow,NLP',
    portal: 'LinkedIn',
    isActive: true,
  },
  {
    id: 7,
    title: 'Software Developer',
    company: 'Google',
    slug: 'google',
    type: 'job',
    location: 'Hyderabad',
    ctc: '15-30 LPA',
    exp: '0-2 yrs',
    skills: 'C++,Python,Algorithms',
    portal: 'LinkedIn',
    isActive: true,
  },
  {
    id: 8,
    title: 'Data Engineer',
    company: 'Amazon',
    slug: 'amazon',
    type: 'job',
    location: 'Bengaluru',
    ctc: '12-20 LPA',
    exp: '0-2 yrs',
    skills: 'SQL,Python,Spark,AWS',
    portal: 'Indeed',
    isActive: false,
  },
];

const empty: Omit<Job, 'id'> = {
  title: '',
  company: '',
  slug: '',
  type: 'job',
  location: '',
  ctc: '',
  exp: '',
  skills: '',
  portal: 'Naukri',
  isActive: true,
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Job, 'id'>>(empty);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setForm(empty);
    setEditId(null);
    setShowForm(true);
  }
  function openEdit(j: Job) {
    const { id, ...rest } = j;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  }
  function handleSave() {
    if (!form.title || !form.company) return;
    if (editId !== null) {
      setJobs((prev) =>
        prev.map((j) => (j.id === editId ? { ...form, id: editId } : j))
      );
    } else {
      setJobs((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
  }
  function handleDelete(id: number) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setDeleteId(null);
  }
  function toggleActive(id: number) {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isActive: !j.isActive } : j))
    );
  }

  return (
    <div className="p-6 text-white space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Jobs & Internships CRUD</h1>
          <p className="text-slate-400 text-xs">
            {jobs.length} total • {jobs.filter((j) => j.isActive).length} active
          </p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-sm"
        >
          + Add New Job
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full rounded-md bg-slate-900 border border-slate-700 text-sm px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        placeholder="Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Title / Company
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Type
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Location / CTC
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Portal
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950">
            {filtered.map((j) => (
              <tr key={j.id} className="hover:bg-slate-900 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{j.title}</p>
                  <p className="text-xs text-slate-400">{j.company}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      j.type === 'job'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {j.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs">{j.location}</p>
                  <p className="text-xs text-slate-400">{j.ctc}</p>
                </td>
                <td className="px-4 py-3 text-xs text-slate-300">{j.portal}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(j.id)}
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      j.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {j.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(j)}
                      className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(j.id)}
                      className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-8">
            No jobs found.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 space-y-4">
            <h2 className="font-bold text-lg">
              {editId ? 'Edit Job' : 'Add New Job'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ['title', 'Title', 'text'],
                  ['company', 'Company', 'text'],
                  ['slug', 'Company Slug', 'text'],
                  ['location', 'Location', 'text'],
                  ['ctc', 'CTC / Stipend', 'text'],
                  ['exp', 'Experience', 'text'],
                  ['skills', 'Skills (comma separated)', 'text'],
                  ['portal', 'Portal', 'text'],
                ] as [
                  keyof Omit<Job, 'id' | 'type' | 'isActive'>,
                  string,
                  string
                ][]
              ).map(([key, label]) => (
                <div key={key} className={key === 'skills' ? 'col-span-2' : ''}>
                  <label className="block text-xs text-slate-400 mb-1">
                    {label}
                  </label>
                  <input
                    className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    value={form[key] as string}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Type
                </label>
                <select
                  className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: e.target.value as 'job' | 'internship',
                    }))
                  }
                >
                  <option value="job">Job</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Status
                </label>
                <select
                  className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={form.isActive ? 'true' : 'false'}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isActive: e.target.value === 'true',
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-md border border-slate-700 hover:border-slate-500 text-slate-300 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-xl border border-red-500/30 bg-slate-900 p-6 space-y-4">
            <h2 className="font-bold text-lg text-red-400">Delete Job?</h2>
            <p className="text-sm text-slate-400">
              This action cannot be undone. The job posting will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-md bg-red-500 hover:bg-red-400 text-white font-semibold py-2 text-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-md border border-slate-700 text-slate-300 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
