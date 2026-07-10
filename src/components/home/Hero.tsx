import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Button from "../common/Button";
import BusinessFeatures from "./BusinessFeatures";
import video from "../../../public/video.mp4"

interface SlideContent {
    title: string;
    highlight: string;
    description: string;
    linkTo: string;
}

const slides: SlideContent[] = [
    {
        title: "Welcome to",
        highlight: "Codes Thinker",
        description: "We craft smart, user-friendly digital solutions that help businesses innovate and grow.",
        linkTo: "/about",
    },
    {
        title: "Transform Ideas Into",
        highlight: "Digital Reality",
        description: "Our team blends creative design and clean code to deliver impactful digital experiences.",
        linkTo: "/services",
    },
    {
        title: "Your Vision,",
        highlight: "Our Expertise",
        description: "Partner with us to build scalable, modern websites that bring your vision to life.",
        linkTo: "/contact",
    },
];

const Hero: React.FC = () => {
    return (
        <>
            <div className="w-full h-screen relative overflow-hidden bg-[#07051D]">

                {/* SINGLE PERMANENT BACKGROUND VIDEO */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                    src={video}
                >
                    Your browser does not support the video tag.
                </video>


            {/* OVERLAY - Matches Footer #07051D, with extra opacity for contrast */}
            <div className="absolute inset-0 bg-[#07051D]/75 z-10 pointer-events-none" />


                {/* SWIPER CONTENT */}
                <div className="relative w-full h-full z-20">
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
                        className="w-full h-full"
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
                                            <Link to={slide.linkTo} className="block group cursor-pointer hover:no-underline select-none">
                                                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight transition-colors duration-300 group-hover:text-amber-300">
                                                    {slide.title}{" "}
                                                    <span className="text-amber-500 transition-colors duration-300 group-hover:text-white">
                                                        {slide.highlight}
                                                    </span>
                                                </h2>

                                                <p className="text-sm md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-200 transition-colors duration-300 group-hover:text-white">
                                                    {slide.description}
                                                </p>
                                            </Link>

                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto mt-8">

                                            <Link 
                                                to="/projects" 
                                                className="relative overflow-hidden group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#F49B21] text-[#08061E] font-bold rounded-2xl shadow-lg text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none"
                                            >
                                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                                    View Our Work
                                                </span>
                                                <div className="absolute inset-0 bg-[#08061E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                            </Link>

                                            <Link 
                                                to="/contact" 
                                                className="relative overflow-hidden group flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-transparent text-white font-bold rounded-2xl border-2 border-white/20 hover:border-[#F49B21] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none"
                                            >
                                                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#08061E]">
                                                    Contact Us
                                                </span>
                                                <div className="absolute inset-0 bg-[#F49B21] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                            </Link>

                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
            <div className="p-6">
                <BusinessFeatures />
            </div>

        </>
    );
};

export default Hero;