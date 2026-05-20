import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
// Assuming Button is in the same directory
import Button from './Button'; 

interface SubLink {
    name: string;
    to: string;
}

interface NavLink {
    name: string;
    to: string;
    subLinks?: SubLink[];
}

const navLinks: NavLink[] = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    {
        name: 'Services',
        to: '/services',
        subLinks: [
            { name: 'Software Development', to: '/services/software' },
            { name: 'Web Development', to: '/services/web' },
            { name: 'Mobile App Development', to: '/services/mobile' },
            { name: 'AI/ML & Gaming', to: '/services/gaming' },
            { name: 'Cyber Security', to: '/services/security' },
            { name: 'Remote IT Resources', to: '/services/resources' },
            { name: 'UI/UX Design', to: '/services/ui-ux' },
            { name: 'Graphic Design', to: '/services/graphic-design' },
            { name: 'Digital Marketing', to: '/services/marketing' },
        ]
    },
    { name: 'Projects', to: '/projects' },
    {
        name: 'Apply Now',
        to: '#',
        subLinks: [
            { name: 'Project Training', to: '/apply/projects' },
            { name: 'Apply for Internship', to: '/apply/internship' },
            { name: 'Job Board', to: '/apply/jobs' },
        ]
    },
    { name: 'Team', to: '/team' },
    { name: 'Blogs', to: '/blog' },
    { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHover, setActiveHover] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // 1. Handle Scroll Effects
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // 3. Reset states on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
        setActiveHover(null);
    }, [location.pathname]);

    const handleLinkClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                scrolled 
                    ? 'py-2 bg-[#08061E]/90 backdrop-blur-xl shadow-2xl border-b border-white/10' 
                    : 'py-4 bg-[#08061E] border-b border-transparent'
            }`}
        >
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
                
                {/* Logo */}
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
                    aria-label="CodesThinker Home"
                >
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src="https://codesthinker.com/companylogo.png"
                        alt="CodesThinker Logo"
                        className="h-10 sm:h-12 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <div 
                        className="flex items-center p-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
                        onMouseLeave={() => setActiveHover(null)}
                    >
                        {navLinks.map((link) => {
                            const isCurrentPath = isActive(link.to) || (link.subLinks?.some(s => isActive(s.to)));
                            
                            return (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setActiveHover(link.name)}
                                >
                                    {/* Sliding Hover Indicator */}
                                    {activeHover === link.name && (
                                        <motion.div
                                            layoutId="nav-hover"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}

                                    {link.subLinks ? (
                                        <div className="group">
                                            <button 
                                                className={`px-4 py-2 text-[13px] font-medium transition-colors flex items-center gap-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                                                ${isCurrentPath ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                                            >
                                                {link.name}
                                                <HiChevronDown className={`text-xs transition-transform duration-300 ${activeHover === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <AnimatePresence>
                                                {activeHover === link.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#0C0A20] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl
                                                        ${link.name === 'Services' ? 'w-[480px] grid grid-cols-2 gap-1' : 'w-52 flex flex-col'}`}
                                                    >
                                                        {link.subLinks.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.to}
                                                                onClick={handleLinkClick}
                                                                className={`px-4 py-2.5 rounded-xl text-sm transition-all
                                                                ${isActive(sub.to) ? 'bg-amber-500/10 text-amber-400 font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.to}
                                            onClick={handleLinkClick}
                                            className={`block px-4 py-2 text-[13px] font-medium transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                                            ${isCurrentPath ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop Action & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <Link to="/contact" onClick={handleLinkClick} className="hidden sm:block">
                        <button className="px-6 py-2.5 rounded-full bg-white text-[#08061E] text-[13px] font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
                            Get in Touch
                        </button>
                    </Link>

                    <button
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle Menu"
                        className="lg:hidden p-2.5 text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <HiX size={22} /> : <HiOutlineMenu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-[#08061E] border-t border-white/10 h-[calc(100vh-100%)] overflow-y-auto px-4 py-6 flex flex-col gap-3"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.subLinks ? (
                                    <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
                                        <button
                                            onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                                            className="flex items-center justify-between w-full p-4 text-left font-semibold text-white"
                                        >
                                            {link.name}
                                            <HiChevronDown className={`transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180 text-amber-400' : 'text-zinc-500'}`} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {openMobileDropdown === link.name && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex flex-col px-4 pb-4 gap-1">
                                                        {link.subLinks.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.to}
                                                                onClick={handleLinkClick}
                                                                className={`p-3 text-sm rounded-xl ${isActive(sub.to) ? 'bg-amber-500/10 text-amber-400' : 'text-zinc-400'}`}
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        to={link.to}
                                        onClick={handleLinkClick}
                                        className={`block p-4 rounded-2xl font-semibold transition-colors
                                        ${isActive(link.to) ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-white/[0.02] text-white border border-white/5'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        
                        <div className="mt-4 mb-20">
                            <Button
                                text="Get In Touch"
                                to="/contact"
                                className="w-full justify-center bg-white text-[#08061E] font-bold py-4 rounded-2xl shadow-xl"
                                onClick={handleLinkClick}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;