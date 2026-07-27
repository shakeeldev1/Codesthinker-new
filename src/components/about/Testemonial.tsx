"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Quote } from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ReviewType {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image: string;
}

const reviews: ReviewType[] = [
  {
    id: 1,
    name: "David Vance",
    role: "Chief Technology Officer",
    company: "FinTech ScaleUp",
    review: "Code's Thinker delivered our payment processing microservices three weeks ahead of schedule. The code quality, architectural decisions, and communication were exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "HealthTech Systems",
    review: "From UX wireframes to deployment, Code's Thinker executed our HIPAA-compliant SaaS platform flawlessly. Their attention to security and scalability was highly impressive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Marcus Thornby",
    role: "Founder & CEO",
    company: "Apex Logistics",
    review: "We hired them to build our cross-platform fleet tracking app. They built a fast, battery-efficient solution that instantly improved our delivery operations by over 40%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "Product Director",
    company: "DataSync AI",
    review: "Partnering with Code's Thinker on our AI features was a game-changer. They deliver clean code, maintain excellent velocity, and integrate seamlessly with our internal teams.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Lead Architect",
    company: "CloudNative",
    review: "Their expertise in Kubernetes and AWS serverless architecture helped us reduce our cloud spend by 35% while improving system reliability and deployment times.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    role: "Head of Digital",
    company: "RetailEdge",
    review: "The headless Shopify Plus storefront they built for us is lightning fast. Our conversion rates jumped 22% in the first month post-launch. Absolute professionals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  }
];

const Testimonial: React.FC = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: "ease-out-cubic" 
    });
  }, []);

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden font-sans">
      
      {/* Premium B2B Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        {/* Soft glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="flex justify-center mb-6">
            <SectionBadge text="Client Success" theme="light" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#08061E] tracking-tight leading-tight mb-6">
            Trusted by innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08061E] to-[#F69A20]">engineering teams</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover how we partner with founders, CTOs, and global brands to design, build, and deploy high-performance software solutions.
          </p>
        </div>

        {/* Testimonials Swiper Carousel */}
        <div className="w-full pb-12" data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full !pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 h-full flex flex-col cursor-grab active:cursor-grabbing">
                  {/* Top Section: Rating & Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-[#F69A20] fill-[#F69A20]" />
                      ))}
                    </div>
                    <Quote size={24} className="text-gray-200" />
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 leading-relaxed mb-8 flex-grow text-[15px]">
                    "{review.review}"
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      draggable="false"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#08061E]">{review.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {review.role}, <span className="text-[#F69A20]">{review.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom CTA / Trust Metrics */}
        <div className="mt-12 pt-10 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16" data-aos="fade-up" data-aos-delay="300">
          <div className="text-center sm:text-left">
            <h4 className="text-3xl font-extrabold text-[#08061E]">4.9/5</h4>
            <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">Average Rating</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
          <div className="text-center sm:text-left">
            <h4 className="text-3xl font-extrabold text-[#08061E]">50+</h4>
            <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">Enterprise Clients</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
          <div className="text-center sm:text-left">
            <h4 className="text-3xl font-extrabold text-[#08061E]">98%</h4>
            <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">Client Retention</p>
          </div>
        </div>

      </div>
      
      <style>{`
        .swiper-pagination-bullet {
          background: #08061E !important;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          background: #F69A20 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;