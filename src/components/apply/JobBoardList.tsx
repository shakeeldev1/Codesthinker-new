import React, { useState } from 'react';
import JobApplyModal from './JobApplyModal';

const JobBoardList: React.FC = () => {
  const jobs = [
    { 
      title: 'Senior Frontend Developer', 
      location: 'Remote', 
      type: 'Full Time', 
      salary: '$100k - $140k',
      tags: ['React', 'TypeScript', 'Tailwind']
    },
    { 
      title: 'Backend Engineer', 
      location: 'Remote', 
      type: 'Full Time', 
      salary: '$90k - $130k',
      tags: ['Node.js', 'PostgreSQL', 'AWS']
    },
    { 
      title: 'Product Designer', 
      location: 'Hybrid', 
      type: 'Full Time', 
      salary: '$85k - $115k',
      tags: ['Figma', 'UI/UX', 'Prototyping']
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-amber-500 mb-2">Open Positions</h2>
          <p className="text-gray-400 text-sm">Join our growing team of innovators</p>
        </div>
        <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-4 md:mt-0">
          {jobs.length} positions available
        </span>
      </div>

      {/* Job Cards */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <li 
            key={idx} 
            className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-7 transition-all duration-300 hover:bg-white/10 hover:border-amber-500/50 hover:shadow-[0_0_60px_rgba(245,158,11,0.15)] hover:-translate-y-1 flex flex-col"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

            {/* Header: Title + Badge */}
            <div className="relative flex items-start justify-between mb-5">
              <h3 className="text-xl font-bold text-white leading-tight pr-2 group-hover:text-amber-300 transition-colors">
                {job.title}
              </h3>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/20 text-amber-400 font-black uppercase tracking-tighter border border-amber-500/30 flex-shrink-0">
                New
              </span>
            </div>

            {/* Meta: Location / Type / Salary */}
            <div className="relative grid grid-cols-2 gap-y-2 gap-x-3 text-sm mb-6">
              <div className="flex items-center gap-1.5 text-gray-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.type}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 text-amber-500/90 font-bold">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.salary}</span>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="relative flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 transition-colors group-hover:bg-white/10 group-hover:border-amber-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="relative mt-auto space-y-2.5">
              <button
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-[#07051D] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all"
                onClick={() => handleApplyClick(job.title)}
              >
                Apply Now
              </button>
              <button className="w-full text-xs text-amber-500/80 hover:text-amber-400 transition-colors py-1">
                View Details →
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer CTA */}
      <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center gap-8 hover:border-amber-500/30 transition-colors">
        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400" 
            alt="Our team" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2 text-white">Not finding the right fit?</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Send us your CV anyway and we'll keep you in mind for future roles that match your profile.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors whitespace-nowrap">
          Submit General Application
        </button>
      </div>

      {/* Job Application Modal */}
      <JobApplyModal jobTitle={selectedJob || ''} open={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default JobBoardList;