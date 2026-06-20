'use client';
import { useState } from 'react';
import Link from 'next/link';

const resumeData: Record<string, any> = {
  'aiml-fresher': {
    id: 'aiml-fresher',
    label: 'AI/ML Fresher',
    seniority: 'Fresher',
    track: 'AI / ML',
    atsScore: 88,
    lastUpdated: '2026-06-20',
    color: 'emerald',
    data: {
      name: 'MULAMREDDY VENKATA VASU DEVA REDDY',
      title: 'B.Tech in Computer Science and Engineering',
      email: 'vasudevreddy7832@gmail.com',
      phone: '+91 8885572221',
      location: 'Hyderabad, Telangana',
      linkedin: 'linkedin.com/in/venkata-vasu-deva-reddy-mulamreddy-6666vdr',
      github: 'github.com/MVVasudevreddy',
      summary: 'Motivated B.Tech Computer Science graduate with internship and project experience in Machine Learning, Deep Learning, NLP, Computer Vision, and Python backend development. Built end-to-end ML pipelines for time-series forecasting, Speech-to-SQL, and medical imaging using Python, TensorFlow, Scikit-learn, FastAPI, PostgreSQL, and OpenCV. Seeking entry-level roles as AI/ML Engineer or Data Scientist.',
      skills: {
        'Programming': ['Python', 'SQL'],
        'Deep Learning': ['TensorFlow', 'Keras', 'YOLOv7', 'CapsNet', 'CNNs', 'Neural Networks'],
        'Computer Vision': ['OpenCV', 'Image Preprocessing', 'Augmentation', 'Object Detection', 'Medical Image Analysis'],
        'Databases': ['PostgreSQL', 'MySQL', 'SQL Queries', 'Stored Procedures', 'Schema Design', 'ETL'],
        'Machine Learning': ['Supervised Learning', 'Classification', 'Regression', 'Time-Series', 'Model Training', 'Cross-Validation', 'Hyperparameter Tuning'],
        'NLP & GenAI': ['NLP Pipelines', 'LLMs', 'Generative AI', 'Speech Recognition', 'Intent Classification'],
        'Backend APIs': ['FastAPI', 'Flask', 'REST APIs', 'Routing', 'Middleware'],
        'Data Science': ['Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Feature Engineering']
      },
      experience: [
        {
          title: 'Machine Learning Intern',
          company: 'VCodEZ',
          location: 'Shollinganallur, Tamil Nadu',
          duration: 'November 2025 - February 2026',
          points: [
            'Assisted in building end-to-end ML models for NLP-based SQL generation and time-series forecasting',
            'Performed data preprocessing and cleaning on financial datasets using Pandas',
            'Trained and evaluated regression models (Linear, Ridge, Lasso) using Scikit-learn',
            'Developed FastAPI backend with REST endpoints integrating NLP preprocessing and PostgreSQL',
            'Designed database schemas and wrote SQL queries, stored procedures in PostgreSQL',
            'Built ETL processes for data loading and conducted EDA with visualizations'
          ]
        }
      ],
      projects: [
        {
          title: 'Brain Tumor Identification from MRI Images',
          tech: 'YOLOv7, Keras, OpenCV, TensorFlow, Python',
          points: [
            'Developed deep learning-based tumor detection system using YOLOv7 and PyTorch',
            'Performed MRI image preprocessing and data augmentation using OpenCV',
            'Trained and fine-tuned object detection model for accurate tumor localization',
            'Achieved 92% detection accuracy on 2,500 MRI images',
            'Reduced tumor detection time from 5-7 minutes to under 2 seconds'
          ],
          link: 'github.com/MVVasudevreddy/Braintumouridentification'
        },
        {
          title: 'VoiceQuery AI - Speech-to-SQL System',
          tech: 'Python, NLP, LLM, FastAPI, PostgreSQL',
          points: [
            'Built end-to-end Speech-to-SQL system using NLP and Generative AI/LLMs',
            'Developed scalable FastAPI backend with modular routing and middleware',
            'Implemented full NLP pipeline: speech recognition, tokenization, intent classification, SQL generation',
            'Designed normalized PostgreSQL schema with stored procedures'
          ],
          link: 'github.com/MVVasudevreddy/Voice-Query-ai'
        },
        {
          title: 'Financial Market Prediction - Time-Series',
          tech: 'Python, Scikit-learn, Pandas, NumPy, Matplotlib',
          points: [
            'Applied regression algorithms to analyze financial time-series data',
            'Performed lag-based feature engineering for supervised learning format',
            'Evaluated model performance using MAE, RMSE, and R² metrics',
            'Visualized actual vs predicted trends using Matplotlib'
          ],
          link: 'github.com/MVVasudevreddy/Machine-learning'
        },
        {
          title: 'Diabetic Retinopathy Detection',
          tech: 'CapsNet, Keras, TensorFlow, Grad-CAM, OpenCV',
          points: [
            'Designed and trained Capsule Network for multi-class severity grading',
            'Integrated Explainable AI (Grad-CAM) for interpretable predictions',
            'Built complete CV pipeline: CLAHE, normalization, data augmentation',
            'Achieved strong multi-class performance with precision, recall, F1-score'
          ],
          link: 'github.com/MVVasudevreddy/Diabetic-Retinopathy-CapsNet-XAI'
        }
      ],
      education: [
        {
          degree: 'B.Tech, Computer Science and Engineering',
          institution: 'Bharath Institute of Higher Education and Research',
          location: 'Chennai, India',
          duration: '2022 - 2026',
          cgpa: '7.5/10'
        }
      ],
      achievements: [
        'NCC Cadet B & C Certificates - Demonstrated discipline, teamwork, and leadership',
        'Developed research-grade medical AI project applying Explainable AI (XAI)'
      ]
    }
  },
  'sql-python-fresher': {
    id: 'sql-python-fresher',
    label: 'SQL + Python Fresher',
    seniority: 'Fresher',
    track: 'SQL / Python / Backend',
    atsScore: 85,
    lastUpdated: '2026-06-19',
    color: 'blue',
    data: {
      name: 'MULAMREDDY VENKATA VASU DEVA REDDY',
      title: 'B.Tech in Computer Science and Engineering',
      email: 'vasudevreddy7832@gmail.com',
      phone: '+91 8885572221',
      location: 'Hyderabad, Telangana',
      linkedin: 'linkedin.com/in/venkata-vasu-deva-reddy-mulamreddy-6666vdr',
      github: 'github.com/MVVasudevreddy',
      summary: 'B.Tech Computer Science graduate with strong expertise in SQL, Python backend development, and database management. Built production-ready FastAPI backends with PostgreSQL integration, ETL pipelines, and optimized query performance. Seeking backend developer or data engineer roles.',
      skills: {
        'Programming': ['Python', 'SQL'],
        'Databases': ['PostgreSQL', 'MySQL', 'SQL Queries', 'Stored Procedures', 'Schema Design', 'Normalization', 'Indexing', 'Query Optimization', 'ETL'],
        'Backend': ['FastAPI', 'Flask', 'REST APIs', 'Routing', 'Middleware', 'Error Handling', 'Connection Pooling'],
        'Data Processing': ['Pandas', 'NumPy', 'Data Cleaning', 'EDA', 'Feature Engineering'],
        'Tools': ['Git', 'Docker', 'Postman', 'pgAdmin']
      },
      experience: [
        {
          title: 'Backend Development Intern',
          company: 'VCodEZ',
          location: 'Shollinganallur, Tamil Nadu',
          duration: 'November 2025 - February 2026',
          points: [
            'Developed FastAPI backend with REST endpoints and PostgreSQL integration',
            'Designed normalized database schemas with proper indexing and constraints',
            'Wrote complex SQL queries, stored procedures, and triggers',
            'Built ETL pipelines for data extraction, transformation, and loading',
            'Optimized query performance reducing response time by 40%',
            'Implemented connection pooling and error handling middleware'
          ]
        }
      ],
      projects: [
        {
          title: 'VoiceQuery AI - Speech-to-SQL Backend',
          tech: 'Python, FastAPI, PostgreSQL, NLP',
          points: [
            'Built scalable FastAPI backend with modular architecture',
            'Designed normalized PostgreSQL schema with referential integrity',
            'Implemented parameterized queries to prevent SQL injection',
            'Created stored procedures for complex business logic',
            'Built connection pooling for efficient database access'
          ],
          link: 'github.com/MVVasudevreddy/Voice-Query-ai'
        },
        {
          title: 'Financial Data ETL Pipeline',
          tech: 'Python, Pandas, PostgreSQL, SQL',
          points: [
            'Built ETL pipeline processing 50K+ financial records',
            'Performed data cleaning, validation, and transformation',
            'Loaded processed data into PostgreSQL with proper indexing',
            'Created views and materialized views for reporting',
            'Optimized queries reducing execution time by 60%'
          ],
          link: 'github.com/MVVasudevreddy/Machine-learning'
        }
      ],
      education: [
        {
          degree: 'B.Tech, Computer Science and Engineering',
          institution: 'Bharath Institute of Higher Education and Research',
          location: 'Chennai, India',
          duration: '2022 - 2026',
          cgpa: '7.5/10'
        }
      ],
      achievements: [
        'Built production-ready backend systems with 99.9% uptime',
        'NCC Cadet B & C Certificates'
      ]
    }
  }
};

export default function ResumeDetailPage({ params }: { params: { id: string } }) {
  const resume = resumeData[params.id] || resumeData['aiml-fresher'];
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [editData, setEditData] = useState(resume.data);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/resumes"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              ← Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{resume.label}</h1>
              <p className="text-slate-400 text-sm">
                {resume.seniority} • {resume.track}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-400">{resume.atsScore}</div>
              <p className="text-xs text-slate-400">ATS Score</p>
            </div>
            <button
              onClick={() => window.print()}
              className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 text-sm transition-all"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-800 flex gap-6">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'preview'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📄 Preview
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'edit'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ✏️ Edit
          </button>
        </div>

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="rounded-xl border border-slate-800 bg-white text-slate-900 p-12">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
              <h1 className="text-3xl font-bold uppercase tracking-wide">{editData.name}</h1>
              <p className="text-slate-700 mt-1">{editData.title}</p>
              <div className="flex justify-center gap-4 mt-3 text-xs text-slate-600">
                <span>{editData.email}</span>
                <span>•</span>
                <span>{editData.phone}</span>
                <span>•</span>
                <span>{editData.location}</span>
              </div>
              <div className="flex justify-center gap-4 mt-2 text-xs text-slate-600">
                <span>{editData.linkedin}</span>
                <span>•</span>
                <span>{editData.github}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Summary</h2>
              <p className="text-sm leading-relaxed text-slate-700">{editData.summary}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Skills</h2>
              <div className="space-y-2">
                {Object.entries(editData.skills).map(([category, skills]: [string, any]) => (
                  <div key={category} className="text-sm">
                    <span className="font-semibold">{category}:</span>{' '}
                    <span className="text-slate-700">{skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            {editData.experience && editData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Experience</h2>
                {editData.experience.map((exp: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{exp.title}</h3>
                        <p className="text-sm text-slate-700">{exp.company} • {exp.location}</p>
                      </div>
                      <span className="text-xs text-slate-600">{exp.duration}</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {exp.points.map((point: string, pidx: number) => (
                        <li key={pidx} className="flex gap-2">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {editData.projects && editData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Projects</h2>
                {editData.projects.map((proj: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{proj.title}</h3>
                        <p className="text-xs text-slate-600">{proj.tech}</p>
                      </div>
                      {proj.link && (
                        <span className="text-xs text-slate-600">{proj.link}</span>
                      )}
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {proj.points.map((point: string, pidx: number) => (
                        <li key={pidx} className="flex gap-2">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {editData.education && editData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Education</h2>
                {editData.education.map((edu: any, idx: number) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{edu.degree}</h3>
                        <p className="text-sm text-slate-700">{edu.institution} • {edu.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-600">{edu.duration}</p>
                        <p className="text-xs text-slate-600">{edu.cgpa}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {editData.achievements && editData.achievements.length > 0 && (
              <div>
                <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-3">Key Achievements</h2>
                <ul className="space-y-1 text-sm text-slate-700">
                  {editData.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span>•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Summary</label>
                <textarea
                  value={editData.summary}
                  onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2 text-sm transition-all"
                >
                  Save & Preview
                </button>
                <button
                  onClick={() => setEditData(resume.data)}
                  className="rounded-md bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2 text-sm transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ATS Tips */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-semibold mb-3">💡 ATS Optimization Tips</h2>
          <div className="grid md:grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Use keywords from job description</span>
            </div>
            <div className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Quantify achievements with numbers</span>
            </div>
            <div className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Single-column layout for ATS parsing</span>
            </div>
            <div className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Standard section headers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
