'use client';
import { useState } from 'react';
import Link from 'next/link';

type Question = {
  id: number;
  company: string;
  role: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const initialQuestions: Question[] = [
  {
    id: 1,
    company: 'Google',
    role: 'SWE',
    category: 'DSA',
    question: 'Explain the time complexity of QuickSort',
    answer:
      'Average O(n log n), Worst O(n²) when pivot is always smallest/largest element.',
    difficulty: 'Medium',
  },
  {
    id: 2,
    company: 'Amazon',
    role: 'SDE',
    category: 'Behavioral',
    question: 'Tell me about a time you dealt with a difficult customer',
    answer:
      'Use STAR method: Situation, Task, Action, Result. Focus on customer obsession LP.',
    difficulty: 'Medium',
  },
  {
    id: 3,
    company: 'Microsoft',
    role: 'SWE',
    category: 'System Design',
    question: 'Design a URL shortener like bit.ly',
    answer:
      'Use hash function (MD5/Base62), distributed DB, caching layer, load balancer, CDN.',
    difficulty: 'Hard',
  },
  {
    id: 4,
    company: 'TCS',
    role: 'Developer',
    category: 'Technical',
    question: 'What is polymorphism in OOP?',
    answer:
      'Ability of objects to take multiple forms. Compile-time (overloading) and runtime (overriding).',
    difficulty: 'Easy',
  },
  {
    id: 5,
    company: 'Infosys',
    role: 'Systems Engineer',
    category: 'Technical',
    question: 'Explain ACID properties in databases',
    answer:
      'Atomicity, Consistency, Isolation, Durability - guarantees for database transactions.',
    difficulty: 'Medium',
  },
  {
    id: 6,
    company: 'Wipro',
    role: 'Developer',
    category: 'HR',
    question: 'Where do you see yourself in 5 years?',
    answer:
      'Mention technical growth, leadership ambitions, alignment with company goals.',
    difficulty: 'Easy',
  },
];

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({
    company: '',
    role: '',
    category: 'DSA',
    question: '',
    answer: '',
    difficulty: 'Medium' as Question['difficulty'],
  });

  const filtered = questions.filter(
    (q) =>
      q.company.toLowerCase().includes(filter.toLowerCase()) ||
      q.question.toLowerCase().includes(filter.toLowerCase()) ||
      q.category.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.question || !form.company) return;
    if (editId !== null) {
      setQuestions(
        questions.map((q) => (q.id === editId ? { ...form, id: editId } : q))
      );
      setEditId(null);
    } else {
      setQuestions([...questions, { ...form, id: Date.now() }]);
    }
    setForm({
      company: '',
      role: '',
      category: 'DSA',
      question: '',
      answer: '',
      difficulty: 'Medium',
    });
    setShowForm(false);
  };

  const handleEdit = (q: Question) => {
    setForm({
      company: q.company,
      role: q.role,
      category: q.category,
      question: q.question,
      answer: q.answer,
      difficulty: q.difficulty,
    });
    setEditId(q.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) =>
    setQuestions(questions.filter((q) => q.id !== id));

  const diffColor = {
    Easy: 'text-green-400 bg-green-900/30',
    Medium: 'text-yellow-400 bg-yellow-900/30',
    Hard: 'text-red-400 bg-red-900/30',
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/admin"
                className="text-slate-400 hover:text-white text-sm"
              >
                Admin
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-white text-sm">Interview Questions</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Interview Questions CRUD
            </h1>
            <p className="text-slate-400 text-sm">
              {questions.length} questions across{' '}
              {Array.from(new Set(questions.map((q) => q.company))).length} companies
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm({
                company: '',
                role: '',
                category: 'DSA',
                question: '',
                answer: '',
                difficulty: 'Medium',
              });
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Question'}
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">
              {editId ? 'Edit Question' : 'Add New Question'}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                placeholder="Company (e.g. Google)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              />
              <input
                placeholder="Role (e.g. SWE, ML Engineer)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                {[
                  'DSA',
                  'System Design',
                  'Behavioral',
                  'HR',
                  'Technical',
                  'ML/AI',
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    difficulty: e.target.value as Question['difficulty'],
                  })
                }
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <textarea
              placeholder="Question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm mb-3 h-20 resize-none"
            />
            <textarea
              placeholder="Answer / Key Points"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm mb-4 h-20 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium"
            >
              {editId ? 'Update' : 'Save Question'}
            </button>
          </div>
        )}

        <input
          placeholder="Search by company, question, or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm mb-4"
        />

        <div className="space-y-3">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-emerald-400 font-semibold text-sm">
                      {q.company}
                    </span>
                    <span className="text-slate-500 text-xs">{q.role}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        diffColor[q.difficulty]
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-1">{q.question}</p>
                  <p className="text-slate-400 text-sm">{q.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(q)}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded text-sm hover:bg-blue-600/30"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded text-sm hover:bg-red-600/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
