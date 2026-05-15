import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { HiOutlineMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    {
        name: 'Services',
        to: '#',
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
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
        setActiveDropdown(null);
    }, [location]);

    const handleLinkClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
        setActiveDropdown(null);
    }, []);

    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 
            ${scrolled 
                ? 'py-2 md:py-3 bg-[#07051d]/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
                : 'py-3 md:py-3 bg-[#07051d] border-b border-white/5'}`}>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                
                {/* Logo Section - Left */}
                <Link 
                    to="/" 
                    onClick={handleLinkClick} 
                    className="flex items-center group flex-shrink-0"
                    aria-label="Home"
                >
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        src="https://codesthinker.com/companylogo.png"
                        alt="CodesThinker Logo"
                        className="h-10 sm:h-12 w-auto"
                        loading="eager"
                    />
                </Link>

                {/* Desktop Menu - Centered */}
                <div className="hidden lg:flex items-center justify-center flex-1">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1 backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {link.subLinks ? (
                                    <button
                                        className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 rounded-full whitespace-nowrap cursor-pointer
                                        ${activeDropdown === link.name || link.subLinks.some(s => isActive(s.to)) 
                                            ? 'text-white bg-white/10' 
                                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                                        aria-expanded={activeDropdown === link.name}
                                        aria-haspopup="true"
                                    >
                                        {link.name}
                                        <HiChevronDown className={`transition-transform duration-300 text-xs ${activeDropdown === link.name ? 'rotate-180 text-amber-400' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        to={link.to}
                                        onClick={handleLinkClick}
                                        className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 block rounded-full whitespace-nowrap
                                        ${isActive(link.to) 
                                            ? 'text-amber-400 bg-white/10' 
                                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence mode="wait">
                                    {link.subLinks && activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute top-full left-0 mt-2 bg-[#0a0826] border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-sm
                                            ${link.name === 'Services' ? 'w-[480px] grid grid-cols-2 gap-1' : 'w-56 flex flex-col'}`}
                                        >
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.to}
                                                    onClick={handleLinkClick}
                                                    className={`group px-3 py-2.5 rounded-xl transition-all duration-200
                                                    ${isActive(sub.to) 
                                                        ? 'bg-amber-500/10 text-amber-400' 
                                                        : 'hover:bg-white/5 text-white/80 hover:text-white'}`}
                                                >
                                                    <span className="text-sm font-medium">
                                                        {sub.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button - Right */}
                <div className="hidden lg:block flex-shrink-0">
                    <Button
                        text="GET IN TOUCH"
                        to="/contact"
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 text-[#07051d] hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 font-semibold"
                    />
                </div>

                {/* Mobile Toggle */}
                <button
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden text-white p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <HiX size={22} /> : <HiOutlineMenu size={22} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="lg:hidden fixed inset-0 top-[70px] bg-[#07051d]/95 backdrop-blur-xl p-6 overflow-y-auto z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.name} className="border-b border-white/5 last:border-0">
                                    {link.subLinks ? (
                                        <>
                                            <button
                                                onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                                                className="w-full flex justify-between items-center text-white font-semibold py-4 hover:text-amber-400 transition-colors duration-200"
                                                aria-expanded={openMobileDropdown === link.name}
                                            >
                                                <span className={openMobileDropdown === link.name ? "text-amber-400" : ""}>
                                                    {link.name}
                                                </span>
                                                <HiChevronDown 
                                                    className={`transition-all duration-300 text-lg ${openMobileDropdown === link.name ? 'rotate-180 text-amber-400' : ''}`} 
                                                />
                                            </button>
                                            <AnimatePresence mode="wait">
                                                {openMobileDropdown === link.name && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-4 pb-3 space-y-1">
                                                            {link.subLinks.map((sub) => (
                                                                <Link 
                                                                    key={sub.name} 
                                                                    to={sub.to} 
                                                                    onClick={handleLinkClick}
                                                                    className={`block py-2.5 text-sm transition-colors duration-200
                                                                    ${isActive(sub.to) 
                                                                        ? 'text-amber-400 font-medium' 
                                                                        : 'text-white/60 hover:text-amber-400'}`}
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link 
                                            to={link.to} 
                                            onClick={handleLinkClick}
                                            className={`block py-4 font-semibold transition-colors duration-200
                                            ${isActive(link.to) 
                                                ? 'text-amber-400' 
                                                : 'text-white hover:text-amber-400'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 pb-4">
                                <Button 
                                    text="Get In Touch" 
                                    to="/contact" 
                                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-[#07051d] font-semibold"
                                    onClick={closeMobileMenu}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;