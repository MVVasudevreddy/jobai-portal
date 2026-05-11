'use client';
import { useState } from 'react';
import Link from 'next/link';

const companies: Record<string, any> = {
  google: {
    name: 'Google',
    logo: 'G',
    color: 'from-blue-500 to-green-500',
    roles: ['SWE', 'ML Engineer', 'Data Scientist', 'Product Manager'],
    difficulty: 'Hard',
    rounds: ['Online Assessment', 'Phone Screen', '4-5 Onsite Rounds'],
    focusAreas: ['DSA', 'System Design', 'Behavioral', 'ML'],
    tips: 'Focus heavily on LeetCode Hard, system design at scale, and STAR-method behavioral answers.',
    roadmap: [
      {
        phase: 'Phase 1: DSA Mastery',
        duration: '4-6 weeks',
        tasks: [
          'Complete 150+ LeetCode problems (Easy: 50, Medium: 70, Hard: 30)',
          'Focus: Arrays, Trees, Graphs, DP, Strings',
          'Practice Google-tagged problems on LeetCode',
        ],
      },
      {
        phase: 'Phase 2: System Design',
        duration: '2-3 weeks',
        tasks: [
          'Study Grokking the System Design Interview',
          'Design 10 common systems (YouTube, Google Search)',
          'Learn CAP theorem, distributed systems',
        ],
      },
      {
        phase: 'Phase 3: Behavioral',
        duration: '1 week',
        tasks: [
          'Prepare STAR stories for Googleyness',
          'Research Google culture and values',
          'Mock interviews with peers',
        ],
      },
    ],
  },
  amazon: {
    name: 'Amazon',
    logo: 'A',
    color: 'from-orange-500 to-yellow-500',
    roles: ['SDE I', 'SDE II', 'ML Engineer', 'Cloud Engineer'],
    difficulty: 'Medium-Hard',
    rounds: ['Online Assessment', 'Phone Screen', 'Loop (5-6 rounds)'],
    focusAreas: ['Leadership Principles', 'DSA', 'System Design'],
    tips: 'Amazon weighs Leadership Principles very heavily. Prepare 2+ stories per LP with STAR format.',
    roadmap: [
      {
        phase: 'Phase 1: Leadership Principles',
        duration: '1-2 weeks',
        tasks: [
          'Study all 16 Amazon Leadership Principles',
          'Prepare 2 STAR stories per principle',
          'Practice articulating impact with metrics',
        ],
      },
      {
        phase: 'Phase 2: DSA Focus',
        duration: '3-4 weeks',
        tasks: [
          'Focus on arrays, trees, graphs, DP',
          'Complete Amazon-tagged LeetCode problems',
          'Practice within 45-minute time constraints',
        ],
      },
      {
        phase: 'Phase 3: System Design',
        duration: '2 weeks',
        tasks: [
          'Design scalable distributed systems',
          'Study AWS services',
          'Learn SQS, SNS, DynamoDB patterns',
        ],
      },
    ],
  },
  microsoft: {
    name: 'Microsoft',
    logo: 'M',
    color: 'from-blue-600 to-cyan-500',
    roles: ['SWE', 'Data Scientist', 'AI Engineer'],
    difficulty: 'Medium',
    rounds: ['Phone Screen', '4-5 Onsite/Virtual Rounds'],
    focusAreas: ['DSA', 'System Design', 'Behavioral'],
    tips: 'Microsoft values collaboration and growth mindset. Behavioral rounds are as important as coding.',
    roadmap: [
      {
        phase: 'Phase 1: DSA',
        duration: '3-4 weeks',
        tasks: [
          'Practice arrays, trees, graphs, DP',
          'Microsoft-tagged LeetCode problems',
          'Focus on clean, readable code',
        ],
      },
      {
        phase: 'Phase 2: System Design',
        duration: '2 weeks',
        tasks: [
          'Study cloud architecture patterns',
          'Design Azure-based distributed systems',
          'Learn microservices and API design',
        ],
      },
    ],
  },
  tcs: {
    name: 'TCS',
    logo: 'T',
    color: 'from-purple-500 to-blue-500',
    roles: ['System Engineer', 'IT Analyst', 'ML Engineer'],
    difficulty: 'Easy-Medium',
    rounds: ['TCS NQT', 'Technical Interview', 'HR Interview'],
    focusAreas: ['Aptitude', 'Verbal', 'Coding', 'Core CS'],
    tips: 'TCS NQT is key – focus on Quantitative Aptitude, Logical Reasoning, Verbal, and basic coding.',
    roadmap: [
      {
        phase: 'Phase 1: NQT Prep',
        duration: '2-3 weeks',
        tasks: [
          'Practice Quantitative Aptitude (R.S. Aggarwal)',
          'Practice Logical Reasoning',
          'Practice Verbal & Reading Comprehension',
        ],
      },
      {
        phase: 'Phase 2: Coding Round',
        duration: '1-2 weeks',
        tasks: [
          'Practice basic programming in C/Python/Java',
          'Focus on arrays, strings, sorting',
          'Solve previous TCS NQT coding questions',
        ],
      },
      {
        phase: 'Phase 3: Technical Interview',
        duration: '1 week',
        tasks: [
          'Revise OOP concepts',
          'Revise DBMS, OS, CN fundamentals',
          'Prepare project explanation',
        ],
      },
    ],
  },
  infosys: {
    name: 'Infosys',
    logo: 'I',
    color: 'from-blue-700 to-indigo-500',
    roles: ['System Engineer', 'Technology Analyst', 'Python Developer'],
    difficulty: 'Easy-Medium',
    rounds: ['InfyTQ / Online Test', 'Technical Interview', 'HR Interview'],
    focusAreas: ['Aptitude', 'Programming', 'Database', 'OS'],
    tips: 'Get InfyTQ certified early. Focus on Python, SQL, and OOP concepts.',
    roadmap: [
      {
        phase: 'Phase 1: InfyTQ',
        duration: '2-3 weeks',
        tasks: [
          'Complete InfyTQ Python/Java course',
          'Practice coding challenges on InfyTQ',
          'Get InfyTQ Specialist certification',
        ],
      },
      {
        phase: 'Phase 2: Technical Prep',
        duration: '1-2 weeks',
        tasks: [
          'Revise Python/Java fundamentals',
          'Practice SQL queries',
          'Study OOP, DBMS concepts',
        ],
      },
    ],
  },
  wipro: {
    name: 'Wipro',
    logo: 'W',
    color: 'from-green-600 to-teal-500',
    roles: ['Project Engineer', 'Software Developer'],
    difficulty: 'Easy',
    rounds: ['NLTH / Online Test', 'Technical Round', 'HR Round'],
    focusAreas: ['Aptitude', 'English', 'Coding Basics'],
    tips: 'Wipro NLTH tests aptitude and basic programming. Practice verbal ability.',
    roadmap: [
      {
        phase: 'Phase 1: NLTH Prep',
        duration: '2 weeks',
        tasks: [
          'Practice aptitude (speed, accuracy)',
          'Practice verbal ability & grammar',
          'Practice basic coding questions',
        ],
      },
    ],
  },
  flipkart: {
    name: 'Flipkart',
    logo: 'F',
    color: 'from-yellow-500 to-orange-400',
    roles: ['SWE', 'Data Scientist', 'ML Engineer'],
    difficulty: 'Hard',
    rounds: ['Online Coding Test', '3-4 Technical Rounds', 'Culture Fit'],
    focusAreas: ['DSA', 'System Design', 'LLD'],
    tips: 'Flipkart focuses on product thinking + engineering. Practice LLD heavily.',
    roadmap: [
      {
        phase: 'Phase 1: DSA + LLD',
        duration: '4 weeks',
        tasks: [
          'Complete 100+ LeetCode problems',
          'Study Low Level Design patterns',
          'Practice designing class structures',
        ],
      },
      {
        phase: 'Phase 2: System Design',
        duration: '2 weeks',
        tasks: [
          'Design e-commerce systems',
          'Practice HLD/LLD combination',
          'Study product thinking',
        ],
      },
    ],
  },
  startups: {
    name: 'Startups',
    logo: 'S',
    color: 'from-pink-500 to-rose-500',
    roles: ['Full Stack Developer', 'ML Engineer', 'DevOps'],
    difficulty: 'Varies',
    rounds: ['Take-Home Assignment', '2-3 Technical Rounds'],
    focusAreas: ['Project Work', 'Problem Solving', 'Full Stack'],
    tips: 'Startups value portfolio projects and ownership. Deploy real projects and show initiative.',
    roadmap: [
      {
        phase: 'Phase 1: Build Portfolio',
        duration: '4-6 weeks',
        tasks: [
          'Build 3+ deployed full-stack projects',
          'Push everything to GitHub',
          'Write clear READMEs for all projects',
        ],
      },
      {
        phase: 'Phase 2: Technical Prep',
        duration: '2 weeks',
        tasks: [
          'Practice system design basics',
          'Review common coding questions',
          'Prepare project walkthroughs',
        ],
      },
    ],
  },
};

export default function CompanyInterviewPage({
  params,
}: {
  params: { company: string };
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const c = companies[params.company] || companies['tcs'];
  const tabs = ['overview', 'roadmap', 'tips'];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/interview"
          className="text-slate-400 hover:text-emerald-400 text-sm mb-6 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to All Companies
        </Link>

        <div className={`bg-gradient-to-br ${c.color} p-0.5 rounded-2xl mb-8`}>
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-4xl font-bold shrink-0`}
            >
              {c.logo}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {c.name} Interview Guide
              </h1>
              <p className="text-slate-400 mb-3">
                Complete preparation roadmap
              </p>
              <div className="flex flex-wrap gap-2">
                {c.roles.map((r: string) => (
                  <span
                    key={r}
                    className="text-xs bg-slate-800 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Difficulty', value: c.difficulty, icon: '🎯' },
            { label: 'Rounds', value: `${c.rounds.length} Rounds`, icon: '🔄' },
            {
              label: 'Focus Areas',
              value: `${c.focusAreas.length} Areas`,
              icon: '🎓',
            },
            {
              label: 'Phases',
              value: `${c.roadmap.length} Phases`,
              icon: '📋',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-bold text-white text-lg">{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === t
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-emerald-400">
                Interview Rounds
              </h3>
              <div className="space-y-3">
                {c.rounds.map((round: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-slate-300">{round}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-emerald-400">
                Key Focus Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                {c.focusAreas.map((area: string) => (
                  <span
                    key={area}
                    className="bg-slate-800 text-white border border-slate-700 px-4 py-2 rounded-lg text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            {c.roadmap.map((phase: any, i: number) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{phase.phase}</h3>
                    <span className="text-emerald-400 text-sm">
                      {phase.duration}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task: string, j: number) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <span className="text-emerald-400 mt-0.5 shrink-0">
                        ✓
                      </span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-8">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              Pro Tips for {c.name}
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {c.tips}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Daily Practice',
                  desc: 'Spend 2-3 hours coding daily. Quality > quantity.',
                },
                {
                  title: 'Mock Interviews',
                  desc: 'Do 5+ mock interviews before the real one.',
                },
                {
                  title: 'Review Solutions',
                  desc: 'After solving, always read optimal solutions.',
                },
                {
                  title: 'Build Projects',
                  desc: 'Deploy 2-3 relevant projects before applying.',
                },
              ].map((tip, i) => (
                <div key={i} className="bg-slate-800 rounded-lg p-4">
                  <p className="text-white font-medium text-sm mb-1">
                    {tip.title}
                  </p>
                  <p className="text-slate-400 text-xs">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
