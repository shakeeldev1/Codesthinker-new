import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface SlideContent {
    title: string;
    highlight: string;
    description: string;
}

const slides: SlideContent[] = [
    {
        title: "Welcome to",
        highlight: "Codes Thinker",
        description: "We craft smart, user-friendly digital solutions that help businesses innovate and grow.",
    },
    {
        title: "Transform Ideas Into",
        highlight: "Digital Reality",
        description: "Our team blends creative design and clean code to deliver impactful digital experiences.",
    },
    {
        title: "Your Vision,",
        highlight: "Our Expertise",
        description: "Partner with us to build scalable, modern websites that bring your vision to life.",
    },
];

const Hero: React.FC = () => {
    return (
        <div className="w-full h-screen max-h-[550px] relative overflow-hidden bg-[#07051D]">

            {/* SINGLE PERMANENT BACKGROUND VIDEO */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://www.pexels.com/download/video/6804114/"
            >
                Your browser does not support the video tag.
            </video>

            {/* OVERLAY - Matches Footer #07051D */}
            <div className="absolute inset-0 bg-[#07051D]/20 z-10" />

            {/* SWIPER CONTENT */}
            <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/40 !w-3 !h-3 !mx-1 !opacity-100",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-amber-500 !w-8 !transition-all !duration-300 !rounded-full",
                }}
                className="w-full h-full z-20"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full h-full flex items-center justify-center px-6">
                            <div className="text-white text-center max-w-4xl px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                        {slide.title}{" "}
                                        <span className="text-amber-500">
                                            {slide.highlight}
                                        </span>
                                    </h2>

                                    <p className="text-sm md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-200">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">

                                        <Link to="/projects" className="cursor-pointer">
                                            <button className="px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-bold rounded-full bg-amber-500 text-[#07051D] hover:bg-amber-400 transition-all duration-300 shadow-lg hover:-translate-y-1 transform cursor-pointer">
                                                View Our Work
                                            </button>
                                        </Link>

                                        <Link to="/contact" className="cursor-pointer">
                                            <button className="px-6 py-2 md:px-8 text-sm md:text-base font-bold rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#07051D] transition-all duration-300 shadow-lg hover:-translate-y-1 transform cursor-pointer">
                                                Contact Us
                                            </button>
                                        </Link>

                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;