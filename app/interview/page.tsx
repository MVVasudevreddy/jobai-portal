'use client';
import { useState } from 'react';
import Link from 'next/link';

const companies = [
  {
    id: 'google',
    name: 'Google',
    logo: 'G',
    color: 'from-blue-500 to-green-500',
    roles: ['SWE', 'ML Engineer', 'Data Scientist'],
    difficulty: 'Hard',
    rounds: ['Online Assessment', 'Phone Screen', '4-5 Onsite Rounds'],
    focusAreas: ['DSA', 'System Design', 'Behavioral', 'ML'],
    tips: 'Focus heavily on LeetCode Hard, system design at scale, and STAR-method behavioral answers.',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'A',
    color: 'from-orange-500 to-yellow-500',
    roles: ['SDE I', 'SDE II', 'ML Engineer'],
    difficulty: 'Medium-Hard',
    rounds: ['Online Assessment', 'Phone Screen', 'Loop (5-6 rounds)'],
    focusAreas: ['Leadership Principles', 'DSA', 'System Design'],
    tips: 'Amazon weighs Leadership Principles very heavily. Prepare 2+ stories per LP with STAR format.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'M',
    color: 'from-blue-600 to-cyan-500',
    roles: ['SWE', 'Data Scientist', 'AI Engineer'],
    difficulty: 'Medium',
    rounds: ['Phone Screen', '4-5 Onsite/Virtual Rounds'],
    focusAreas: ['DSA', 'System Design', 'Behavioral'],
    tips: 'Microsoft values collaboration and growth mindset. Behavioral rounds are as important as coding.',
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: 'T',
    color: 'from-purple-500 to-blue-500',
    roles: ['System Engineer', 'IT Analyst', 'ML Engineer'],
    difficulty: 'Easy-Medium',
    rounds: ['TCS NQT', 'Technical Interview', 'HR Interview'],
    focusAreas: ['Aptitude', 'Verbal', 'Coding', 'Core CS'],
    tips: 'TCS NQT is key – focus on Quantitative Aptitude, Logical Reasoning, Verbal, and basic coding.',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: 'I',
    color: 'from-blue-700 to-indigo-500',
    roles: ['System Engineer', 'Technology Analyst', 'Python Developer'],
    difficulty: 'Easy-Medium',
    rounds: ['InfyTQ / Online Test', 'Technical Interview', 'HR Interview'],
    focusAreas: ['Aptitude', 'Programming', 'Database', 'OS'],
    tips: 'Get InfyTQ certified early. Focus on Python, SQL, and OOP concepts.',
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logo: 'W',
    color: 'from-green-600 to-teal-500',
    roles: ['Project Engineer', 'Software Developer'],
    difficulty: 'Easy',
    rounds: ['NLTH / Online Test', 'Technical Round', 'HR Round'],
    focusAreas: ['Aptitude', 'English', 'Coding Basics'],
    tips: 'Wipro NLTH tests aptitude and basic programming. Practice verbal ability.',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: 'F',
    color: 'from-yellow-500 to-orange-400',
    roles: ['SWE', 'Data Scientist', 'ML Engineer'],
    difficulty: 'Hard',
    rounds: ['Online Coding Test', '3-4 Technical Rounds', 'Culture Fit'],
    focusAreas: ['DSA', 'System Design', 'LLD'],
    tips: 'Flipkart focuses on product thinking + engineering. Practice LLD heavily.',
  },
  {
    id: 'startups',
    name: 'Startups',
    logo: 'S',
    color: 'from-pink-500 to-rose-500',
    roles: ['Full Stack Developer', 'ML Engineer', 'DevOps'],
    difficulty: 'Varies',
    rounds: ['Take-Home Assignment', '2-3 Technical Rounds'],
    focusAreas: ['Project Work', 'Problem Solving', 'Full Stack'],
    tips: 'Startups value portfolio projects and ownership. Deploy real projects and show initiative.',
  },
];

const questionBank = [
  {
    id: 1,
    category: 'DSA',
    topic: 'Arrays',
    difficulty: 'Easy',
    question: "Find the maximum subarray sum (Kadane's Algorithm)",
  },
  {
    id: 2,
    category: 'DSA',
    topic: 'Trees',
    difficulty: 'Medium',
    question: 'Level order traversal of a binary tree',
  },
  {
    id: 3,
    category: 'DSA',
    topic: 'Dynamic Programming',
    difficulty: 'Hard',
    question: 'Longest Common Subsequence',
  },
  {
    id: 4,
    category: 'DSA',
    topic: 'Graphs',
    difficulty: 'Medium',
    question: 'Detect cycle in a directed graph',
  },
  {
    id: 5,
    category: 'DSA',
    topic: 'Strings',
    difficulty: 'Medium',
    question: 'Longest Palindromic Substring',
  },
  {
    id: 6,
    category: 'DSA',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    question: 'Reverse a linked list',
  },
  {
    id: 7,
    category: 'System Design',
    topic: 'Scalability',
    difficulty: 'Hard',
    question: 'Design a URL shortener like bit.ly',
  },
  {
    id: 8,
    category: 'System Design',
    topic: 'Databases',
    difficulty: 'Hard',
    question: 'Design Amazon product catalog system',
  },
  {
    id: 9,
    category: 'ML/AI',
    topic: 'Algorithms',
    difficulty: 'Medium',
    question: 'Explain bias-variance tradeoff with examples',
  },
  {
    id: 10,
    category: 'ML/AI',
    topic: 'Deep Learning',
    difficulty: 'Hard',
    question: 'Explain backpropagation step by step',
  },
  {
    id: 11,
    category: 'ML/AI',
    topic: 'NLP',
    difficulty: 'Medium',
    question: 'How does the Transformer architecture work?',
  },
  {
    id: 12,
    category: 'Aptitude',
    topic: 'Quantitative',
    difficulty: 'Easy',
    question: 'If a train travels 360km in 4hrs, what is its speed?',
  },
  {
    id: 13,
    category: 'Aptitude',
    topic: 'Logical',
    difficulty: 'Medium',
    question: 'Series completion: 2, 6, 12, 20, 30, ?',
  },
  {
    id: 14,
    category: 'Behavioral',
    topic: 'Leadership',
    difficulty: 'Medium',
    question: 'Tell me about a time you led a team under pressure',
  },
  {
    id: 15,
    category: 'Behavioral',
    topic: 'Achievement',
    difficulty: 'Easy',
    question: 'What is your greatest achievement so far?',
  },
  {
    id: 16,
    category: 'SQL',
    topic: 'Joins',
    difficulty: 'Medium',
    question:
      'Write a query to find employees who earn more than their manager',
  },
  {
    id: 17,
    category: 'SQL',
    topic: 'Window Functions',
    difficulty: 'Hard',
    question: 'Find the 2nd highest salary in each department',
  },
];

export default function InterviewPrepPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [selectedDiff, setSelectedDiff] = useState('All');
  const categories = [
    'All',
    'DSA',
    'System Design',
    'ML/AI',
    'Aptitude',
    'Behavioral',
    'SQL',
  ];
  const filtered = questionBank.filter((q) => {
    const matchCat = activeCategory === 'All' || q.category === activeCategory;
    const matchDiff = selectedDiff === 'All' || q.difficulty === selectedDiff;
    const matchSearch =
      q.question.toLowerCase().includes(searchQ.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });
  const diffColor = (d: string) =>
    d === 'Easy'
      ? 'text-green-400 bg-green-400/10'
      : d === 'Medium'
      ? 'text-yellow-400 bg-yellow-400/10'
      : 'text-red-400 bg-red-400/10';

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1 text-emerald-400 text-sm mb-4">
            Interview Preparation Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crack Any{' '}
            <span className="text-emerald-400">Company Interview</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Company-wise roadmaps, question banks, DSA, ML, Aptitude, System
            Design — all in one place.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Target Company</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {companies.map((c) => (
            <Link
              key={c.id}
              href={`/interview/${c.id}`}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all hover:scale-105"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xl font-bold mb-3`}
              >
                {c.logo}
              </div>
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                {c.name}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  c.difficulty.includes('Hard')
                    ? 'bg-red-500/10 text-red-400'
                    : c.difficulty.includes('Medium')
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-green-500/10 text-green-400'
                }`}
              >
                {c.difficulty}
              </span>
              <p className="text-slate-500 text-xs mt-2">
                {c.rounds.length} rounds
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Question Bank{' '}
            <span className="text-emerald-400">({filtered.length})</span>
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search questions..."
              className="flex-1 min-w-48 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
            />
            <select
              value={selectedDiff}
              onChange={(e) => setSelectedDiff(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
            >
              {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === c
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((q) => (
              <div
                key={q.id}
                className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-mono shrink-0">
                  {q.id}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium group-hover:text-emerald-300 transition-colors">
                    {q.question}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">
                      {q.topic}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${diffColor(
                        q.difficulty
                      )}`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '💡',
              title: '20% Learn, 80% Practice',
              desc: "Don't just read theory. Code every problem from scratch every day.",
            },
            {
              icon: '🎯',
              title: 'STAR Method',
              desc: 'Situation → Task → Action → Result. Always quantify impact.',
            },
            {
              icon: '🚀',
              title: 'Build Real Projects',
              desc: 'Deploy on GitHub and cloud. Interviewers love real, working applications.',
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-slate-400 text-sm">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
