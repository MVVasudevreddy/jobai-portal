'use client';
import { useState } from 'react';

const statusColors: Record<string, string> = {
  Applied: 'bg-blue-900 text-blue-300',
  Shortlisted: 'bg-yellow-900 text-yellow-300',
  Interview: 'bg-purple-900 text-purple-300',
  Offered: 'bg-green-900 text-green-300',
  Rejected: 'bg-red-900 text-red-300',
  Withdrawn: 'bg-slate-700 text-slate-300',
};

const sampleApplications = [
  {
    id: 1,
    applicant: 'Arjun Sharma',
    email: 'arjun@email.com',
    job: 'Frontend Developer',
    company: 'Google',
    type: 'Job',
    portal: 'LinkedIn',
    appliedDate: '2024-01-15',
    status: 'Interview',
    atsScore: 88,
  },
  {
    id: 2,
    applicant: 'Priya Nair',
    email: 'priya@email.com',
    job: 'ML Engineer Intern',
    company: 'Microsoft',
    type: 'Internship',
    portal: 'Naukri',
    appliedDate: '2024-01-18',
    status: 'Shortlisted',
    atsScore: 91,
  },
  {
    id: 3,
    applicant: 'Rohit Mehta',
    email: 'rohit@email.com',
    job: 'Backend Engineer',
    company: 'Amazon',
    type: 'Job',
    portal: 'Indeed',
    appliedDate: '2024-01-20',
    status: 'Applied',
    atsScore: 76,
  },
  {
    id: 4,
    applicant: 'Sneha Patel',
    email: 'sneha@email.com',
    job: 'Data Scientist',
    company: 'Flipkart',
    type: 'Job',
    portal: 'Unstop',
    appliedDate: '2024-01-22',
    status: 'Offered',
    atsScore: 94,
  },
  {
    id: 5,
    applicant: 'Kiran Kumar',
    email: 'kiran@email.com',
    job: 'DevOps Intern',
    company: 'Infosys',
    type: 'Internship',
    portal: 'Naukri',
    appliedDate: '2024-01-23',
    status: 'Rejected',
    atsScore: 65,
  },
];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState(sampleApplications);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    applicant: '',
    email: '',
    job: '',
    company: '',
    type: 'Job',
    portal: 'LinkedIn',
    appliedDate: '',
    status: 'Applied',
    atsScore: 0,
  });

  const statuses = [
    'All',
    'Applied',
    'Shortlisted',
    'Interview',
    'Offered',
    'Rejected',
    'Withdrawn',
  ];
  const portals = [
    'LinkedIn',
    'Naukri',
    'Indeed',
    'Unstop',
    'Internshala',
    'AngelList',
    'Glassdoor',
    'Direct',
  ];

  const filtered = apps.filter(
    (a) =>
      (filterStatus === 'All' || a.status === filterStatus) &&
      (filterType === 'All' || a.type === filterType) &&
      (a.applicant.toLowerCase().includes(search.toLowerCase()) ||
        a.job.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => {
    setEditItem(null);
    setForm({
      applicant: '',
      email: '',
      job: '',
      company: '',
      type: 'Job',
      portal: 'LinkedIn',
      appliedDate: '',
      status: 'Applied',
      atsScore: 0,
    });
    setShowModal(true);
  };
  const openEdit = (a: any) => {
    setEditItem(a);
    setForm({
      applicant: a.applicant,
      email: a.email,
      job: a.job,
      company: a.company,
      type: a.type,
      portal: a.portal,
      appliedDate: a.appliedDate,
      status: a.status,
      atsScore: a.atsScore,
    });
    setShowModal(true);
  };
  const saveApp = () => {
    if (editItem)
      setApps(apps.map((a) => (a.id === editItem.id ? { ...a, ...form } : a)));
    else setApps([...apps, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const deleteApp = (id: number) => {
    setApps(apps.filter((a) => a.id !== id));
    setDeleteId(null);
  };
  const updateStatus = (id: number, status: string) =>
    setApps(apps.map((a) => (a.id === id ? { ...a, status } : a)));

  const counts = (status: string) =>
    apps.filter((a) => a.status === status).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Applications Tracker
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track all job and internship applications across portals
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export CSV
          </button>
          <button
            onClick={openAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            + Add Application
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          'Applied',
          'Shortlisted',
          'Interview',
          'Offered',
          'Rejected',
          'Withdrawn',
        ].map((s) => (
          <div
            key={s}
            className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center"
          >
            <p className="text-xs text-slate-400">{s}</p>
            <p
              className={`text-xl font-bold mt-1 ${
                statusColors[s]?.split(' ')[1] || 'text-white'
              }`}
            >
              {counts(s)}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applicant, job, company..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Job</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              {[
                'Applicant',
                'Job Role',
                'Company',
                'Type',
                'Portal',
                'ATS',
                'Date',
                'Status',
                'Actions',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-slate-300 px-4 py-3 font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-t border-slate-700 hover:bg-slate-750"
              >
                <td className="px-4 py-3">
                  <p className="text-white font-medium">{a.applicant}</p>
                  <p className="text-slate-400 text-xs">{a.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-300">{a.job}</td>
                <td className="px-4 py-3 text-slate-300">{a.company}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      a.type === 'Internship'
                        ? 'bg-purple-900 text-purple-300'
                        : 'bg-blue-900 text-blue-300'
                    }`}
                  >
                    {a.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{a.portal}</td>
                <td className="px-4 py-3 font-bold text-yellow-400">
                  {a.atsScore}%
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {a.appliedDate}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    className={`text-xs rounded px-2 py-1 border-0 ${
                      statusColors[a.status] || 'bg-slate-700 text-white'
                    }`}
                  >
                    {[
                      'Applied',
                      'Shortlisted',
                      'Interview',
                      'Offered',
                      'Rejected',
                      'Withdrawn',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(a)}
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(a.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-700">
            <h2 className="text-white font-bold text-lg mb-4">
              {editItem ? 'Edit Application' : 'Add Application'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.applicant}
                onChange={(e) =>
                  setForm({ ...form, applicant: e.target.value })
                }
                placeholder="Applicant Name"
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                value={form.job}
                onChange={(e) => setForm({ ...form, job: e.target.value })}
                placeholder="Job Role"
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company"
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option>Job</option>
                <option>Internship</option>
              </select>
              <select
                value={form.portal}
                onChange={(e) => setForm({ ...form, portal: e.target.value })}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                {portals.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <input
                type="date"
                value={form.appliedDate}
                onChange={(e) =>
                  setForm({ ...form, appliedDate: e.target.value })
                }
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={form.atsScore}
                onChange={(e) =>
                  setForm({ ...form, atsScore: parseInt(e.target.value) || 0 })
                }
                placeholder="ATS Score"
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="col-span-2 bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                {[
                  'Applied',
                  'Shortlisted',
                  'Interview',
                  'Offered',
                  'Rejected',
                  'Withdrawn',
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={saveApp}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium text-sm"
              >
                {editItem ? 'Save' : 'Add'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-700 text-white py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-80 border border-slate-700">
            <h2 className="text-white font-bold mb-2">Delete Application?</h2>
            <p className="text-slate-400 text-sm mb-4">
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteApp(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-slate-700 text-white py-2 rounded-lg text-sm"
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
