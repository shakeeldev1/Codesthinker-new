import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LuTrophy, LuStar, LuGraduationCap } from 'react-icons/lu';
import { Briefcase, MapPin, Clock, DollarSign, ArrowLeft, Calendar } from 'lucide-react';
import ApplyForJobForm from '../components/apply/ApplyForJobForm';
import JobHero from '../components/apply/JobHero';
import { API_BASE_URL } from '../config';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string;
  description: string;
  requirements: string[];
  salaryMin?: number;
  salaryMax?: number;
  salaryVisible: boolean;
  deadline?: string;
}

const ApplyForJob: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postingId = searchParams.get('postingId');
  
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (postingId) {
      fetchJobDetails(postingId);
    }
  }, [postingId]);

  const fetchJobDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/careers/${id}`);
      if (res.ok) {
        const result = await res.json();
        setJobPosting(result.data);
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <JobHero />
      <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Background Decor (Matches AboutUs) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back button to Careers */}
          <div className="mb-8">
            <Link 
              to="/careers" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Job Openings
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Form Section */}
            <div className="lg:col-span-7">
              {isLoading ? (
                <div className="bg-white p-12 rounded-3xl shadow-sm ring-1 ring-gray-200 text-center">
                  <div className="w-8 h-8 border-4 border-[#F69A20]/30 border-t-[#F69A20] rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-500">Loading job details...</p>
                </div>
              ) : (
                <ApplyForJobForm 
                  jobPostingId={postingId || undefined} 
                  jobTitle={jobPosting?.title || undefined} 
                />
              )}
            </div>

            {/* Right Column - Visual Content or Job Details */}
            <div className="lg:col-span-5 space-y-8">
              
              {jobPosting ? (
                /* Specific Job Description Card */
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm ring-1 ring-gray-200 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-50 border border-orange-100 text-[#F69A20] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {jobPosting.department}
                      </span>
                      <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {jobPosting.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {jobPosting.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {jobPosting.location}</span>
                      {jobPosting.deadline && (
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" /> Apply by {new Date(jobPosting.deadline).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-gray-100"></div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Role Summary</h4>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{jobPosting.description}</p>
                  </div>

                  {jobPosting.requirements && jobPosting.requirements.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Role Requirements</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {jobPosting.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F69A20] mt-2 shrink-0"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Generic Sidebar Visual Content (Default) */
                <>
                  {/* Hero Image Section (Matches AboutUs Style) */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group">
                    <img 
                      src="https://images.pexels.com/photos/5439148/pexels-photo-5439148.jpeg" 
                      alt="Collaborative team environment" 
                      className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Badge (Matches AboutUs style) */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl ring-1 ring-black/5">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69A20] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F69A20]"></span>
                        </span>
                        <span className="text-sm font-semibold text-gray-800">Current Openings</span>
                      </div>
                    </div>
                  </div>

                  {/* Bento Grid (Updated to match light theme aesthetic) */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Culture Video", desc: "See our office life" },
                      { title: "Employee Stories", desc: "Success journeys" }
                    ].map((item, idx) => (
                      <div key={idx} className="group p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all cursor-pointer">
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Trust indicators (Refined to match AboutUs branding) */}
                  <div className="flex items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
                    <div className="flex flex-col items-center gap-1">
                      <LuTrophy className="text-[#F69A20]" size={20} />
                      <span className="text-[10px] font-bold text-gray-700 uppercase">Top Rated</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <LuStar className="text-[#F69A20]" size={20} />
                      <span className="text-[10px] font-bold text-gray-700 uppercase">4.9/5 Rating</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <LuGraduationCap className="text-gray-900" size={20} />
                      <span className="text-[10px] font-bold text-gray-700 uppercase">500+ Alumni</span>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplyForJob;