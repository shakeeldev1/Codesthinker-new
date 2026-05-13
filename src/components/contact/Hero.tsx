import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

const ContactHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Contact hero section"
      className="relative w-full min-h-[70vh] flex items-center bg-[#141229] text-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 space-y-7 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1 rounded-full border border-[#F59C20] bg-orange-500/5 text-[#F59C20] ext-sm font-medium mb-5">
              Available 24/7
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              Get in Touch For Quick <br />
              <span className="bg-gradient-to-r from-[#F59C20] to-[#e48f18] bg-clip-text text-transparent">
                Support & Solutions
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Have a complex problem? Our team is ready to discuss your goals and
              architect a custom solution tailored to your vision.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0]
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative group"
            >
              {/* Decorative Ring */}
              <div className="absolute -inset-4 border border-white/10 rounded-[2.5rem] hidden md:block animate-[spin_25s_linear_infinite]" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(255,120,0,0.12)]">
                
                <img
                  alt="Customer support illustration"
                  src="https://www.algotix.ai/_next/image?url=%2Fimages%2Fcontact%2Fcontact-image.png&w=1080&q=75"
                  className="w-[320px] md:w-[450px] rounded-[1.8rem] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* WAVY DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
        <svg
          aria-hidden="true"
          className="relative block w-full h-[60px] "
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28
            c70.36-5.37,136.33-33.31,206.8-37.5
            c73.84-4.36,147.54,16.88,218.2,35.26
            c69.27,18,138.3,24.88,209.4,13.08
            c36.15-6,69.85-17.84,104.45-29.34
            C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#F59C20"
            opacity="0.6"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05
            C99.41,111.27,165,111,224.58,91.58
            c31.15-10.15,60.09-26.07,89.67-39.8
            c40.92-19,84.73-46,130.83-49.67
            c36.26-2.85,70.9,9.42,98.6,31.56
            c31.77,25.39,62.32,62,103.63,73
            c40.44,10.79,81.35-6.69,119.13-24.28
            s75.16-39,116.92-43.05
            c59.73-5.85,113.28,22.88,168.9,38.84
            c30.2,8.66,59,6.17,87.09-7.5
            c22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactHeader;