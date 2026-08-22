import React from 'react';
import { LuTrophy, LuGraduationCap } from 'react-icons/lu';
import ApplyForInternshipForm from '../components/apply/ApplyForInternshipForm';
import InternshipHero from '../components/apply/InternshipHero';

const ApplyForInternship: React.FC = () => {
  return (
    // Switched to the same background as AboutUs
    <>
    <InternshipHero />
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Background Decor (Matches AboutUs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Form Section */}
          <div className="lg:col-span-7">
            <ApplyForInternshipForm />
          </div>

          {/* Right Column - Visual Content */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Hero Image Section (Matches AboutUs Style) */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" 
                alt="Collaborative team environment" 
                className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-80" />
              
              {/* Floating Badge (Matches AboutUs style) */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full h-3 w-3 bg-[#F69A20]"></span>
                  <span className="text-sm font-semibold text-gray-800">June 2026 Cohort</span>
                </div>
              </div>
            </div>

            {/* Bento Grid (Updated to match light theme aesthetic) */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Culture Video", desc: "See our office life" },
                { title: "Intern Stories", desc: "Success journeys" }
              ].map((item, idx) => (
                <div key={idx} className="group p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all cursor-pointer">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-col items-center gap-1">
                <LuTrophy className="text-[#F69A20]" size={20} />
                <span className="text-[10px] font-bold text-gray-700 uppercase">Top Rated</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <LuGraduationCap className="text-gray-900" size={20} />
                <span className="text-[10px] font-bold text-gray-700 uppercase">Hands-on Training</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <LuGraduationCap className="text-gray-900" size={20} />
                <span className="text-[10px] font-bold text-gray-700 uppercase">500+ Alumni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ApplyForInternship;