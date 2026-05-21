import React, { useState, useRef } from 'react';
import Button from '../common/Button';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  resume?: string;
}

const ApplyForJobForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    position: 'Software Engineer',
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... (validation and handlers remain same as original logic)

  // STYLING UPDATES:
  // Using slate/gray shades to match the AboutUs section
  const inputBase = "w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F69A20]/50 focus:border-[#F69A20] transition-all duration-300";
  const labelBase = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-gray-200">
      
      {/* Success/Error Alerts */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium border border-emerald-200">
          ✅ Application submitted! We'll contact you soon.
        </div>
      )}

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#F69A20]"></span>
          <span className="text-[10px] font-bold text-[#F69A20] uppercase tracking-wider">Career Opportunity</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Build Your Career</h2>
        <p className="text-gray-500 text-sm mt-2">Join our team and work on exciting projects.</p>
      </div>

      <form className="space-y-5" onSubmit={() => {}}>
        <div>
          <label className={labelBase}>Full Name *</label>
          <input className={inputBase} placeholder="Alex Johnson" />
        </div>

        <div>
          <label className={labelBase}>Email Address *</label>
          <input className={inputBase} placeholder="you@company.com" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelBase}>Phone Number *</label>
            <input className={inputBase} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className={labelBase}>Position *</label>
           <select className={`${inputBase} cursor-pointer`}>
  {/* Engineering/Dev Roles */}
  <option>Software Engineer</option>
  <option>Web Development</option>
  <option>App Development</option>
  <option>DevOps Engineer</option>
  
  {/* Design & Product Roles */}
  <option>Product Manager</option>
  <option>UX/UI Designer</option>
  <option>Graphic Design</option>
  
  {/* Data & Business Roles */}
  <option>Data Scientist</option>
  <option>Business Development</option>
  <option>Digital Marketing</option>
</select>
          </div>
        </div>

        {/* File Upload - Updated to match light theme */}
        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragActive ? 'border-[#F69A20] bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="text-3xl">📄</span>
          <p className="text-sm font-medium text-gray-700 mt-2">Upload your resume</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOCX (Max 5MB)</p>
        </div>

        <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors">
          Apply for Job →
        </button>
      </form>
    </div>
  );
};

export default ApplyForJobForm;