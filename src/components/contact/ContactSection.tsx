// // @ts-nocheck
// import { useState } from "react";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaTwitter,
//   FaFacebookF,
//   FaLinkedinIn,
//   FaInstagram,
// } from "react-icons/fa";
// import { IoSendSharp } from "react-icons/io5";
// import Button from '../common/Button';
// import { MdLocationOn } from "react-icons/md";

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const contactInfo = [
//     {
//       icon: <FaPhoneAlt className="w-5 h-5 text-white" />,
//       text: "+44 7470 103120",
//       label: "Phone",
//     },
//     {
//       icon: <FaEnvelope className="w-5 h-5 text-white" />,
//       text: "info@codesthinker.com",
//       label: "Email",
//     },
//     {
//       icon: <MdLocationOn className="text-white text-xl" />,
//       text: "Manchester, UK (Regional)",
//       label: "Location",
//     },
//     {
//       icon: <MdLocationOn className="text-white text-xl" />,
//       text: "Bhawalpur (Global Center)",
//       label: "Location",
//     },
//   ];

//   return (
//     <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 text-[#07051D] relative overflow-hidden">
//       {/* More visible grid SVG background effect */}
//       <svg
//         className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
//         width="1440"
//         height="1200"
//         viewBox="0 0 1440 1200"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ opacity: 0.22 }}
//       >
//         <defs>
//           <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
//             <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F59C24" strokeWidth="1.2" />
//           </pattern>
//         </defs>
//         <rect width="1440" height="1200" fill="url(#grid)" />
//       </svg>
//       <div className="max-w-7xl mx-auto">
        
//         {/* Section Header */}
//         <div className="mb-16 text-center lg:text-left">
//           <h2 className="text-5xl md:text-5xl font-bold">
//             Get In <span className="text-[#F59C24]">Touch</span>
//           </h2>
//           <div className="h-1.5 w-24 bg-[#F59C24] mt-4 mx-auto lg:ml-0" />
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
//           {/* Left Column: Details */}
//           <div className="flex flex-col justify-between py-4">
//             <div className="space-y-8">
//               <h3 className="text-3xl font-extrabold leading-tight max-w-md">
//                 Ready To Turn Your Vision Into Reality?
//               </h3>
              
//               <div className="grid gap-8">
//                 {contactInfo.map((item, idx) => (
//                   <div key={idx} className="flex items-center group">
//                     <div
//                       className="flex-shrink-0 p-4 bg-[#07051D] group-hover:bg-[#F59C24] transition-all duration-300 shadow-lg"
//                       style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
//                     >
//                       {item.icon}
//                     </div>
//                     <div className="ml-5">
//                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F59C24] mb-0.5">{item.label}</p>
//                       <p className="text-lg font-bold">{item.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Socials */}
//             <div className="mt-12 flex gap-4">
//               {[<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />].map((icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 text-[#07051D] hover:bg-[#F59C24] hover:text-white hover:border-[#F59C24] transition-all duration-300"
//                 >
//                   {icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: DARK NAVY FORM CARD */}
//           <div className="relative group">
//             {/* Glow effect behind the dark card */}
//             <div className="absolute -inset-2 bg-[#F59C24] opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
            
//             <form 
//               onSubmit={handleSubmit}
//               className="relative bg-[#07051D] p-8 md:p-12 rounded-xl shadow-xl text-white border border-white/5"
//             >
//               <h4 className="text-xl font-black mb-8 flex items-center gap-3">
//                 Send a <span className="text-[#F59C24]">Message</span>
//                 <div className="h-px flex-1 bg-white/10" />
//               </h4>

//               <div className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-[#F59C24] ml-1">Your Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#F59C24] focus:bg-white/10 outline-none transition-all placeholder:text-gray-500"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-bold uppercase tracking-widest text-[#F59C24] ml-1">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#F59C24] focus:bg-white/10 outline-none transition-all placeholder:text-gray-500"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-[#F59C24] ml-1">Subject</label>
//                   <input
//                     type="text"
//                     id="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#F59C24] focus:bg-white/10 outline-none transition-all placeholder:text-gray-500"
//                     placeholder="What's this about?"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-[#F59C24] ml-1">Your Message</label>
//                   <textarea
//                     id="message"
//                     rows="4"
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-[#F59C24] focus:bg-white/10 outline-none transition-all placeholder:text-gray-500 resize-none"
//                     placeholder="Tell us more..."
//                   ></textarea>
//                 </div>

//                 <Button
//                   text="SUBMIT NOW"
//                   type="submit"
//                   className="w-full flex items-center justify-center gap-3 bg-[#F59C24] text-[#07051D] font-black uppercase py-4 hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(245,156,36,0.3)] active:scale-95"
//                   size="md"
//                   variant="primary"
//                   // @ts-ignore
//                   children={<IoSendSharp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
//                 />
//               </div>
//             </form>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


// @ts-nocheck
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from 'react-hot-toast';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function ContactFormAlternative() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Top-right corner toast active
    toast.success("Message sent! We will get back to you shortly.", {
      id: 'alternative-contact-toast',
    });

    // Form reset
    setFormData({ name: "", company: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Global Portal Context - Top Right Corner Placement */}
      {mounted && ReactDOM.createPortal(
        <Toaster 
          position="top-right" 
          reverseOrder={false} 
          containerStyle={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 999999,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff', 
              color: '#0f172a',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '12px',
              padding: '14px 22px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              minWidth: '320px',
            },
            success: {
              iconTheme: {
                primary: '#10b981', 
                secondary: '#ffffff',
              },
            },
          }}
        />,
        document.body
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 grid md:grid-cols-12 gap-12 text-[#0f172a]">
        
        {/* Left Column */}
        <div className="md:col-span-5 space-y-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[#091a44]">Get in touch</h2>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Reach out to us for any inquiries or to discuss how we can help your business grow.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-amber-50 rounded-full text-amber-500">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#091a44]">Phone</h4>
                <p className="text-gray-500 text-sm mt-0.5">+44 7470 103120</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-amber-50 rounded-full text-amber-500">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#091a44]">Email</h4>
                <p className="text-gray-500 text-sm mt-0.5">info@codesthinker.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-amber-50 rounded-full text-amber-500">
                <MdLocationOn className="w-5 h-5 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-[#091a44]">Location</h4>
                <p className="text-gray-500 text-sm mt-0.5">Manchester, UK (Regional)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-amber-50 rounded-full text-amber-500">
                <MdLocationOn className="w-5 h-5 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-[#091a44]">Location</h4>
                <p className="text-gray-500 text-sm mt-0.5">Bhawalpur (Global Center)</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-bold text-[#091a44] mb-4">Follow our social media</h4>
            <div className="flex gap-3">
              {[<FaFacebookF />, <FaInstagram />, <FaTwitter />, <FaLinkedinIn />].map((icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center bg-[#091a44] text-white rounded-full hover:bg-amber-500 transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:col-span-7">
          <h3 className="text-3xl font-extrabold text-[#091a44] mb-8">Send us a message</h3>
          
          {/* PURANA EMBEDDED GREEN ALERT BOX YAHA SE REMOVE KAR DIYA HAI */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">Message</label>
              <textarea
                id="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f96302] hover:bg-[#e05202] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm tracking-wide uppercase"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}