'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewResumePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    label: '',
    seniority: 'Fresher',
    track: '',
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to database
    const resumeId = formData.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/resumes/${resumeId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Resume</h1>
            <p className="text-slate-400 text-sm">
              Fill in your details to generate an ATS-optimized resume
            </p>
          </div>
          <Link
            href="/resumes"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Meta */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold mb-4">Resume Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Profile Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., AI/ML Fresher"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Seniority *</label>
                <select
                  required
                  value={formData.seniority}
                  onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior (1-2 yrs)</option>
                  <option value="Mid">Mid (3-5 yrs)</option>
                  <option value="Senior">Senior (6+ yrs)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Track/Focus *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., AI / ML, Backend, Full Stack"
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="MULAMREDDY VENKATA VASU DEVA REDDY"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Professional Title *</label>
                <input
                  type="text"
                  required
                  placeholder="B.Tech in Computer Science and Engineering"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vasudevreddy7832@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 8885572221"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Hyderabad, Telangana"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">GitHub</label>
                <input
                  type="text"
                  placeholder="github.com/MVVasudevreddy"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">LinkedIn</label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/venkata-vasu-deva-reddy-mulamreddy-6666vdr"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold mb-4">Professional Summary *</h2>
            <textarea
              required
              rows={5}
              placeholder="Write a compelling 3-4 line summary highlighting your key skills, experience, and career goals..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              Tip: Include keywords from your target job description
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold text-sm mb-2">What happens next?</h3>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Your resume will be created with an ATS score</li>
              <li>• You can add Skills, Experience, Projects, and Education in the edit page</li>
              <li>• Use AI Tailor to customize for specific job descriptions</li>
              <li>• Export as PDF when ready to apply</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition-all"
            >
              Create Resume
            </button>
            <Link
              href="/resumes"
              className="rounded-md bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 text-sm transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
