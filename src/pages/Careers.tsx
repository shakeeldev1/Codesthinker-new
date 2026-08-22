import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SectionBadge } from '../components/ui/SectionBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Gift, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Calendar 
} from 'lucide-react';
import { API_BASE_URL } from '../config';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryMin?: number;
  salaryMax?: number;
  salaryVisible: boolean;
  deadline?: string;
  isFeatured: boolean;
  createdAt: string;
}

const Careers: React.FC = () => {
  const navigate = useNavigate();
  const [postings, setPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/careers`);
      if (res.ok) {
        const result = await res.json();
        setPostings(result.data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const departments = ['all', ...Array.from(new Set(postings.map(p => p.department)))];
  const categories = ['all', 'full-time', 'part-time', 'remote', 'contract', 'internship'];

  const filteredJobs = postings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || job.department === selectedDept;
    const matchesCat = selectedCat === 'all' || job.category === selectedCat;
    return matchesSearch && matchesDept && matchesCat;
  });

  const toggleExpandJob = (id: string) => {
    setExpandedJobId(prev => (prev === id ? null : id));
  };

  const handleApply = (id: string) => {
    navigate(`/apply/job?postingId=${id}`);
  };

  return (
    <div className="bg-[#FAFAFB] text-gray-800 min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF8] via-white to-[#FAFAFB] overflow-hidden">
        {/* Subtle decorative glow overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F49B21]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        {/* Vector Grid Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <style>{`
          @keyframes float-up-down {
            0%, 100% { transform: translateY(0px) rotate(var(--rotate-val, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--rotate-val, 0deg)); }
          }
          .animate-float-custom-1 {
            --rotate-val: 2deg;
            animation: float-up-down 5s ease-in-out infinite;
          }
          .animate-float-custom-2 {
            --rotate-val: -3deg;
            animation: float-up-down 6.5s ease-in-out infinite;
          }
        `}</style>

        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          <div className="lg:col-span-7 space-y-6 text-left" data-aos="fade-right">
            
            <div className="inline-flex items-center gap-2 bg-orange-50/80 border border-orange-200/55 rounded-full px-3.5 py-1.5 text-xs text-[#F49B21] font-bold shadow-sm shadow-orange-100/50">
              <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              We're Hiring!
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
              Shape the Future of Technology with <span className="text-[#F49B21] drop-shadow-sm">Code's Thinker</span>
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Join a team of creators, designers, and systems architects building premium digital software. We empower businesses globally with next-generation engineering.
            </p>

            <div className="relative max-w-lg flex items-center bg-white border border-gray-250 rounded-2xl p-1.5 shadow-md shadow-gray-200/30 focus-within:border-[#F49B21] focus-within:ring-2 focus-within:ring-[#F49B21]/15 transition-all">
              <span className="text-gray-400 pl-3">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                placeholder="Search position title, location, department..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <a 
                href="#openings" 
                className="bg-[#F49B21] hover:bg-[#e08914] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                View Roles
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-[11px] sm:text-xs font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold bg-white border border-gray-150 rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">5+</span>
                Open Roles
              </div>
              <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold bg-white border border-gray-150 rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">100%</span>
                Remote Friendly
              </div>
              <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold bg-white border border-gray-150 rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">14d</span>
                Avg. Feedback
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 hidden lg:block relative" data-aos="fade-left">
            <div className="relative w-full h-[400px] flex items-center justify-center">
              
              <div className="absolute w-72 h-72 rounded-full border border-gray-200/50 bg-white/10 backdrop-blur-[2px] animate-pulse pointer-events-none"></div>

              <div className="w-64 bg-white border border-gray-150 rounded-3xl p-6 shadow-2xl relative z-10 transition-all hover:scale-[1.02] duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F49B21] font-bold text-sm">
                    C
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Why Code's Thinker?</h4>
                    <span className="text-[9px] text-[#F49B21] font-bold uppercase tracking-wider">Join us</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                  We build high performance distributed teams. Join us to build, scale, and push software boundaries.
                </p>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-[#F49B21] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 font-semibold">
                    <span>Active Team Growth</span>
                    <span className="text-gray-800">80%</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -left-4 bg-white/95 backdrop-blur-sm border border-gray-150 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 animate-float-custom-1 pointer-events-none select-none">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-[#F49B21] shrink-0 border border-orange-100">
                  <Briefcase size={16} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">Software Engineer</h5>
                  <span className="text-[9px] text-gray-450 font-semibold flex items-center gap-0.5 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-gray-400" /> Remote
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 -right-4 bg-white/95 backdrop-blur-sm border border-gray-150 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 animate-float-custom-2 pointer-events-none select-none">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">UI/UX Designer</h5>
                  <span className="text-[9px] text-gray-455 font-semibold flex items-center gap-0.5 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-gray-400" /> Full-Time
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-200/60 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#F49B21] font-bold text-xs uppercase tracking-wider block">Life at Code's Thinker</span>
            <h2 className="text-3xl font-bold text-gray-900">Why Join Our Team?</h2>
            <p className="text-gray-500 text-sm sm:text-base">We prioritize developer happiness, learning, and operational excellence to help everyone perform at their absolute best.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="text-orange-500" size={24} />,
                title: "Flexible & Remote",
                desc: "Work on-site or from home. We care about outcomes, not micro-managing schedules."
              },
              {
                icon: <Users className="text-blue-500" size={24} />,
                title: "Learning Budgets",
                desc: "Annual stipends for courses, tech books, conferences, and career growth tracks."
              },
              {
                icon: <Gift className="text-purple-500" size={24} />,
                title: "Premium Benefits",
                desc: "Top health insurance cover, annual bonuses, gym allowances, and team retreats."
              },
              {
                icon: <TrendingUp className="text-emerald-500" size={24} />,
                title: "Cutting-Edge Tech",
                desc: "Work with modern tech stacks, AI automation pipelines, and high performance setups."
              }
            ].map((benefit, idx) => (
              <div 
                key={idx} 
                data-aos="fade-up" 
                data-aos-delay={idx * 100}
                className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl hover:border-[#F49B21]/30 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform mb-5 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. JOB BOARD SECTION */}
      <section id="openings" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">Active Job Openings</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5">Filter by department or browse open postings below.</p>
          </div>

          <div className="relative w-full md:max-w-xs shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#F49B21] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-bold mr-2 uppercase tracking-wider">Department:</span>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                  selectedDept === dept
                    ? 'bg-[#F49B21] text-white border-[#F49B21]'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          
          <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-bold mr-2 uppercase tracking-wider">Type:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                  selectedCat === cat
                    ? 'bg-[#F49B21] text-white border-[#F49B21]'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#F49B21]/20 border-t-[#F49B21] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading job postings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 rounded-3xl text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <Briefcase className="w-12 h-12 text-gray-350 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">No postings matching filters</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              We couldn't find any listings matching your search or filters. Try adjusting your preferences, or send us a speculative inquiry via the Contact page.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map(job => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div 
                  key={job.id} 
                  className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md ${
                    isExpanded ? 'border-[#F49B21]/50 bg-white ring-1 ring-[#F49B21]/20' : 'border-gray-200/80 hover:border-gray-350'
                  }`}
                >
                  {/* Card Header Summary */}
                  <div 
                    onClick={() => toggleExpandJob(job.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer select-none"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center flex-wrap gap-2.5">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#F49B21] transition-colors">
                          {job.title}
                        </h3>
                        {job.isFeatured && (
                          <span className="bg-orange-50 text-orange-600 border border-orange-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
                          <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="capitalize">{job.category.replace('-', ' ')}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {job.location}
                        </span>
                        {job.salaryVisible && (job.salaryMin || job.salaryMax) && (
                          <span className="flex items-center gap-0.5 bg-green-50 border border-green-100 text-green-600 px-2.5 py-1 rounded-lg font-bold">
                            <DollarSign className="w-3.5 h-3.5" />
                            {job.salaryMin ? job.salaryMin.toLocaleString() : '—'} - {job.salaryMax ? job.salaryMax.toLocaleString() : '—'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <span className="text-[10px] text-gray-400 font-medium md:block hidden">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <button 
                        className={`p-2.5 rounded-xl border transition-all ${
                          isExpanded 
                            ? 'bg-[#F49B21]/10 border-[#F49B21]/20 text-[#F49B21]' 
                            : 'bg-gray-50 border-gray-200 text-gray-450 hover:text-gray-800'
                        }`}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Expanded details without animation */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/30">
                      <div className="p-6 sm:p-8 space-y-8 text-sm">
                        
                        {/* Role Overview */}
                        <div className="space-y-2">
                          <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">Role Description</h4>
                          <p className="text-gray-650 leading-relaxed max-w-4xl whitespace-pre-wrap">{job.description}</p>
                        </div>

                        {/* Requirements & Responsibilities & Benefits details grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          
                          {/* Left: Requirements */}
                          {job.requirements.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">Key Requirements</h4>
                              <ul className="space-y-2 text-gray-650">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F49B21] mt-2 shrink-0"></span>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Right: Responsibilities */}
                          {job.responsibilities.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">Your Responsibilities</h4>
                              <ul className="space-y-2 text-gray-650">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Benefits & CTA Bottom row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-gray-150 bg-gray-50 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8">
                          {/* Benefits summary list */}
                          <div>
                            {job.benefits.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-405 font-semibold">Position Perks</h4>
                                <div className="flex flex-wrap gap-2 max-w-xl">
                                  {job.benefits.map((benefit, idx) => (
                                    <span key={idx} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg">
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4 w-full sm:w-auto shrink-0 justify-end">
                            {job.deadline && (
                              <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                Apply by: {new Date(job.deadline).toLocaleDateString()}
                              </span>
                            )}
                            <button
                              onClick={() => handleApply(job.id)}
                              className="bg-[#F49B21] hover:bg-[#e08914] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-orange-500/10 active:scale-[0.98] transition-all flex items-center gap-1.5 text-xs select-none"
                            >
                              Apply For Role
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};

export default Careers;