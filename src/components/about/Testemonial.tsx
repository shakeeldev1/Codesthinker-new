import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Send } from "lucide-react"; // Matching AboutUs icons

interface ReviewType {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

function Testimonial() {
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Frontend Developer",
      review: "Codes Thinker completely transformed my learning journey with practical experience.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Ali Raza",
      role: "MERN Stack Intern",
      review: "Amazing internship experience. Real projects boosted my confidence.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ]);

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: "ease-out-cubic" 
    });
  }, []);

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    const reviewObj: ReviewType = {
      id: Date.now(),
      name: "New Learner",
      role: "Student",
      review: newReview,
      rating,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview("");
    setRating(5);
  };

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden font-sans py-16">
      
      {/* Background Decor - Exact match from AboutUs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER - Styled like AboutUs Section */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-[#F69A20]"></div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Testimonials</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            What Our <span className="text-[#F69A20]">Community</span> Says
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Real feedback from students and developers growing with us. We redefine excellence through shared success.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* LEFT: Image/Stat Panel - Styled like AboutUs Image Card */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1" data-aos="zoom-out-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group h-[500px]">
              <img
                src="https://i.pinimg.com/1200x/e1/c5/15/e1c5157514f9a5819b4e9ec0ce25c5cd.jpg"
                alt="Community"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

              <div className="absolute bottom-8 left-8 text-white">
                 <div className="flex gap-8">
                    <div>
                        <p className="text-3xl font-extrabold text-[#F69A20]">5K+</p>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-300">Students</p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div>
                        <p className="text-3xl font-extrabold text-[#F69A20]">4.9/5</p>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-300">Rating</p>
                    </div>
                 </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69A20] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F69A20]"></span>
                  </span>
                  <span className="text-sm font-semibold text-gray-800">Live Feedback</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form & Reviews - Styled with Glassmorphism */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6" data-aos="fade-left">
            
            {/* Input Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Share Your Experience</h3>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="How was your journey with us?"
                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F69A20] transition-all"
                rows={2}
              />

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                      <Star
                        size={18}
                        className={`${star <= rating ? "text-[#F69A20] fill-[#F69A20]" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddReview}
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-2 rounded-full transition-all hover:shadow-lg"
                >
                  Submit <Send size={14} />
                </button>
              </div>
            </div>

            {/* Scrollable Reviews List */}
            <div className="h-[280px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {reviews.map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all group"
                >
                  <img src={item.image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-50" alt={item.name} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{item.role}</p>
                      </div>
                      <div className="flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-[#F69A20] fill-[#F69A20]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 leading-snug italic">“{item.review}”</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </section>
  );
}

export default Testimonial;