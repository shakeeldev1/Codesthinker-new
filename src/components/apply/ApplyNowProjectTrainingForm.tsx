import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';

// --- Modern Form Component with enhanced UX and animations ---

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  trainingInterest: string;
  projectVision: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  trainingInterest?: string;
  projectVision?: string;
}

const ApplyNowProjectTrainingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    trainingInterest: 'Full Stack Web Development',
    projectVision: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
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
    
    if (!formData.trainingInterest) newErrors.trainingInterest = 'Please select a program';
    if (formData.projectVision.length > 500) newErrors.projectVision = 'Must be less than 500 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
        trainingInterest: 'Full Stack Web Development',
        projectVision: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = "w-full px-5 py-3.5 rounded-2xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-base";
  const labelBase = "block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 ml-1 transition-all duration-200";
  const errorBase = "text-xs text-red-400 mt-1.5 ml-2 flex items-center gap-1";

  return (
    <div className="relative">
      {/* Animated background orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] animate-pulse-slow pointer-events-none" />
      
      <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-500">
        {submitStatus === 'success' && (
          <div className="absolute top-4 right-4 left-4 md:left-auto z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3.5 rounded-xl text-sm font-medium shadow-xl animate-slide-down">
            ✅ Success! We'll contact you within 24 hours.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="absolute top-4 right-4 left-4 md:left-auto z-20 bg-gradient-to-r from-red-500 to-rose-500 text-white px-5 py-3.5 rounded-xl text-sm font-medium shadow-xl animate-slide-down">
            ❌ Submission failed. Please try again.
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'fullName' ? 'text-amber-400 translate-x-1' : ''}`}>
                Full Name
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
              {errors.fullName && <p className={errorBase}>⚠️ {errors.fullName}</p>}
            </div>
            
            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'email' ? 'text-amber-400 translate-x-1' : ''}`}>
                Email Address
              </label>
              <input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="alex@company.com" 
                className={`${inputBase} ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
              />
              {errors.email && <p className={errorBase}>⚠️ {errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'phone' ? 'text-amber-400 translate-x-1' : ''}`}>
                Phone Number
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
              {errors.phone && <p className={errorBase}>⚠️ {errors.phone}</p>}
            </div>
            
            <div className="space-y-1">
              <label className={`${labelBase} ${focusedField === 'trainingInterest' ? 'text-amber-400 translate-x-1' : ''}`}>
                Training Program
              </label>
              <select 
                name="trainingInterest"
                value={formData.trainingInterest}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('trainingInterest')}
                onBlur={() => setFocusedField(null)}
                className={`${inputBase} appearance-none cursor-pointer`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f59e0b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
              >
                <option>🚀 Full Stack Web Development</option>
                <option>🤖 Data Science & ML</option>
                <option>🎨 UI/UX Strategy</option>
                <option>☁️ Cloud & DevOps</option>
                <option>📱 Mobile Development</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`${labelBase} ${focusedField === 'projectVision' ? 'text-amber-400 translate-x-1' : ''}`}>
              Project Vision
            </label>
            <textarea 
              name="projectVision"
              rows={3} 
              value={formData.projectVision}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('projectVision')}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell us about your goals and what you want to build..." 
              className={`${inputBase} resize-none ${errors.projectVision ? 'border-red-500/50' : 'border-white/10'}`}
            />
            <div className="flex justify-end">
              <span className={`text-[10px] ${formData.projectVision.length > 450 ? 'text-amber-400' : 'text-white/30'}`}>
                {formData.projectVision.length}/500
              </span>
            </div>
          </div>

          <Button 
            text={isSubmitting ? "Processing..." : "Apply Now →"}
            size="lg" 
            disabled={isSubmitting}
          
          />
          
          <div className="flex items-center justify-center gap-3 text-[11px] text-white/30">
            <span className="flex items-center gap-1">🔒 Secure</span>
            <span>•</span>
            <span className="flex items-center gap-1">⚡ 24h Response</span>
            <span>•</span>
            <span className="flex items-center gap-1">💰 Free</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyNowProjectTrainingForm;