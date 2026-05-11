'use client';
import { useEffect, useState } from 'react';
import type { Student } from '@/lib/supabase';

const emptyForm = {
  name: '',
  email: '',
  branch: '',
  year: 1,
  status: 'Active',
  roll_number: '',
  phone: '',
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const body = editId ? { ...form, id: editId } : form;
    const res = await fetch('/api/students', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg(editId ? 'Student updated!' : 'Student added!');
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      fetchStudents();
      setTimeout(() => setMsg(''), 3000);
    } else {
      const err = await res.json();
      setMsg('Error: ' + err.error);
    }
  };

  const handleEdit = (s: Student) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      email: s.email,
      branch: s.branch,
      year: s.year,
      status: s.status,
      roll_number: s.roll_number || '',
      phone: s.phone || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student?')) return;
    const res = await fetch('/api/students?id=' + id, { method: 'DELETE' });
    if (res.ok) {
      setMsg('Deleted!');
      fetchStudents();
      setTimeout(() => setMsg(''), 2000);
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.branch?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Management
          </h1>
          <p className="text-gray-500 mt-1">Admin CRUD — Supabase powered</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          + Add Student
        </button>
      </div>

      {msg && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
            msg.startsWith('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {msg}
        </div>
      )}

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, branch..."
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-5">
              {editId ? 'Edit Student' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                ['name', 'Name', 'text', true],
                ['email', 'Email', 'email', true],
                ['roll_number', 'Roll Number', 'text', false],
                ['phone', 'Phone', 'text', false],
                ['branch', 'Branch', 'text', true],
              ].map(([field, label, type, req]) => (
                <div key={field as string} className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label as string}
                    {req && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type as string}
                    required={!!req}
                    value={(form as any)[field as string]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        [field as string]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year<span className="text-red-500">*</span>
                </label>
                <select
                  value={form.year}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, year: Number(e.target.value) }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4].map((y) => (
                    <option key={y} value={y}>
                      Year {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Active', 'Inactive', 'Graduated', 'Suspended'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                  {editId ? 'Update' : 'Create'} Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm(emptyForm);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Loading students...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider grid grid-cols-7">
            <span>Name</span>
            <span>Email</span>
            <span>Roll No</span>
            <span>Branch</span>
            <span>Year</span>
            <span>Status</span>
            <span className="text-center">Actions</span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No students found. Click <strong>+ Add Student</strong> to get
              started.
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                className="px-6 py-4 border-b border-gray-50 grid grid-cols-7 items-center hover:bg-blue-50/30 transition"
              >
                <span className="font-medium text-gray-900">{s.name}</span>
                <span className="text-gray-500 text-sm">{s.email}</span>
                <span className="text-gray-500 text-sm">
                  {s.roll_number || '-'}
                </span>
                <span className="text-gray-700 text-sm">{s.branch}</span>
                <span className="text-gray-700 text-sm">Year {s.year}</span>
                <span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      s.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : s.status === 'Graduated'
                        ? 'bg-blue-100 text-blue-700'
                        : s.status === 'Suspended'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {s.status}
                  </span>
                </span>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
            Total: <strong>{filtered.length}</strong> students
          </div>
        </div>
      )}
    </div>
  );
}
