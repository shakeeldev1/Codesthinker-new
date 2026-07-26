import React from "react";
import { motion } from "framer-motion";
import { Users, Globe, Rocket, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const video = "/video.mp4";

interface StatItem {
    label: string;
    val: string;
    icon: React.ReactElement<{ className?: string }>;
}

const JobHero: React.FC = () => {
    const stats: StatItem[] = [
        { label: "Team Members", val: "50+", icon: <Users className="w-5 h-5 text-[#F69A20]" /> },
        { label: "Global Reach", val: "8+ Nations", icon: <Globe className="w-5 h-5 text-[#F69A20]" /> },
        { label: "Success Rate", val: "99%", icon: <Rocket className="w-5 h-5 text-[#F69A20]" /> },
    ];

    return (
        <section className="relative w-full min-h-[100dvh] pt-28 pb-16 md:pt-32 lg:pt-20 flex items-center overflow-hidden font-sans">

            {/* Video Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={video} type="video/mp4" />
                </video>
                {/* Dark Overlay to make the video "feel" part of the dark/tech aesthetic, 
            while keeping the cards/content light and readable */}
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Content (Text now uses white for visibility against video) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full lg:w-3/5 space-y-4 text-center lg:text-left"
                    >
                        
                        <h1 className="text-5xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                            Build Your Career<br />
                            <span className="text-[#F69A20]">With Innovative Projects</span>
                        </h1>

                        <p className="text-gray-200 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            We bridge the gap between complex strategy and human-centric execution.
                            Join a global network of innovators dedicated to your professional growth.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl ring-1 ring-white/10 w-fit">
                                        {React.cloneElement(stat.icon, { className: "w-5 h-5 text-white" })}
                                    </div>
                                    <div className="text-xl font-bold text-white leading-none">{stat.val}</div>
                                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <Link to="/contact" className="inline-flex items-center gap-2 bg-[#F69A20] hover:bg-[#e08a1d] text-white font-bold px-6 py-2 rounded-full transition-all shadow-lg hover:shadow-orange-500/20">
                            Explore Opportunities
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Right Image/Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full lg:w-2/5 flex justify-center"
                    >
                        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl ring-1 ring-white/20 shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/16323454/pexels-photo-16323454.jpeg"
                                alt="Team"
                                className="w-full max-w-[400px] aspect-square sm:aspect-[4/3] object-cover rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default JobHero;