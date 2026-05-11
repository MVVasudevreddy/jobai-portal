'use client';
import { useState } from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    role: 'User',
    status: 'Active',
    joined: '2024-01-15',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'User',
    status: 'Active',
    joined: '2024-02-20',
  },
  {
    id: 3,
    name: 'Arjun Reddy',
    email: 'arjun@example.com',
    role: 'Admin',
    status: 'Active',
    joined: '2023-11-10',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    role: 'User',
    status: 'Inactive',
    joined: '2024-03-05',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: 'User',
    status: 'Active',
    joined: '2024-04-12',
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id: number) =>
    setUsers(users.filter((u) => u.id !== id));
  const handleStatusToggle = (id: number) =>
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
          : u
      )
    );
  const handleRoleChange = (id: number) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, role: editRole || u.role } : u))
    );
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-slate-400 hover:text-white text-sm"
            >
              Admin
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-white text-sm">Users</span>
          </div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm">{users.length} total users</p>
        </div>

        <input
          placeholder="Search by name or email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm mb-4"
        />

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-slate-400 text-xs font-semibold px-4 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30"
                >
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-sm font-bold inline-flex mr-2">
                      {u.name[0]}
                    </div>
                    <span className="text-white text-sm">{u.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-sm">
                    {u.email}
                  </td>
                  <td className="px-4 py-3">
                    {editId === u.id ? (
                      <div className="flex gap-2">
                        <select
                          value={editRole || u.role}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                        >
                          <option>User</option>
                          <option>Admin</option>
                          <option>Recruiter</option>
                        </select>
                        <button
                          onClick={() => handleRoleChange(u.id)}
                          className="text-xs text-green-400 hover:text-green-300"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => {
                          setEditId(u.id);
                          setEditRole(u.role);
                        }}
                        className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded cursor-pointer hover:bg-slate-700"
                      >
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium cursor-pointer ${
                        u.status === 'Active'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                      onClick={() => handleStatusToggle(u.id)}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {u.joined}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-xs text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
