"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMapPin, LuMail, LuAward } from "react-icons/lu";
import { FaLinkedin, FaLinkedinIn, FaTwitter, FaGithub, FaDribbble, FaFacebook, FaInstagram } from "react-icons/fa";
import { SectionBadge } from "../ui/SectionBadge";

// Corrected type import to fix the syntax error
import { teamMembers, getRoleTheme, FALLBACK_AVATAR } from "./data";
import type { TeamMember } from "./data";

// Map the string icon names stored in data to actual react-icons components
const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedin,
  FaLinkedinIn,
  FaLinkedin,
  twitter: FaTwitter,
  FaTwitter,
  github: FaGithub,
  FaGithub,
  dribbble: FaDribbble,
  FaDribbble,
  facebook: FaFacebook,
  FaFacebook,
  instagram: FaInstagram,
  FaInstagram,
};

const resolveSocialIcon = (name: string) => SOCIAL_ICONS[name] ?? FaLinkedin;

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMember, setModalMember] = useState<TeamMember | null>(null);

  // SSR safe: Initialize with default safe desktop width, update in useEffect
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { executives, normalStaff } = useMemo(() => ({
    executives: teamMembers.slice(0, 5),
    normalStaff: teamMembers.slice(5),
  }), []);

  const TOTAL_ITEMS = executives.length;

  const getRadius = useCallback((width: number) => {
    if (width < 380) return 115;
    if (width < 500) return 150;
    if (width < 768) return 185;
    if (width < 1024) return 245;
    return 290;
  }, []);

  const RADIUS = getRadius(windowSize.width);

  // Safely capture window size only on the client
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay interval setup
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, TOTAL_ITEMS]);

  // Handle manual selection with a timeout to resume autoplay
  const handleManualSelection = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const openMemberModal = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setShowModal(true);
    setModalMember(executives[index] ?? null);
  }, []);

  const closeMemberModal = useCallback(() => {
    setShowModal(false);
    setModalMember(null);
    setIsAutoPlaying(true);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Global timeout cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, []);

  const activeMember = executives[activeIndex];

  const getOrbPosition = useCallback((index: number) => {
    const angle = (index / TOTAL_ITEMS) * 2 * Math.PI - Math.PI / 2;
    return { x: Math.cos(angle) * RADIUS, y: Math.sin(angle) * RADIUS };
  }, [RADIUS, TOTAL_ITEMS]);

  return (
    <section className="relative w-full min-h-screen bg-[#F9FAFB] overflow-hidden font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#F49B21]/6 to-transparent rounded-full filter blur-[100px] animate-pulse"
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#07051D]/4 to-transparent rounded-full filter blur-[120px] animate-pulse delay-1000"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.015)_0%,transparent_70%)] filter blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionBadge text="Executive Leadership" theme="light" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#07051D] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            The Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F49B21] to-amber-500">Innovation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto font-light"
          >
            A collective of passionate experts dedicated to transforming complex challenges into seamless digital experiences.
          </motion.p>
        </div>

        {/* Orbit & Profile Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Circular Navigation Hub */}
          <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[450px] md:h-[550px] flex items-center justify-center select-none overflow-visible">
            <motion.div className="absolute border border-slate-200/50 rounded-full" style={{ width: RADIUS * 2, height: RADIUS * 2 }} animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute border border-dashed border-[#F49B21]/15 rounded-full" style={{ width: RADIUS * 1.5, height: RADIUS * 1.5 }} animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute border border-dotted border-slate-300/20 rounded-full" style={{ width: RADIUS * 1.1, height: RADIUS * 1.1 }} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />

            {/* Central Active Avatar */}
            <AnimatePresence mode="wait">
              {activeMember && (
                <motion.div
                  key={activeMember.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-20"
                >
                  <div className="absolute -inset-8 bg-gradient-to-tr from-[#F49B21]/40 via-[#07051D]/10 to-[#F49B21]/40 rounded-full blur-[40px] opacity-70 -z-10" />
                  <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-[4px] bg-gradient-to-tr from-[#07051D] via-amber-400 to-[#F49B21] shadow-[0_20px_60px_-15px_rgba(244,155,33,0.4)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-[spin_4s_linear_infinite]" />
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#07051D] relative z-10 border-[4px] border-white/90">
                      <img src={activeMember.avatar} alt={activeMember.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/40 to-transparent opacity-60 mix-blend-overlay" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Orbiting Orbs */}
            {executives.map((member, index) => {
              const { x, y } = getOrbPosition(index);
              const isActive = activeIndex === index;
              const isHovered = hoveredOrb === index;
              return (
                <motion.div
                  key={member.id}
                  className="absolute z-30 cursor-pointer group"
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{ x, y, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 + 0.5 }}
                  onClick={() => openMemberModal(index)}
                  onMouseEnter={() => setHoveredOrb(index)}
                  onMouseLeave={() => setHoveredOrb(null)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.25 : 1, borderColor: isActive ? "#F49B21" : "#e5e7eb" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 bg-white shadow-lg transition-all duration-300 ${isActive ? "ring-4 ring-[#F49B21]/30 shadow-xl" : "hover:shadow-xl hover:border-[#F49B21]/50"}`}
                  >
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }} />
                    {isHovered && !isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F49B21] animate-ping" />
                      </div>
                    )}
                  </motion.div>
                  {isActive && (
                    <motion.div className="absolute -inset-1 rounded-full bg-[#F49B21]/20 -z-10" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Active Profile Info Panel */}
          <div className="w-full lg:w-1/2 relative z-30">
            <AnimatePresence mode="wait">
              {activeMember && (
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="bg-white/95 backdrop-blur-3xl border border-slate-100 shadow-[0_40px_100px_-20px_rgba(7,5,29,0.15)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-[0_40px_100px_-20px_rgba(244,155,33,0.2)] transition-shadow duration-[1000ms]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F49B21]/[0.02] to-[#07051D]/[0.02] opacity-100 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#07051D] via-[#F49B21] to-[#07051D] bg-[length:200%_auto] animate-[sweep_3s_linear_infinite]" />

                  <motion.div className="w-24 h-1.5 bg-[#F49B21] rounded-full mb-8 shadow-[0_0_15px_rgba(244,155,33,0.5)]" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} />

                  <div className="space-y-6 relative z-10">
                    <div>
                      {/* Increased Name Text Size */}
                      <motion.h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07051D] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        {activeMember.name}
                      </motion.h3>

                      {/* Increased Meta Tags Text Size */}
                      <motion.div className="flex flex-wrap items-center gap-y-3 gap-x-5 mt-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <span className="text-white font-extrabold text-xs uppercase tracking-[0.2em] px-5 py-2.5 bg-gradient-to-r from-[#07051D] to-[#1a1540] border border-[#07051D]/20 rounded-full shadow-lg shadow-[#07051D]/20">
                          {activeMember.role}
                        </span>
                        {activeMember.location && (
                          <span className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
                            <LuMapPin className="text-[#F49B21]" size={18} /> {activeMember.location}
                          </span>
                        )}
                        {activeMember.experience && (
                          <span className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
                            <span className="relative flex h-2.5 w-2.5 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F49B21] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F49B21]"></span>
                            </span>
                            {activeMember.experience} Exp
                          </span>
                        )}
                      </motion.div>
                    </div>

                    {/* Increased Description Text Size */}
                    <motion.p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      {activeMember.description}
                    </motion.p>

                    {/* Increased Expertise Subtitle and Badge Sizes */}
                    <motion.div className="space-y-4 pt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <LuAward className="text-[#F49B21] scale-120" /> Leadership Expertise
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {activeMember.skills.slice(0, 6).map((skill, idx) => (
                          <motion.span
                            key={skill}
                            className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200/60 hover:border-[#F49B21] hover:text-[#07051D] transition-all cursor-default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {activeMember.achievements && activeMember.achievements.length > 0 && (
                      <motion.div className="space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <LuAward className="text-[#F49B21]" /> Key Milestones
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {activeMember.achievements.map((achievement, idx) => (
                            <span key={idx} className="px-4 py-2 bg-[#F8FAFC] border border-slate-200/50 text-[#475569] text-sm font-semibold rounded-full shadow-sm">
                              🏆 {achievement}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <motion.div className="flex flex-wrap items-center gap-3 pt-8 border-t border-gray-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      {activeMember.social.map((social, i) => {
                        const Icon = resolveSocialIcon(social.icon);
                        return (
                          <motion.a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.platform}
                            className="p-3 bg-[#F1F5F9] text-slate-600 rounded-xl hover:bg-[#07051D] hover:text-white transition-all duration-300 border border-slate-200/60 shadow-sm"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="text-xl" />
                          </motion.a>
                        );
                      })}
                      {activeMember.email && (
                        <motion.a
                          href={`mailto:${activeMember.email}`}
                          className="p-3 bg-[#F1F5F9] text-slate-600 rounded-xl hover:bg-[#07051D] hover:text-white transition-all duration-300 border border-slate-200/60 shadow-sm"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LuMail className="text-xl" />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-50 to-transparent rounded-tl-3xl -z-10" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex justify-center lg:justify-start gap-2 mt-10">
              {executives.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleManualSelection(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${activeIndex === idx ? "w-12 bg-[#07051D]" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                  whileHover={{ scaleY: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={activeIndex === idx ? { scaleX: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Auto-playing Indicator */}
            {isAutoPlaying && (
              <motion.div className="flex justify-center lg:justify-start gap-1 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-0.5 text-sm text-gray-500">
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Core Talent Section (Engineering & Creative Force) */}
        <div className="mt-24 pt-16 border-t border-slate-200/60">
          <div className="text-center mb-20 space-y-4">
            <SectionBadge text="Core Talent" theme="light" />
            <h2 className="text-4xl sm:text-5xl font-bold text-[#07051D] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our Engineering & Creative Force
            </h2>
            <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto font-light">
              Meet the specialists, engineers, and designers who craft, scale, and deliver digital solutions.
            </p>
          </div>

          {/* Cards configured with high visual hierarchy: Top Image -> Bottom Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {normalStaff.map((member) => {
              const theme = getRoleTheme(member.role);
              const accentColor = theme.accent;
              const rgbAccent = theme.glow || '7, 5, 29';

              return (
                <div
                  key={member.id}
                  className="group relative bg-white rounded-3xl border border-slate-200/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer hover:border-transparent"
                  onClick={() => { setModalMember(member); setShowModal(true); setIsAutoPlaying(false); }}
                  style={
                    {
                      '--accent-rgb': rgbAccent,
                      '--accent-color': accentColor,
                      boxShadow: '0 12px 40px -18px rgba(7, 5, 29, 0.12)'
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 28px 55px -18px rgba(${rgbAccent}, 0.28)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 40px -18px rgba(7, 5, 29, 0.12)';
                  }}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r ${theme.accentBar || theme.gradient} z-20`} />

                  {/* Soft corner wash */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 z-10"
                    style={{ background: `rgba(${rgbAccent}, 0.45)` }}
                  />

                  {/* 1. TOP IMAGE AREA */}
                  <div className="relative w-full h-60 xs:h-64 sm:h-72 md:h-80 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                        member.id === "dev-013" ? "object-[center_18%]" : "object-top"
                      }`}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/75 via-[#07051D]/20 to-transparent opacity-95" />
                    <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${theme.accentBar || theme.gradient} opacity-90`} />

                    {/* Role badge over image */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="inline-flex max-w-full truncate px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] border border-white/20 backdrop-blur-md bg-[#07051D]/85 text-white shadow-sm">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* 2. BOTTOM CONTENT AREA */}
                  <div className="relative z-10 flex flex-col flex-grow p-5 sm:p-6 md:p-7 bg-gradient-to-b from-white to-slate-50/80">

                    {/* Header: Profile Name & Role */}
                    <div className="mb-4 sm:mb-5">
                      <h3
                        className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#07051D] tracking-tight transition-colors duration-300 group-hover:text-[var(--accent-color)]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {member.name}
                      </h3>

                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2 mt-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold border ${theme.soft}`}>
                          {member.role}
                        </span>
                        {member.location && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-medium group-hover:text-slate-600 transition-colors duration-300">
                            <LuMapPin size={14} className="transition-colors" style={{ color: accentColor }} />
                            {member.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Text (clamped to 3 lines) */}
                    <p
                      className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-6 transition-colors duration-300 group-hover:text-slate-700"
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: 64
                      }}
                    >
                      {member.description}
                    </p>

                    {/* Skills / Tags */}
                    <div className="space-y-3 mb-4 relative z-30" style={{ minHeight: 44 }}>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.slice(0, 4).map(skill => (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg border transition-all duration-300 ${theme.chip}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4" style={{ minHeight: 56 }}>
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <LuAward className="text-[#07051D]" /> Key Milestones
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {member.achievements && member.achievements.length > 0 ? (
                          member.achievements.map((achievement, idx) => (
                            <span key={idx} className={`px-3 py-1.5 border text-[#475569] text-xs font-semibold rounded-full ${theme.soft}`}>
                              {achievement}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">&nbsp;</span>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div
                      className="mt-auto pt-5 border-t border-slate-100/90 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {member.social.map((s, i) => {
                          const Icon = resolveSocialIcon(s.icon);
                          return (
                            <a
                              key={i}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={s.platform}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-400 transition-all duration-300 border border-slate-100 hover:-translate-y-0.5 hover:shadow-md hover:text-white"
                              style={{ ['--hover-bg' as string]: accentColor }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accentColor; e.currentTarget.style.borderColor = accentColor; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = ''; }}
                            >
                              <Icon className="text-base" />
                            </a>
                          );
                        })}
                      </div>

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className={`px-5 h-10 flex items-center justify-center gap-1.5 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md font-bold text-[11px] uppercase tracking-wider sm:ml-auto`}
                          style={{ backgroundColor: accentColor }}
                        >
                          <LuMail className="text-base" /> Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Member Detail Modal */}
      <AnimatePresence>
        {showModal && modalMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeMemberModal}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 md:p-8"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="rounded-full p-[6px] bg-gradient-to-tr from-[#07051D] via-amber-400 to-[#F49B21] shadow-xl">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white border-[4px] border-white">
                        <img src={modalMember.avatar} alt={modalMember.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#F49B21] border-2 border-white shadow-md" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#07051D]">{modalMember.name}</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">{modalMember.role}</p>
                    {modalMember.location && <p className="text-sm text-slate-400 mt-1">{modalMember.location}</p>}
                  </div>
                </div>

                <button onClick={closeMemberModal} className="text-slate-500 hover:text-slate-700 text-xl">✕</button>
              </div>

              <div className="mt-4 text-slate-700">
                <p className="leading-relaxed">{modalMember.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {modalMember.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-md text-sm border border-slate-100">{s}</span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {modalMember.email && (
                    <a href={`mailto:${modalMember.email}`} className="px-4 py-2 bg-[#07051D] text-white rounded-md">Contact</a>
                  )}
                  <div className="flex gap-2">
                    {modalMember.social.map((s, i) => {
                      const Icon = resolveSocialIcon(s.icon);
                      return (
                        <a key={i} href={s.url} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-slate-50 border border-slate-100 text-slate-700">
                          <Icon />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;