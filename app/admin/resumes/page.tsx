'use client';
import { useState } from 'react';

const sampleResumes = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun@email.com',
    level: 'Fresher',
    atsScore: 82,
    file: 'arjun_resume.pdf',
    uploadDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Nair',
    email: 'priya@email.com',
    level: 'Mid-Level',
    atsScore: 91,
    file: 'priya_resume.pdf',
    uploadDate: '2024-01-18',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Rohit Mehta',
    email: 'rohit@email.com',
    level: 'Senior',
    atsScore: 88,
    file: 'rohit_resume.pdf',
    uploadDate: '2024-01-20',
    status: 'Under Review',
  },
];

export default function AdminResumesPage() {
  const [resumes, setResumes] = useState(sampleResumes);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    level: 'Fresher',
    atsScore: 0,
    file: '',
    status: 'Active',
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const levels = [
    'All',
    'Fresher',
    'Junior',
    'Mid-Level',
    'Senior',
    'Executive',
  ];

  const filtered = resumes.filter(
    (r) =>
      (filterLevel === 'All' || r.level === filterLevel) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: '',
      email: '',
      level: 'Fresher',
      atsScore: 0,
      file: '',
      status: 'Active',
    });
    setShowModal(true);
  };
  const openEdit = (r: any) => {
    setEditItem(r);
    setForm({
      name: r.name,
      email: r.email,
      level: r.level,
      atsScore: r.atsScore,
      file: r.file,
      status: r.status,
    });
    setShowModal(true);
  };
  const saveResume = () => {
    if (editItem) {
      setResumes(
        resumes.map((r) => (r.id === editItem.id ? { ...r, ...form } : r))
      );
    } else {
      setResumes([
        ...resumes,
        {
          id: Date.now(),
          ...form,
          uploadDate: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setShowModal(false);
  };
  const deleteResume = (id: number) => {
    setResumes(resumes.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const getScoreColor = (score: number) =>
    score >= 90
      ? 'text-green-400'
      : score >= 75
      ? 'text-yellow-400'
      : 'text-red-400';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Resume Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Upload, manage and export user resumes with ATS scoring
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Upload Resume
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          ['Total Resumes', resumes.length, 'text-cyan-400'],
          [
            'Active',
            resumes.filter((r) => r.status === 'Active').length,
            'text-green-400',
          ],
          [
            'Avg ATS Score',
            Math.round(
              resumes.reduce((a, r) => a + r.atsScore, 0) / resumes.length
            ) || 0,
            'text-yellow-400',
          ],
          [
            'Under Review',
            resumes.filter((r) => r.status === 'Under Review').length,
            'text-orange-400',
          ],
        ].map(([label, val, color]) => (
          <div
            key={label as string}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700"
          >
            <p className="text-slate-400 text-xs">{label as string}</p>
            <p className={`text-2xl font-bold mt-1 ${color as string}`}>
              {val as number}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Export All CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              {[
                'Name',
                'Email',
                'Level',
                'ATS Score',
                'File',
                'Upload Date',
                'Status',
                'Actions',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-slate-300 px-4 py-3 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-t border-slate-700 hover:bg-slate-750"
              >
                <td className="px-4 py-3 text-white font-medium">{r.name}</td>
                <td className="px-4 py-3 text-slate-300">{r.email}</td>
                <td className="px-4 py-3">
                  <span className="bg-slate-600 text-slate-200 px-2 py-0.5 rounded text-xs">
                    {r.level}
                  </span>
                </td>
                <td
                  className={`px-4 py-3 font-bold ${getScoreColor(r.atsScore)}`}
                >
                  {r.atsScore}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{r.file}</span>
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs">
                      ⬇ Export
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {r.uploadDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      r.status === 'Active'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-orange-900 text-orange-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(r.id)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
            <h2 className="text-white font-bold text-lg mb-4">
              {editItem ? 'Edit Resume' : 'Upload Resume'}
            </h2>
            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                {['Fresher', 'Junior', 'Mid-Level', 'Senior', 'Executive'].map(
                  (l) => (
                    <option key={l}>{l}</option>
                  )
                )}
              </select>
              <input
                type="number"
                value={form.atsScore}
                onChange={(e) =>
                  setForm({ ...form, atsScore: parseInt(e.target.value) || 0 })
                }
                placeholder="ATS Score (0-100)"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              />
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm mb-2">
                  Upload Resume File
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setUploadFile(e.target.files[0]);
                      setForm({ ...form, file: e.target.files[0].name });
                    }
                  }}
                  className="text-slate-300 text-xs"
                />
                {form.file && (
                  <p className="text-green-400 text-xs mt-2">{form.file}</p>
                )}
              </div>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option>Active</option>
                <option>Under Review</option>
                <option>Archived</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={saveResume}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium text-sm"
              >
                {editItem ? 'Save Changes' : 'Upload'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm"
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
            <h2 className="text-white font-bold mb-2">Delete Resume?</h2>
            <p className="text-slate-400 text-sm mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteResume(deleteId)}
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
