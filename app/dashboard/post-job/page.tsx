'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('jobs').insert([{
        title: form.title,
        company: form.company,
        location: form.location,
        type: form.type,
        description: form.description,
        requirements: form.requirements,
        salary: form.salary,
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      router.push('/jobs');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-400">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input name="company" value={form.company} onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input name="location" value={form.location} onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Salary (optional)</label>
            <input name="salary" value={form.salary} onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}