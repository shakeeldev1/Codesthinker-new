import React, { useState, useRef } from 'react';
import Button from '../common/Button';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

const GetOurServicesForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Software Development',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // STYLING UPDATES:
  // Using slate/gray shades to match the AboutUs section
  const inputBase = "w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F69A20]/50 focus:border-[#F69A20] transition-all duration-300";
  const labelBase = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1";
  const textareaBase = `${inputBase} min-h-[120px] resize-none`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setSubmitStatus('success');
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-gray-200">
      
      {/* Success/Error Alerts */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium border border-emerald-200">
          ✅ Request submitted! Our team will contact you shortly.
        </div>
      )}

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#F69A20]"></span>
          <span className="text-[10px] font-bold text-[#F69A20] uppercase tracking-wider">Service Inquiry</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Get Our Services</h2>
        <p className="text-gray-500 text-sm mt-2">Let us know how we can help your business grow.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className={labelBase}>Full Name *</label>
          <input className={inputBase} placeholder="Alex Johnson" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        </div>

        <div>
          <label className={labelBase}>Email Address *</label>
          <input className={inputBase} placeholder="you@company.com" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelBase}>Phone Number *</label>
            <input className={inputBase} placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <label className={labelBase}>Company *</label>
            <input className={inputBase} placeholder="Your Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </div>
        </div>

        <div>
          <label className={labelBase}>Service Interested In *</label>
          <select className={`${inputBase} cursor-pointer`} value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
            <option value="">Select a service</option>
            <option value="Software Development">Software Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="AI/ML & Gaming">AI/ML & Gaming</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Remote IT Resources">Remote IT Resources</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelBase}>Budget Range</label>
            <select className={`${inputBase} cursor-pointer`} value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
              <option value="">Select budget range</option>
              <option value="Under $5,000">Under $5,000</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000</option>
              <option value="$15,000 - $50,000">$15,000 - $50,000</option>
              <option value="$50,000 - $150,000">$50,000 - $150,000</option>
              <option value="$150,000+">$150,000+</option>
            </select>
          </div>
          <div>
            <label className={labelBase}>Timeline</label>
            <select className={`${inputBase} cursor-pointer`} value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
              <option value="">Select timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="1-2 weeks">1-2 weeks</option>
              <option value="3-4 weeks">3-4 weeks</option>
              <option value="1-2 months">1-2 months</option>
              <option value="3+ months">3+ months</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelBase}>Project Details *</label>
          <textarea className={textareaBase} placeholder="Briefly describe your project requirements, goals, and any specific features you need..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
        </div>

        <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors">
          Submit Request →
        </button>
      </form>
    </div>
  );
};

export default GetOurServicesForm;