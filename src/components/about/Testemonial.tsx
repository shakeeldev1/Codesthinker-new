"use client";

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Building2, ShieldCheck } from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ReviewType {
  id: number;
  name: string;
  role: string;
  company: string;
  projectScope: string;
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
    projectScope: "Payment Microservices",
    review:
      "Code's Thinker delivered our payment processing microservices three weeks ahead of schedule. The code quality, architectural decisions, and communication were exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "HealthTech Systems",
    projectScope: "HIPAA SaaS Platform",
    review:
      "From UX wireframes to deployment, Code's Thinker executed our HIPAA-compliant SaaS platform flawlessly. Their attention to security and scalability was highly impressive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Marcus Thornby",
    role: "Founder & CEO",
    company: "Apex Logistics",
    projectScope: "Fleet Tracking Mobile App",
    review:
      "We hired them to build our cross platform fleet tracking app. They built a fast, battery-efficient solution that instantly improved our delivery operations by over 40%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "Product Director",
    company: "DataSync AI",
    projectScope: "AI Feature Integration",
    review:
      "Partnering with Code's Thinker on our AI features was a game-changer. They deliver clean code, maintain excellent velocity, and integrate seamlessly with our internal teams.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Lead Architect",
    company: "CloudNative",
    projectScope: "Serverless Cloud Migration",
    review:
      "Their expertise in Kubernetes and AWS serverless architecture helped us reduce our cloud spend by 35% while improving system reliability and deployment times.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    role: "Head of Digital",
    company: "RetailEdge",
    projectScope: "Headless E-Commerce",
    review:
      "The headless Shopify Plus storefront they built for us is lightning fast. Our conversion rates jumped 22% in the first month post launch. Absolute professionals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
];

const Testimonial: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative w-full py-12 bg-[#FAFBFD] overflow-hidden font-sans">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800e_1px,transparent_1px),linear-gradient(to_bottom,#8080800e_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#F69A20]/10 via-blue-500/5 to-transparent blur-[140px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8" data-aos="fade-up">
          <div className="max-w-2xl">
            <div className="mb-4">
              <SectionBadge text="Client Success Stories" theme="light" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08061E] tracking-tight leading-[1.15]">
              Trusted by tech leaders &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08061E] via-[#2A1D4E] to-[#F69A20]">
                engineering teams
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Here is how we partner with CTOs, founders, and product teams to deliver high-impact software solutions.
            </p>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`p-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                isBeginning
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white/50"
                  : "border-slate-300 text-[#08061E] bg-white hover:bg-[#08061E] hover:text-white hover:border-[#08061E] shadow-sm hover:shadow-md active:scale-95"
              }`}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`p-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                isEnd
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white/50"
                  : "border-slate-300 text-[#08061E] bg-white hover:bg-[#08061E] hover:text-white hover:border-[#08061E] shadow-sm hover:shadow-md active:scale-95"
              }`}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonials Swiper Carousel */}
        <div className="w-full" data-aos="fade-up" data-aos-delay="150">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={28}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full !py-4"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(8,6,30,0.03)] hover:shadow-[0_12px_32px_-6px_rgba(8,6,30,0.08)] hover:border-[#F69A20]/40 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1.5">
                  
                  <div>
                    {/* Top Bar: Rating, Quote, & Scope Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={15} className="text-[#F69A20] fill-[#F69A20]" />
                        ))}
                      </div>
                      <Quote size={28} className="text-slate-200 group-hover:text-[#F69A20]/30 transition-colors duration-300" />
                    </div>

                    {/* Project Scope Tag */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/80 text-slate-700 text-xs font-semibold mb-4 border border-slate-200/60">
                      <Building2 size={12} className="text-[#F69A20]" />
                      <span>{review.projectScope}</span>
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 text-[15px] leading-relaxed mb-6 font-normal">
                      "{review.review}"
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200"
                          draggable="false"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 text-white ring-2 ring-white">
                          <CheckCircle2 size={10} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#08061E] group-hover:text-[#F69A20] transition-colors">
                          {review.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {review.role} · <span className="text-slate-800 font-semibold">{review.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Container */}
          <div className="custom-swiper-pagination flex justify-center items-center gap-2 mt-8"></div>
        </div>

        {/* Bottom Trust Metrics Bar */}
        <div
          className="mt-16 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <div className="pt-4 sm:pt-0">
            <div className="inline-flex items-center gap-1.5 text-3xl font-black text-[#08061E]">
              <span>4.9/5</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider flex items-center justify-center gap-1">
              <Star size={13} className="fill-[#F69A20] text-[#F69A20]" /> Client Satisfaction
            </p>
          </div>

          <div className="pt-4 sm:pt-0">
            <h4 className="text-3xl font-black text-[#08061E]">50+</h4>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider flex items-center justify-center gap-1">
              <Building2 size={13} className="text-[#F69A20]" /> Enterprise Products Delivered
            </p>
          </div>

          <div className="pt-4 sm:pt-0">
            <h4 className="text-3xl font-black text-[#08061E]">98%</h4>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-[#F69A20]" /> Client Retention Rate
            </p>
          </div>
        </div>

      </div>

      {/* Pagination Bullet Styling */}
      <style>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #08061e;
          opacity: 0.2;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 4px !important;
          cursor: pointer;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #f69a20 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;