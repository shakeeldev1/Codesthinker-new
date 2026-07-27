import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion, useSpring,
  AnimatePresence, useMotionValue, useTransform, useScroll
} from 'framer-motion';
import { allProjects } from './ProjectsData';
import { ArrowUpRight, ExternalLink, Grid3X3, List, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────── CONSTANTS ──────────────────────────────── */
const DARK  = '#07051D';
const AMBER = '#F49B21';

const CAT_COLOR: Record<string, string> = {
  'Website Development': '#3B82F6',
  'UI/UX':              '#8B5CF6',
  'App':                '#10B981',
  'WordPress':          '#F59E0B',
  'SEO':                '#EF4444',
};

const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

/* ─────────────────── CUSTOM CURSOR ─────────────────────────── */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 20, stiffness: 200 });
  const sy = useSpring(y, { damping: 20, stiffness: 200 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="view"]')) setLabel('VIEW');
      else if (t.closest('[data-cursor="drag"]')) setLabel('DRAG');
      else setLabel('');
    };
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, [x, y]);

  const active = label !== '';

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full font-black text-[9px] uppercase tracking-widest"
      style={{
        x: sx, y: sy,
        translateX: '-50%', translateY: '-50%',
        width: active ? 80 : 10,
        height: active ? 80 : 10,
        backgroundColor: active ? AMBER : 'rgba(255,255,255,0.8)',
        color: DARK,
        mixBlendMode: active ? 'normal' : 'difference',
        transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
      }}
    >
      {active && label}
    </motion.div>
  );
}

/* ─────────────────── MARQUEE ────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap py-3 border-y border-white/10">
      <motion.div
        className="inline-flex gap-10"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((name, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/30">
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: AMBER }} />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────── HORIZONTAL SCROLL SHOWCASE ─────────────── */
function HorizontalShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const track     = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Recalculate outer container height whenever track width changes
  const recalc = useCallback(() => {
    if (!track.current) return;
    const tw  = track.current.scrollWidth;
    const vw  = window.innerWidth;
    const currentVh = window.innerHeight;
    setVh(currentVh);
    
    // Calculate the actual scrollable range to scroll exactly to the end
    const scrollRange = Math.max(0, tw - vw);
    setRange(scrollRange);
  }, []);

  useEffect(() => {
    if (!track.current) return;
    recalc();

    const ro = new ResizeObserver(() => requestAnimationFrame(recalc));
    ro.observe(track.current);
    const imgs = track.current.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('load', recalc));
    window.addEventListener('resize', recalc);
    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener('load', recalc));
      window.removeEventListener('resize', recalc);
    };
  }, [recalc]);

  // Map progress (0 to 1) to horizontal translation [0, -range]
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const x = useSpring(xTransform, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Map progress to width and opacity
  const progressWidth   = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const progressOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const featured = allProjects.slice(0, 7);

  return (
    <div ref={container} className="relative w-full" style={{ height: range > 0 ? `${range + vh}px` : 'auto', backgroundColor: DARK }}>
      {/* Sticky viewport — fills exactly 100vh, no more, no less */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: DARK }}>

        {/* Label */}
        <div className="flex items-center justify-between px-10 pt-16 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: AMBER }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">Explore Projects</span>
          </div>
          <span className="text-[10px] font-mono text-white/20">
            {featured.length} Featured / Scroll Down
          </span>
        </div>

        {/* Track — overflow-hidden on THIS div, not sticky parent */}
        <div className="flex-1 overflow-hidden" data-cursor="drag">
          <div className="h-full flex items-center">
            <motion.div ref={track} className="flex gap-6 pl-10 shrink-0" style={{ x }}>
              {featured.map((proj, i) => {
                const isLive = proj.link && proj.link !== '#';
                const accent = CAT_COLOR[proj.category] ?? AMBER;
                return (
                  <ShowcaseSlide key={`${proj.id}-${i}`} proj={proj} index={i} accent={accent} isLive={!!isLive} />
                );
              })}
              <div className="w-20 shrink-0" />
            </motion.div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="px-10 pb-6 shrink-0">
          <div className="w-full h-px bg-white/8 relative">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ width: progressWidth, backgroundColor: AMBER }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[9px] text-white/20 uppercase tracking-widest">Scroll to explore</span>
            <motion.span
              className="text-[9px] font-mono text-white/25"
              style={{ opacity: progressOpacity }}
            >
              Progress
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── SHOWCASE SLIDE ─────────────────────────── */
function ShowcaseSlide({ proj, index, accent, isLive }: {
  proj: typeof allProjects[0]; index: number; accent: string; isLive: boolean;
}) {
  const [thumb, setThumb]   = useState(proj.featured);
  const [hovered, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeHover = hovered || isMobile;

  return (
    <motion.div
      data-cursor="view"
      className={`relative shrink-0 overflow-hidden rounded-2xl cursor-none select-none group aspect-[16/10] ${
        index === 0 ? 'w-[85vw] md:w-[70vw] lg:w-[55vw]' : 'w-[75vw] md:w-[55vw] lg:w-[38vw]'
      }`}
      style={{
        border: `1px solid ${activeHover ? `${accent}50` : 'rgba(255,255,255,0.05)'}`,
        boxShadow: activeHover ? `0 30px 80px -20px ${accent}30` : 'none',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setThumb(proj.featured); }}
    >
      {/* Image */}
      <img
        src={thumb}
        alt={proj.title}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ transform: activeHover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s ease' }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, transparent 30%, ${DARK}e0 100%)`,
          opacity: activeHover ? 1 : 0.8,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Accent left bar */}
      <div
        className="absolute left-0 top-0 w-1 rounded-r-full"
        style={{
          height: activeHover ? '100%' : '30%',
          backgroundColor: accent,
          opacity: 0.7,
          transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Large index number */}
      <div
        className="absolute top-4 right-4 md:top-5 md:right-5 font-black leading-none pointer-events-none select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px ${activeHover ? accent : 'rgba(255,255,255,0.08)'}`,
          transition: 'WebkitTextStroke 0.4s',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Category pill */}
      <div
        className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[9px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: accent }}
      >
        {proj.category}
      </div>

      {/* Live badge */}
      {isLive && (
        <div className="absolute top-4 left-4 md:top-5 md:left-5 mt-7 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/80 text-white text-[8px] font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />LIVE
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-6">
        {/* Thumbnail strip */}
        <AnimatePresence>
          {activeHover && proj.thumbnails?.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex gap-1.5 mb-3 md:mb-4"
            >
              {proj.thumbnails.slice(0, 4).map((t, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setThumb(t)}
                  className="w-8 h-5 sm:w-9 sm:h-6 rounded overflow-hidden border-2 cursor-pointer shrink-0 transition-all"
                  style={{ borderColor: thumb === t ? AMBER : 'rgba(255,255,255,0.3)' }}
                >
                  <img src={t} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <h3
          className="font-black text-white leading-tight mb-1.5 md:mb-2 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          {proj.title}
        </h3>

        <AnimatePresence>
          {activeHover && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between"
            >
              <p className="text-[10px] sm:text-[11px] text-white/50 line-clamp-1 flex-1 pr-4">{proj.description}</p>
              {isLive && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[#07051D] font-bold text-[10px] md:text-xs shrink-0 transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: AMBER }}
                >
                  <ExternalLink size={10} /> Visit
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────── GRID CARD ──────────────────────────────── */
function GridCard({ proj, index }: { proj: typeof allProjects[0]; index: number }) {
  const [thumb, setThumb]   = useState(proj.featured);
  const [hovered, setHover] = useState(false);
  const ref      = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accent   = CAT_COLOR[proj.category] ?? AMBER;
  const isLive   = proj.link && proj.link !== '#';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 12) * 0.045, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="view"
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-none"
      style={{
        border: `1.5px solid ${hovered ? `${accent}35` : '#F1F5F9'}`,
        boxShadow: hovered ? `0 20px 50px -12px ${accent}22, 0 4px 16px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'border-color 0.35s, box-shadow 0.35s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setThumb(proj.featured); }}
    >
      {/* Image area */}
      <div className="relative h-[185px] overflow-hidden bg-slate-100">
        <img
          src={thumb}
          alt={proj.title}
          loading="lazy"
          className="w-full h-full object-cover object-top"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.55s ease' }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${DARK}cc, transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.35s' }}
        />

        {/* Category */}
        <div
          className="absolute top-3 left-3 z-10 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ backgroundColor: accent }}
        >
          {proj.category}
        </div>

        {/* Live dot */}
        {isLive && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/85 text-white text-[8px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />LIVE
          </div>
        )}

        {/* Thumb strip */}
        <AnimatePresence>
          {hovered && proj.thumbnails?.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
            >
              {proj.thumbnails.slice(0, 4).map((t, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setThumb(t)}
                  className="w-7 h-5 rounded overflow-hidden border-2 cursor-pointer shrink-0 transition-all"
                  style={{ borderColor: thumb === t ? AMBER : 'rgba(255,255,255,0.5)' }}
                >
                  <img src={t} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visit CTA */}
        <AnimatePresence>
          {hovered && isLive && (
            <motion.a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-5 py-2 rounded-xl text-[#07051D] font-bold text-[11px] shadow-xl"
              style={{ backgroundColor: AMBER }}
            >
              <ExternalLink size={11} /> View Live Site
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex-1">
          <h3
            className="font-bold text-[13px] leading-snug line-clamp-1 mb-1 transition-colors duration-200"
            style={{ color: hovered ? accent : DARK }}
          >
            {proj.title}
          </h3>
          <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">{proj.description}</p>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-gray-200'}`} />
            <span className="text-[9px] text-gray-400 uppercase tracking-wide">{isLive ? 'Live' : 'Private'}</span>
          </div>
          {isLive ? (
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 group/lnk"
              style={{ color: hovered ? accent : '#CBD5E1' }}
            >
              Visit <ArrowUpRight size={11} className="group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-[9px] text-gray-300">Confidential</span>
          )}
        </div>
      </div>

      {/* Accent bottom line */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px] rounded-b-2xl"
        style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.35s' }}
      />
    </motion.div>
  );
}

/* ─────────────────── LIST ROW ───────────────────────────────── */
function ListRow({ proj, index }: { proj: typeof allProjects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accent = CAT_COLOR[proj.category] ?? AMBER;
  const isLive = proj.link && proj.link !== '#';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.025 }}
      className="group flex items-center gap-4 px-5 py-3.5 bg-white rounded-xl border border-gray-100 hover:border-transparent cursor-pointer transition-all duration-250"
      style={{ boxShadow: 'none' }}
      whileHover={{ boxShadow: `0 6px 24px -6px ${accent}28` }}
    >
      <span className="text-[10px] font-mono text-gray-300 group-hover:text-[#F49B21] w-5 text-right shrink-0 transition-colors">{String(index + 1).padStart(2, '0')}</span>
      <div className="w-12 h-9 rounded-lg overflow-hidden border border-gray-100 shrink-0">
        <img src={proj.featured} alt={proj.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#07051D] font-semibold text-sm truncate group-hover:text-[#F49B21] transition-colors">{proj.title}</p>
        <p className="text-gray-400 text-[10px] truncate">{proj.description}</p>
      </div>
      <div className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: accent }}>
        {proj.category}
      </div>
      <div className="hidden sm:flex items-center gap-1 w-14 shrink-0">
        <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-gray-200'}`} />
        <span className="text-[9px] text-gray-400 uppercase tracking-wide">{isLive ? 'Live' : 'Private'}</span>
      </div>
      {isLive ? (
        <a href={proj.link} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-all duration-200"
          style={{ backgroundColor: `${accent}15`, color: accent, border: `1.5px solid ${accent}30` }}>
          <ArrowUpRight size={13} />
        </a>
      ) : (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-[10px] shrink-0">🔒</div>
      )}
    </motion.div>
  );
}

/* ─────────────────── MAIN PAGE ──────────────────────────────── */
export default function ProjectHome() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount]     = useState(12);
  const [view, setView]                     = useState<'grid' | 'list'>('grid');

  const filtered = activeCategory === 'All' ? allProjects : allProjects.filter(p => p.category === activeCategory);
  const visible  = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;

  return (
    <div className="w-full min-h-screen cursor-none" style={{ fontFamily: "'Outfit','Space Grotesk',sans-serif" }}>
      <Cursor />

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: DARK }}>
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`, backgroundSize: '64px 64px' }} />
        {/* Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse, ${AMBER}12 0%, transparent 65%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 pt-36 pb-12">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{ background: `linear-gradient(to right, ${AMBER}, transparent)` }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: AMBER }}>
              Portfolio
            </span>
            <span className="text-[10px] text-white/20">— {allProjects.length} Case Studies</span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.92] tracking-[-0.04em] text-6xl sm:text-7xl md:text-8xl lg:text-[110px]"
            >
              <span className="text-white">We </span>
              <span style={{ color: AMBER }}>Build.</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.92] tracking-[-0.04em] text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-white/15"
            >
              You Succeed.
            </motion.h1>
          </div>

          {/* Desc + stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              Every project below was engineered with purpose. Real clients, real deadlines,
              real results — scroll down to explore.
            </p>
            <div className="flex gap-10 shrink-0">
              {[
                { v: '40+', l: 'Clients' },
                { v: `${allProjects.length}+`, l: 'Projects' },
                { v: '12+', l: 'Countries' },
              ].map(({ v, l }) => (
                <div key={l} className="text-right">
                  <div className="text-3xl font-black text-white">{v}</div>
                  <div className="text-[9px] text-gray-600 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scrolling marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Marquee items={allProjects.slice(0, 15).map(p => p.title)} />
        </motion.div>

        {/* Scroll hint */}
        <div className="flex flex-col items-center gap-2 py-6">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronRight size={16} className="rotate-90 text-white/20" />
          </motion.div>
          <span className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Scroll to explore</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HORIZONTAL SCROLL SHOWCASE
      ════════════════════════════════════════════════════════════ */}
      <HorizontalShowcase />

      {/* ═══════════════════════════════════════════════════════════
          FULL ARCHIVE — Filter + Grid/List
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 pt-14 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-8 bg-gray-300" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-semibold">Full Archive</span>
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] font-mono text-gray-300">{allProjects.length} total</span>
          </div>

          {/* Filter + Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 pb-5 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                const color  = cat === 'All' ? AMBER : (CAT_COLOR[cat] ?? '#6B7280');
                const count  = cat === 'All' ? allProjects.length : allProjects.filter(p => p.category === cat).length;
                return (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => { setActiveCategory(cat); setVisibleCount(12); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border transition-all duration-200 cursor-pointer"
                    style={
                      active
                        ? { backgroundColor: color, color: '#fff', borderColor: color, boxShadow: `0 4px 16px ${color}40` }
                        : { backgroundColor: '#fff', color: '#9CA3AF', borderColor: '#E5E7EB' }
                    }
                  >
                    {cat}
                    <span
                      className="text-[8px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: active ? 'rgba(255,255,255,0.25)' : '#F3F4F6', color: active ? '#fff' : '#9CA3AF' }}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-gray-400 hidden sm:block">
                <b className="text-gray-700">{Math.min(visibleCount, filtered.length)}</b> / {filtered.length}
              </span>
              <div className="flex p-1 bg-white border border-gray-200 rounded-xl gap-0.5">
                {(['grid', 'list'] as const).map(v => (
                  <motion.button
                    key={v}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setView(v)}
                    className="p-1.5 rounded-lg transition-all cursor-pointer"
                    style={view === v ? { backgroundColor: DARK, color: '#fff' } : { color: '#CBD5E1' }}
                  >
                    {v === 'grid' ? <Grid3X3 size={14} /> : <List size={14} />}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid / List */}
          <AnimatePresence mode="popLayout">
            {view === 'grid' ? (
              <motion.div key="grid" layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {visible.map((proj, i) => (
                  <GridCard key={`g-${proj.id}-${proj.title}-${i}`} proj={proj} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" layout className="flex flex-col gap-2">
                {visible.map((proj, i) => (
                  <ListRow key={`l-${proj.id}-${proj.title}-${i}`} proj={proj} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load more */}
          {remaining > 0 && (
            <div className="flex justify-center mt-12">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setVisibleCount(v => v + 12)}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm cursor-pointer shadow-md"
                style={{ backgroundColor: DARK, color: '#fff' }}
              >
                Load {Math.min(12, remaining)} More Projects
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '64px 64px' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${AMBER}0d 0%, transparent 65%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ borderColor: `${AMBER}40`, color: AMBER, backgroundColor: `${AMBER}10` }}>
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: AMBER }} />
            Start a Project
          </div>
          <h2 className="font-black text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Let's build your<br />
            <span style={{ color: AMBER }}>next success story.</span>
          </h2>
          <p className="text-gray-400 text-base max-w-md mx-auto mb-10">
            40+ global clients trusted us to build their digital products. You're next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="relative overflow-hidden group inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg"
              style={{ backgroundColor: AMBER, color: DARK }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
              <ArrowUpRight size={16} className="relative z-10 group-hover:text-white transition-colors duration-300" />
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" style={{ backgroundColor: DARK }} />
            </Link>
            <Link
              to="/services"
              className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-4 rounded-2xl font-bold text-sm border-2 text-white transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="relative z-10 group-hover:text-[#07051D] transition-colors duration-300">Our Services</span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" style={{ backgroundColor: AMBER }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
