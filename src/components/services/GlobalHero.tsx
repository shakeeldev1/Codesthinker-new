import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const GlobalHero = ({ data, height = "h-screen" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <main 
      className={`relative w-full bg-[#07051d] overflow-hidden ${!height.includes('vh') && !height.includes('px') ? height : ''}`}
      style={{ height: height.includes('vh') || height.includes('px') ? height : undefined }}
    >
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full 
          [&_.swiper-pagination]:!bottom-12 
          sm:[&_.swiper-pagination]:!bottom-20 
          [&_.swiper-pagination]:!left-auto
          [&_.swiper-pagination]:!right-12
          [&_.swiper-pagination]:!w-fit
          [&_.swiper-pagination]:!flex 
          [&_.swiper-pagination]:!items-center 
          [&_.swiper-pagination]:!justify-end
          [&_.swiper-pagination]:!px-0
          [&_.swiper-pagination]:!gap-2
          [&_.swiper-pagination-bullet]:!w-6
          sm:[&_.swiper-pagination-bullet]:!w-8 
          [&_.swiper-pagination-bullet]:!h-0.5 
          [&_.swiper-pagination-bullet]:!rounded-full 
          [&_.swiper-pagination-bullet]:!bg-white/20 
          [&_.swiper-pagination-bullet]:!opacity-100 
          [&_.swiper-pagination-bullet]:!m-0 
          [&_.swiper-pagination-bullet]:!transition-all 
          [&_.swiper-pagination-bullet]:!duration-700
          [&_.swiper-pagination-bullet-active]:!w-10
          sm:[&_.swiper-pagination-bullet-active]:!w-16 
          [&_.swiper-pagination-bullet-active]:!bg-amber-500
          [&_.swiper-pagination-bullet-active]:!shadow-lg"
      >
        {data.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: activeIndex === index ? 1 : 1.1 }}
              transition={{ duration: 7, ease: "easeOut" }}
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#07051d]/80 via-[#07051d]/40 to-transparent" />
            <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    className="max-w-4xl w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <motion.div
                        className="h-px bg-white w-6 sm:w-8"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white/70">
                        {slide.subtitle}
                      </p>
                    </motion.div>
                    <motion.h1
                      className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {slide.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block mr-2 sm:mr-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3 + i * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>
                    <motion.p
                      className="text-sm md:text-xl mb-8 max-w-2xl text-gray-200 leading-relaxed"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap justify-start gap-4 md:gap-6 mt-4 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Link 
                        to={slide.primaryLink || '/contact'}
                        className="relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden shadow-lg focus:outline-none px-6 py-2 md:px-8 text-sm md:text-base bg-amber-500 text-[#07051d] hover:bg-amber-400 group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {slide.primaryBtnText || 'Explore Now'}
                        </span>
                        <span className="absolute inset-0 -translate-x-full bg-white/30 group-hover:translate-x-full transition-transform duration-700 ease-in-out rotate-12"></span>
                      </Link>
                      <Link 
                        to={slide.secondaryLink || '/contact'}
                        className="px-6 py-2 md:px-8 text-sm md:text-base font-bold rounded-xl bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#07051d] transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        {slide.secondaryBtnText || 'Learn More'}
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#07051d] to-transparent z-5 pointer-events-none" />
    </main>
  );
};

export default GlobalHero;