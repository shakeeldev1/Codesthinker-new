import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    text: "+44 7470 103120",
    label: "Phone",
  },
  {
    icon: <FaEnvelope />,
    text: "info@codesthinker.com",
    label: "Email",
  },
  {
    icon: <MdLocationOn />,
    text: "Manchester, UK (Regional)",
    label: "Location",
  },
  {
    icon: <MdLocationOn />,
    text: "Bhawalpur (Global Center)",
    label: "Location",
  },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      <div 
        className="relative w-full min-h-[550px] flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center text-white" 
        style={{
          /* Linear gradient acts as the blue overlay on top of the image */
          backgroundImage: `linear-gradient(to bottom right, rgba(23, 37, 84, 0.85), rgba(30, 58, 138, 0.75)), url('https://img.magnific.com/free-photo/portrait-asian-girl-works-cafe-uses-laptop-sits-outdoors-street-digital-nomad_1258-189137.jpg?t=st=1779271721~exp=1779275321~hmac=0414f66be79b44de3b4d1f10d999dbddb842f84853f44cc5451ebfe852905373&w=1480')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="z-10 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Contact us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg drop-shadow-md">
            We are ready to provide the right solution according to your needs.
          </p>
        </div>

        {/* SVG Wave Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg 
            className="relative block w-full h-[80px] md:h-[120px]" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,122.2,192.4,110.15,236.4,101.55,279.7,85.1,321.39,56.44Z" 
              className="fill-gray-50"
            ></path>
          </svg>
        </div>
      </div>

      {/* 2. Main Content Card (Overlapping Hero) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 z-20 w-full mb-16 relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-500 hover:shadow-orange-500/10 hover:shadow-3xl">
          
          {/* Left Column: Contact Info */}
          <div className="p-8 md:p-12 md:w-5/12 bg-white">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Get in touch</h2>
            <p className="text-gray-600 mb-8">
              Reach out to us for any inquiries or to discuss how we can help your business grow.
            </p>

            <div className="space-y-2">
              {/* Mapped Custom Contact Info */}
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center group p-4 -ml-4 rounded-xl hover:bg-yellow-50 transition-colors duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-semibold text-blue-950 group-hover:text-orange-600 transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-blue-950 mb-4">Follow our social media</h3>
              <div className="flex space-x-4">
                {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center hover:bg-orange-500 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-8 md:p-12 md:w-7/12 bg-gray-50 border-l border-gray-100">
            <h2 className="text-3xl font-bold text-blue-950 mb-8">Send us a message</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium border border-emerald-200 animate-fade-in">
                ✅ Message sent! We will get back to you shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 bg-red-50 text-red-700 px-5 py-3 rounded-xl text-sm font-medium border border-red-200 animate-fade-in">
                ❌ {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Company"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-orange-500/40 focus:ring-4 focus:ring-orange-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Map Area */}
      <div className="w-full h-96 bg-gray-200">
        <iframe 
          title="Google Map"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=London+(Your%20Business%20Name)&t=&z=13&ie=UTF8&iwloc=B&output=embed"
        />
      </div>

      {/* dsjndjs */}
    </div>
  );
};

export default Contact;