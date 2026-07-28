import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '../../config';

interface ApplyForJobFormProps {
  jobPostingId?: string;
  jobTitle?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  resume: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  coverLetter?: string;
  resume?: string;
}

const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ jobPostingId, jobTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    position: jobTitle || 'Software Engineer',
    coverLetter: '',
    resume: null,
  });

  // Update position if jobTitle changes
  React.useEffect(() => {
    if (jobTitle) {
      setFormData(prev => ({ ...prev, position: jobTitle }));
    }
  }, [jobTitle]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputBase = "w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F69A20]/50 focus:border-[#F69A20] transition-all duration-300";
  const labelBase = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size exceeds 5MB limit.' }));
      return;
    }

    // Check extension
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.pdf', '.docx', '.doc'].includes(ext)) {
      setErrors(prev => ({ ...prev, resume: 'Only PDF, DOC, and DOCX files are allowed.' }));
      return;
    }

    setErrors(prev => ({ ...prev, resume: undefined }));
    setFormData(prev => ({ ...prev, resume: file }));
  };

  // Drag and drop handlers
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('position', formData.position);
      if (formData.coverLetter) {
        payload.append('coverLetter', formData.coverLetter);
      }
      if (jobPostingId) {
        payload.append('jobPostingId', jobPostingId);
      }
      if (formData.resume) {
        payload.append('resume', formData.resume);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/jobs`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMsg = data.errors.map((e: any) => e.message).join(', ');
          throw new Error(errorMsg);
        }
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: jobTitle || 'Software Engineer',
        coverLetter: '',
        resume: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-gray-200">
      
      {/* Success/Error Alerts */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium border border-emerald-200">
          ✅ Application submitted! We'll contact you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-50 text-red-700 px-5 py-3 rounded-xl text-sm font-medium border border-red-200">
          ❌ {errorMessage}
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

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className={labelBase}>Full Name *</label>
          <input 
            name="fullName"
            type="text"
            className={inputBase} 
            placeholder="Alex Johnson" 
            value={formData.fullName} 
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className={labelBase}>Email Address *</label>
          <input 
            name="email"
            type="email"
            className={inputBase} 
            placeholder="you@company.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelBase}>Phone Number *</label>
            <input 
              name="phone"
              type="tel"
              className={inputBase} 
              placeholder="+1 (555) 000-0000" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
          </div>
          <div>
            <label className={labelBase}>Position *</label>
            {jobTitle ? (
              <input
                type="text"
                name="position"
                readOnly
                className={`${inputBase} bg-gray-50 cursor-not-allowed`}
                value={formData.position}
              />
            ) : (
              <select 
                name="position"
                className={`${inputBase} cursor-pointer`}
                value={formData.position}
                onChange={handleChange}
              >
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
            )}
          </div>
        </div>

        <div>
          <label className={labelBase}>Cover Letter / Message (Optional)</label>
          <textarea 
            name="coverLetter"
            rows={4}
            className={`${inputBase} font-sans`} 
            placeholder="Tell us about yourself and why you're a great fit for this role..." 
            value={formData.coverLetter} 
            onChange={handleChange}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className={labelBase}>Resume *</label>
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.docx,.doc"
            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
          />
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragActive ? 'border-[#F69A20] bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            } ${errors.resume ? 'border-red-300 bg-red-50/20' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <span className="text-3xl">📄</span>
            {formData.resume ? (
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-800">{formData.resume.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-xs text-[#F69A20] font-bold mt-2 hover:underline">Click or drag to replace</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700 mt-2">Upload your resume</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, DOC (Max 5MB)</p>
              </>
            )}
          </div>
          {errors.resume && <p className="text-red-500 text-xs mt-1 ml-1">{errors.resume}</p>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting Application...' : 'Apply for Job →'}
        </button>
      </form>
    </div>
  );
};

export default ApplyForJobForm;