'use client';
import { useState } from 'react';

type Company = {
  id: number;
  name: string;
  slug: string;
  hq: string;
  size: string;
  website: string;
  sector: string;
  jobs: number;
  internships: number;
};

const init: Company[] = [
  {
    id: 1,
    name: 'Google',
    slug: 'google',
    hq: 'Hyderabad, India',
    size: '100,000+',
    website: 'google.com',
    sector: 'Technology',
    jobs: 1,
    internships: 1,
  },
  {
    id: 2,
    name: 'Amazon',
    slug: 'amazon',
    hq: 'Bengaluru, India',
    size: '1,500,000+',
    website: 'amazon.jobs',
    sector: 'E-commerce / Cloud',
    jobs: 1,
    internships: 1,
  },
  {
    id: 3,
    name: 'TCS',
    slug: 'tcs',
    hq: 'Mumbai, India',
    size: '600,000+',
    website: 'tcs.com',
    sector: 'IT Services',
    jobs: 1,
    internships: 0,
  },
  {
    id: 4,
    name: 'Infosys',
    slug: 'infosys',
    hq: 'Bengaluru, India',
    size: '300,000+',
    website: 'infosys.com',
    sector: 'IT Services',
    jobs: 1,
    internships: 1,
  },
  {
    id: 5,
    name: 'Zoho',
    slug: 'zoho',
    hq: 'Chennai, India',
    size: '15,000+',
    website: 'zoho.com',
    sector: 'SaaS',
    jobs: 1,
    internships: 0,
  },
  {
    id: 6,
    name: 'Freshworks',
    slug: 'freshworks',
    hq: 'Chennai, India',
    size: '6,000+',
    website: 'freshworks.com',
    sector: 'SaaS',
    jobs: 0,
    internships: 1,
  },
  {
    id: 7,
    name: 'Wipro',
    slug: 'wipro',
    hq: 'Bengaluru, India',
    size: '250,000+',
    website: 'wipro.com',
    sector: 'IT Services',
    jobs: 1,
    internships: 0,
  },
];

const emptyC: Omit<Company, 'id'> = {
  name: '',
  slug: '',
  hq: '',
  size: '',
  website: '',
  sector: '',
  jobs: 0,
  internships: 0,
};

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(init);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Company, 'id'>>(emptyC);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.sector.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setForm(emptyC);
    setEditId(null);
    setShowForm(true);
  }
  function openEdit(c: Company) {
    const { id, ...rest } = c;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  }
  function handleSave() {
    if (!form.name) return;
    if (editId !== null)
      setCompanies((p) =>
        p.map((c) => (c.id === editId ? { ...form, id: editId } : c))
      );
    else setCompanies((p) => [...p, { ...form, id: Date.now() }]);
    setShowForm(false);
  }
  function handleDelete(id: number) {
    setCompanies((p) => p.filter((c) => c.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="p-6 text-white space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Companies CRUD</h1>
          <p className="text-slate-400 text-xs">{companies.length} companies</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-sm"
        >
          + Add Company
        </button>
      </div>
      <input
        className="w-full rounded-md bg-slate-900 border border-slate-700 text-sm px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        placeholder="Search company or sector..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Company
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">HQ</th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Sector
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Size
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Jobs / Interns
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-900">
                <td className="px-4 py-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.website}</p>
                </td>
                <td className="px-4 py-3 text-xs">{c.hq}</td>
                <td className="px-4 py-3 text-xs">{c.sector}</td>
                <td className="px-4 py-3 text-xs">{c.size}</td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-blue-400">{c.jobs} jobs</span> /{' '}
                  <span className="text-emerald-400">
                    {c.internships} interns
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(c.id)}
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
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 space-y-4">
            <h2 className="font-bold text-lg">
              {editId ? 'Edit Company' : 'Add Company'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  'name',
                  'slug',
                  'hq',
                  'size',
                  'website',
                  'sector',
                ] as (keyof Omit<Company, 'id' | 'jobs' | 'internships'>)[]
              ).map((k) => (
                <div key={k}>
                  <label className="block text-xs text-slate-400 mb-1 capitalize">
                    {k}
                  </label>
                  <input
                    className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    value={form[k] as string}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [k]: e.target.value }))
                    }
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Jobs count
                </label>
                <input
                  type="number"
                  className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={form.jobs}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, jobs: +e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Internships count
                </label>
                <input
                  type="number"
                  className="w-full rounded-md bg-slate-800 border border-slate-700 text-sm px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={form.internships}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, internships: +e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-md border border-slate-700 text-slate-300 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-xl border border-red-500/30 bg-slate-900 p-6 space-y-4">
            <h2 className="font-bold text-lg text-red-400">Delete Company?</h2>
            <p className="text-sm text-slate-400">
              All linked jobs and internships will also be affected.
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
