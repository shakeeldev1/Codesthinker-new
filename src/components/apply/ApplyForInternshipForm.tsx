import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';

// --- Modern Form Component with enhanced UX and animations ---

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

const ApplyForInternshipForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    position: 'Frontend Developer',
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.position) newErrors.position = 'Please select a position';
    if (!formData.resume) newErrors.resume = 'Please upload your resume';
    else if (formData.resume.size > 5 * 1024 * 1024) newErrors.resume = 'File must be less than 5MB';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
    if (errors.resume) setErrors(prev => ({ ...prev, resume: undefined }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData(prev => ({ ...prev, resume: file }));
      if (errors.resume) setErrors(prev => ({ ...prev, resume: undefined }));
    } else {
      setErrors(prev => ({ ...prev, resume: 'Please upload a PDF, DOCX, or DOC file' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: 'Frontend Developer',
        resume: null,
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = "w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-base";
  const labelBase = "block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 ml-1 transition-all duration-200";

  return (
    <div className="relative">
      <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-500">

        {submitStatus === 'success' && (
          <div className="absolute top-4 right-4 left-4 md:left-auto z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3.5 rounded-xl text-sm font-medium shadow-xl animate-slide-down">
            ✅ Application submitted! We'll contact you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="absolute top-4 right-4 left-4 md:left-auto z-20 bg-gradient-to-r from-red-500 to-rose-500 text-white px-5 py-3.5 rounded-xl text-sm font-medium shadow-xl animate-slide-down">
            ❌ Submission failed. Please try again.
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <form className="p-8 md:p-10 flex-1 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Summer 2024 Program</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Shape Your{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Future
                </span>
              </h2>
              <p className="text-white/40 text-sm mt-2">Join our internship program and kickstart your career</p>
            </div>

            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'fullName' ? 'text-amber-400 translate-x-1' : ''}`}>
                Full Name *
              </label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Alex Johnson"
                className={`${inputBase} ${errors.fullName ? 'border-red-500/50 focus:ring-red-500/40' : 'border-white/10'}`}
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1.5 ml-2">⚠️ {errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'email' ? 'text-amber-400 translate-x-1' : ''}`}>
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@company.com"
                className={`${inputBase} ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1.5 ml-2">⚠️ {errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className={`${labelBase} ${focusedField === 'phone' ? 'text-amber-400 translate-x-1' : ''}`}>
                  Phone Number *
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+1 (555) 000-0000"
                  className={`${inputBase} ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5 ml-2">⚠️ {errors.phone}</p>}
              </div>
              <div className="space-y-1">
                <label className={`${labelBase} ${focusedField === 'position' ? 'text-amber-400 translate-x-1' : ''}`}>
                  Desired Position *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('position')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} cursor-pointer appearance-none`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f59e0b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                >
                  <option className="bg-[#0a0835]">🚀 Frontend Developer</option>
                  <option className="bg-[#0a0835]">⚙️ Backend Developer</option>
                  <option className="bg-[#0a0835]">💎 Full Stack Developer</option>
                  <option className="bg-[#0a0835]">🎨 UI/UX Designer</option>
                  <option className="bg-[#0a0835]">📊 Data Analyst</option>
                </select>
              </div>
            </div>

            {/* Modern File Upload */}
            <div className="space-y-1">
              <label className={labelBase}>Upload Resume *</label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${dragActive
                    ? 'border-amber-500 bg-amber-500/10'
                    : errors.resume
                      ? 'border-red-500/50 bg-red-500/5'
                      : 'border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${dragActive ? 'bg-amber-500/20 scale-110' : 'bg-amber-500/10'
                    }`}>
                    {formData.resume ? (
                      <span className="text-3xl">✅</span>
                    ) : (
                      <span className="text-3xl">📄</span>
                    )}
                  </div>
                  {formData.resume ? (
                    <>
                      <p className="text-sm text-amber-400 font-medium">{formData.resume.name}</p>
                      <p className="text-xs text-white/40 mt-1">Click or drag to replace</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white/60 font-medium">Drag & drop your resume here</p>
                      <p className="text-xs text-white/30 mt-2">PDF, DOCX, or DOC (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
              {errors.resume && <p className="text-xs text-red-400 mt-1.5 ml-2">⚠️ {errors.resume}</p>}
            </div>

           
             
            <Button text={isSubmitting ? "Submitting..." : "Apply for Internship →"} />

            <p className="text-center text-[11px] text-white/25 mt-4">
              By applying, you agree to our terms and privacy policy
            </p>
          </form>

    



          </div>
        </div>
      </div>
      );
};

      export default ApplyForInternshipForm;