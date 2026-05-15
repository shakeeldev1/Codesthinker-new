import React, { useState, useEffect, useMemo } from 'react';
import JobApplyModal from './JobApplyModal';
import Button from '../common/Button';

// --- Modern Job Board List with Filters and Enhanced UI ---

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  department: string;
  postedDate: string;
  featured: boolean;
  icon: string;
}

const JobBoardList: React.FC = () => {
  const jobs: Job[] = [
    { 
      id: 1,
      title: 'Senior Frontend Developer', 
      location: 'Remote', 
      type: 'Full Time', 
      salary: '$100k - $140k',
      tags: ['React', 'TypeScript', 'Tailwind'],
      department: 'Engineering',
      postedDate: '2 days ago',
      featured: true,
      icon: '🚀'
    },
    { 
      id: 2,
      title: 'Backend Engineer', 
      location: 'Remote', 
      type: 'Full Time', 
      salary: '$90k - $130k',
      tags: ['Node.js', 'PostgreSQL', 'AWS'],
      department: 'Engineering',
      postedDate: '3 days ago',
      featured: false,
      icon: '⚙️'
    },
    { 
      id: 3,
      title: 'Product Designer', 
      location: 'Hybrid', 
      type: 'Full Time', 
      salary: '$85k - $115k',
      tags: ['Figma', 'UI/UX', 'Prototyping'],
      department: 'Design',
      postedDate: '1 week ago',
      featured: true,
      icon: '🎨'
    },
    { 
      id: 4,
      title: 'DevOps Engineer', 
      location: 'Remote', 
      type: 'Full Time', 
      salary: '$110k - $150k',
      tags: ['Kubernetes', 'Docker', 'Terraform'],
      department: 'Engineering',
      postedDate: '5 days ago',
      featured: false,
      icon: '☁️'
    },
    { 
      id: 5,
      title: 'Technical Writer', 
      location: 'Remote', 
      type: 'Contract', 
      salary: '$70k - $90k',
      tags: ['Documentation', 'API', 'Markdown'],
      department: 'Product',
      postedDate: '1 day ago',
      featured: false,
      icon: '📝'
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const jobTypes = ['All', 'Full Time', 'Contract', 'Remote'];
  const departments = ['All', 'Engineering', 'Design', 'Product'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === 'All' || job.type === selectedType;
      const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
      return matchesSearch && matchesType && matchesDepartment;
    });
  }, [searchTerm, selectedType, selectedDepartment, jobs]);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💼</span>
            <div>
              <div className="text-2xl font-bold">{filteredJobs.length}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Open Positions</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            <div>
              <div className="text-2xl font-bold">5+</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Departments</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Remote Friendly</div>
            </div>
          </div>
        </div>
        <div className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full">
          🔥 Updated weekly
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all backdrop-blur-sm"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Job Type Filters */}
          <div className="flex gap-2">
            {jobTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {/* Department Filters */}
          <div className="flex gap-2">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-white/40">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, idx) => (
            <div 
              key={job.id}
              onMouseEnter={() => setHoveredCard(job.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 flex flex-col overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s`, animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0 }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Featured badge */}
              {job.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg animate-pulse">
                    Featured
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="relative flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {job.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-white/40 mt-1">Posted {job.postedDate}</p>
                </div>
              </div>

              {/* Meta Info Grid */}
              <div className="relative grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6">
                <div className="flex items-center gap-2 text-white/60">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{job.type}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-amber-400 font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{job.salary}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all group-hover:bg-white/10 group-hover:border-amber-500/30 group-hover:text-amber-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="relative mt-auto space-y-2">
                <button
                  
                  onClick={() => handleApplyClick(job)}
                >
                <Button text="  Apply Now →" />
                </button>
                <button className="w-full text-xs text-white/40 hover:text-amber-400 transition-colors py-1">
                  View Full Description
                </button>
              </div>

              {/* Animated border on hover */}
              <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${hoveredCard === job.id ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Footer CTA */}
      <div className="relative group mt-12 p-8 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 overflow-hidden hover:border-amber-500/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400" 
              alt="Our team" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Don't see the perfect role?
            </h4>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Send us your CV anyway. We're always looking for talented people to join our talent pool.
            </p>
          </div>
          
          <button className="group/btn relative px-8 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Submit General Application</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <JobApplyModal 
          jobTitle={selectedJob.title} 
          open={modalOpen} 
          onClose={handleCloseModal} 
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default JobBoardList;