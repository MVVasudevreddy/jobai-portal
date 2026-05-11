import Link from 'next/link';

const companyData: Record<string, any> = {
  google: {
    name: 'Google',
    about:
      'Google LLC is an American multinational technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.',
    website: 'google.com',
    hq: 'Mountain View, California',
    size: '100,000+',
    jobs: [
      {
        id: '7',
        title: 'Software Developer',
        type: 'job',
        location: 'Hyderabad',
        ctc: '15-30 LPA',
        exp: '0-2 yrs',
        skills: ['C++', 'Python', 'Algorithms'],
        portal: 'LinkedIn',
      },
    ],
    internships: [
      {
        id: '6',
        title: 'AI/ML Intern',
        type: 'internship',
        location: 'Hyderabad',
        ctc: '₹80k/mo',
        exp: '0 yrs',
        skills: ['Python', 'TensorFlow', 'ML', 'NLP'],
        portal: 'LinkedIn',
      },
    ],
  },
  amazon: {
    name: 'Amazon',
    about:
      'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.',
    website: 'amazon.jobs',
    hq: 'Seattle, Washington',
    size: '1,500,000+',
    jobs: [
      {
        id: '8',
        title: 'Data Engineer',
        type: 'job',
        location: 'Bengaluru',
        ctc: '12-20 LPA',
        exp: '0-2 yrs',
        skills: ['SQL', 'Python', 'Spark', 'AWS'],
        portal: 'Indeed',
      },
    ],
    internships: [
      {
        id: '9',
        title: 'SDE Intern',
        type: 'internship',
        location: 'Bengaluru',
        ctc: '₹60k/mo',
        exp: '0 yrs',
        skills: ['DSA', 'Java', 'Python'],
        portal: 'LinkedIn',
      },
    ],
  },
  infosys: {
    name: 'Infosys',
    about:
      'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
    website: 'infosys.com',
    hq: 'Bengaluru, India',
    size: '300,000+',
    jobs: [
      {
        id: '11',
        title: 'Systems Engineer',
        type: 'job',
        location: 'Pune',
        ctc: '3-5 LPA',
        exp: '0-2 yrs',
        skills: ['Java', 'SQL', 'Spring'],
        portal: 'Naukri',
      },
    ],
    internships: [
      {
        id: '2',
        title: 'SDE Intern',
        type: 'internship',
        location: 'Bengaluru',
        ctc: '₹15k/mo',
        exp: '0 yrs',
        skills: ['Java', 'Spring', 'SQL'],
        portal: 'LinkedIn',
      },
    ],
  },
  tcs: {
    name: 'TCS',
    about:
      'Tata Consultancy Services is an Indian multinational IT services and consulting company.',
    website: 'tcs.com',
    hq: 'Mumbai, India',
    size: '600,000+',
    jobs: [
      {
        id: '1',
        title: 'Software Engineer',
        type: 'job',
        location: 'Chennai',
        ctc: '3-6 LPA',
        exp: '0-2 yrs',
        skills: ['Python', 'SQL', 'Java'],
        portal: 'Naukri',
      },
    ],
    internships: [],
  },
  wipro: {
    name: 'Wipro',
    about:
      'Wipro Limited is an Indian multinational corporation providing IT, consulting and business process services.',
    website: 'wipro.com',
    hq: 'Bengaluru, India',
    size: '250,000+',
    jobs: [
      {
        id: '3',
        title: 'Data Analyst',
        type: 'job',
        location: 'Hyderabad',
        ctc: '4-7 LPA',
        exp: '0-2 yrs',
        skills: ['SQL', 'Python', 'Excel'],
        portal: 'Indeed',
      },
    ],
    internships: [],
  },
  zoho: {
    name: 'Zoho',
    about:
      'Zoho Corporation is an Indian technology company that makes computer software and web-based business tools.',
    website: 'zoho.com',
    hq: 'Chennai, India',
    size: '15,000+',
    jobs: [
      {
        id: '4',
        title: 'ML Engineer',
        type: 'job',
        location: 'Chennai',
        ctc: '6-10 LPA',
        exp: '0-3 yrs',
        skills: ['Python', 'ML', 'TensorFlow'],
        portal: 'Naukri',
      },
    ],
    internships: [],
  },
  freshworks: {
    name: 'Freshworks',
    about:
      'Freshworks Inc. is an American cloud-based software company that provides SaaS customer engagement solutions.',
    website: 'freshworks.com',
    hq: 'San Mateo / Chennai',
    size: '6,000+',
    jobs: [],
    internships: [
      {
        id: '5',
        title: 'Backend Intern',
        type: 'internship',
        location: 'Chennai / Remote',
        ctc: '₹20k/mo',
        exp: '0 yrs',
        skills: ['Node.js', 'React', 'MongoDB'],
        portal: 'Unstop',
      },
    ],
  },
};

type Props = { params: { slug: string } };

export default function CompanyPage({ params }: Props) {
  const data = companyData[params.slug];

  if (!data)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Company not found</h1>
          <Link href="/jobs" className="text-emerald-400 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );

  const total = data.jobs.length + data.internships.length;

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back */}
        <Link
          href="/jobs"
          className="text-sm text-slate-400 hover:text-emerald-400"
        >
          ← Back to Jobs
        </Link>

        {/* Company Header */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-slate-400 text-sm mt-1">
                {data.hq} • {data.size} employees • {data.website}
              </p>
              <p className="text-slate-300 text-sm mt-3 max-w-2xl">
                {data.about}
              </p>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 text-2xl font-bold">
                {total}
              </span>
              <p className="text-xs text-slate-400">Open Roles</p>
            </div>
          </div>
        </div>

        {/* Apply Both Banner */}
        {data.jobs.length > 0 && data.internships.length > 0 && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-semibold text-emerald-400">
                  This company has both Jobs and Internships open!
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {data.jobs.length} job(s) + {data.internships.length}{' '}
                  internship(s) available. Apply to all in one click.
                </p>
              </div>
              <button className="rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2 text-sm transition-all">
                Apply to All ({total} roles)
              </button>
            </div>
          </div>
        )}

        {/* Jobs + Internships */}
        <div className="grid md:grid-cols-2 gap-6">
          <section>
            <h2 className="font-semibold mb-3 text-blue-400">
              Jobs ({data.jobs.length})
            </h2>
            <div className="space-y-3">
              {data.jobs.length === 0 && (
                <p className="text-xs text-slate-500">No jobs listed.</p>
              )}
              {data.jobs.map((job: any) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-4 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{job.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.location} • {job.ctc} • {job.exp}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.map((s: string) => (
                          <span
                            key={s}
                            className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        via {job.portal}
                      </p>
                    </div>
                    <button className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3 text-emerald-400">
              Internships ({data.internships.length})
            </h2>
            <div className="space-y-3">
              {data.internships.length === 0 && (
                <p className="text-xs text-slate-500">No internships listed.</p>
              )}
              {data.internships.map((job: any) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-4 hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{job.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.location} • {job.ctc} • {job.exp}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.map((s: string) => (
                          <span
                            key={s}
                            className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        via {job.portal}
                      </p>
                    </div>
                    <button className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
