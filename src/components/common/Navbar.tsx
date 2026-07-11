import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiX, HiChevronDown, HiArrowRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button'; 

interface SubLink {
    name: string;
    to: string;
    desc?: string;
}

interface NavCategory {
    title: string;
    items: SubLink[];
}

interface NavLink {
    name: string;
    to: string;
    subLinks?: SubLink[];
    megaMenu?: NavCategory[];
}

const navLinks: NavLink[] = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    {
        name: 'Services',
        to: '/services',
        megaMenu: [
            {
                title: 'Engineering & Dev',
                items: [
                    { name: 'Software Development', to: '/services/software', desc: 'Custom software tailored to your specific business needs.' },
                    { name: 'Web Development', to: '/services/web', desc: 'Modern, scalable, and high-performance web applications.' },
                    { name: 'Mobile App Dev', to: '/services/mobile', desc: 'Native and cross-platform mobile experiences.' },
                    { name: 'WordPress Dev', to: '/services/wordpress', desc: 'Custom themes, plugins, and CMS solutions.' },
                    { name: 'Shopify Dev', to: '/services/shopify', desc: 'High-converting custom e-commerce stores.' },
                    { name: 'eBay Integration', to: '/services/ebay', desc: 'Professional eBay store setup and product syncing.' },
                    { name: 'Blockchain Dev', to: '/services/blockchain', desc: 'Secure decentralized apps and smart contracts.' },
                ]
            },
            {
                title: 'AI & Data',
                items: [
                    { name: 'AI/ML & Gaming', to: '/services/gaming', desc: 'Intelligent automation and immersive game development.' },
                    { name: 'Data Analytics', to: '/services/data-analytics', desc: 'Actionable insights from your complex data sets.' },
                ]
            },
            {
                title: 'Design & Marketing',
                items: [
                    { name: 'UI/UX Design', to: '/services/ui-ux', desc: 'Intuitive, user-centric interface design.' },
                    { name: 'Graphic Design', to: '/services/graphic-design', desc: 'Visually stunning branding and digital assets.' },
                    { name: 'Digital Marketing', to: '/services/marketing', desc: 'SEO, social media, and targeted campaign strategies.' },
                ]
            },
            {
                title: 'Security & IT',
                items: [
                    { name: 'Cyber Security', to: '/services/security', desc: 'Robust protection against digital threats.' },
                    { name: 'Remote IT Resources', to: '/services/resources', desc: 'Dedicated tech talent augmenting your team.' },
                ]
            }
        ]
    },
    { name: 'Projects', to: '/projects' },
    {
        name: 'Apply Now',
        to: '#',
        megaMenu: [
            {
                title: 'Careers',
                items: [
                    { name: 'Apply for Internship', to: '/apply/internship', desc: 'Kickstart your career with our hands-on programs.' },
                    { name: 'Apply For Job', to: '/apply/job', desc: 'Join our team of expert engineers and designers.' },
                ]
            },
            {
                title: 'Client Engagement',
                items: [
                    { name: 'Get Our Services', to: '/apply/get-services', desc: 'Hire us to build your next breakthrough product.' },
                ]
            }
        ]
    },
    { name: 'Team', to: '/team' },
    { name: 'Blogs', to: '/blog' },
    { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHover, setActiveHover] = useState<string | null>(null);
    const [activeMegaCategory, setActiveMegaCategory] = useState<number>(0);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
        setActiveHover(null);
        setActiveMegaCategory(0);
    }, [location.pathname]);

    const handleLinkClick = useCallback((e?: React.MouseEvent) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    // Check if current page starts with a white/light background
    const isLightHeroPage = ['/projects'].some(path => location.pathname.startsWith(path));

    // Active dropdowns force a white navbar -> dark links.
    // Scrolled forces a dark navy navbar -> white links.
    // Otherwise (at top), depend on whether the page has a light or dark hero.
    const useWhiteLinks = activeHover ? false : (scrolled ? true : !isLightHeroPage);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                activeHover
                    ? 'py-4 bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-sm'
                    : scrolled 
                        ? 'py-2 bg-[#08061E]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(8,6,30,0.15)] border-b border-transparent' 
                        : 'py-4 bg-transparent border-b border-transparent'
            }`}
        >
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
                
                {/* Logo */}
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl transition-all duration-300"
                >
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src={useWhiteLinks ? "https://codesthinker.com/companylogo.png" : "/logo-blue.png"}
                        alt="CodesThinker Logo"
                        className="h-7 sm:h-9 w-auto object-contain transition-all duration-300"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex flex-1 justify-center relative">
                    <div 
                        className={`flex items-center p-1.5 rounded-full border shadow-sm transition-colors duration-300 ${
                            useWhiteLinks ? 'border-white/10 bg-white/5 backdrop-blur-md' : 'border-gray-200/60 bg-gray-50/50 backdrop-blur-md'
                        }`}
                        onMouseLeave={() => setActiveHover(null)}
                    >
                        {navLinks.map((link) => {
                            const isCurrentPath = isActive(link.to) || 
                                (link.subLinks?.some(s => isActive(s.to))) || 
                                (link.megaMenu?.some(cat => cat.items.some(i => isActive(i.to))));
                            
                            // Determine text colors based on scroll/hover state
                            const linkColorClass = isCurrentPath
                                ? (useWhiteLinks ? 'text-amber-500' : 'text-[#08061E]')
                                : (useWhiteLinks ? 'text-white/70 hover:text-white' : 'text-[#08061E]/60 hover:text-[#08061E]');

                            return (
                                <div
                                    key={link.name}
                                    className={link.megaMenu ? "static" : "relative"}
                                    onMouseEnter={() => {
                                        setActiveHover(link.name);
                                        if (link.megaMenu) setActiveMegaCategory(0);
                                    }}
                                >
                                    {/* Sliding Hover Indicator */}
                                    {activeHover === link.name && (
                                        <motion.div
                                            layoutId="nav-hover"
                                            className="absolute inset-0 bg-[#08061E]/5 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}

                                    {(link.subLinks || link.megaMenu) ? (
                                        <div className="group static">
                                            <button 
                                                className={`px-4 py-2 text-[13px] font-semibold transition-colors flex items-center gap-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#08061E] ${linkColorClass}`}
                                            >
                                                {link.name}
                                                <HiChevronDown className={`text-xs transition-transform duration-300 ${activeHover === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Standard Dropdown Menu logic */}
                                            <AnimatePresence>
                                                {activeHover === link.name && !link.megaMenu && link.subLinks && (
                                                    /* STANDARD DROPDOWN */
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-white border border-gray-100 p-2 shadow-xl backdrop-blur-xl w-52 flex flex-col rounded-2xl z-[110]"
                                                    >
                                                        {link.subLinks.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.to}
                                                                onClick={handleLinkClick}
                                                                className={`px-4 py-2.5 text-sm transition-all rounded-xl font-medium
                                                                ${isActive(sub.to) ? 'bg-[#08061E]/5 text-[#08061E]' : 'text-[#08061E]/70 hover:bg-gray-50 hover:text-[#08061E]'}`}
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
                                            className={`block px-4 py-2 text-[13px] font-semibold transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#08061E] ${linkColorClass}`}
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
                    <Link 
                        to="/contact" 
                        onClick={handleLinkClick} 
                        className={`hidden sm:flex items-center justify-center px-6 py-2.5 text-[13px] font-bold transition-all active:scale-95 shadow-md rounded-2xl border select-none ${
                            useWhiteLinks
                                ? 'bg-white text-[#08061E] border-white hover:bg-amber-500 hover:text-white hover:border-amber-500 shadow-white/10'
                                : 'bg-white text-[#08061E] border-gray-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 shadow-sm'
                        }`}
                    >
                        Get in Touch
                    </Link>

                    <button
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle Menu"
                        className={`lg:hidden p-2.5 transition-colors rounded-lg border ${
                            useWhiteLinks
                                ? 'text-white bg-white/5 hover:bg-white/10 border-white/10'
                                : 'text-[#08061E] bg-gray-50 hover:bg-gray-100 border-gray-200'
                        }`}
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
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 h-[calc(100vh-100%)] overflow-y-auto px-4 py-6 flex flex-col gap-3 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {(link.subLinks || link.megaMenu) ? (
                                    <div className="bg-gray-50 border border-gray-100 overflow-hidden rounded-xl">
                                        <button
                                            onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                                            className="flex items-center justify-between w-full p-4 text-left font-bold text-[#08061E]"
                                        >
                                            {link.name}
                                            <HiChevronDown className={`transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180 text-[#08061E]' : 'text-gray-400'}`} />
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
                                                        {link.megaMenu ? (
                                                            link.megaMenu.map(cat => (
                                                                <div key={cat.title} className="mb-3">
                                                                    <h5 className="text-[#08061E]/50 text-xs font-bold uppercase tracking-wider mb-2 px-3">{cat.title}</h5>
                                                                    {cat.items.map(sub => (
                                                                        <Link
                                                                            key={sub.name}
                                                                            to={sub.to}
                                                                            onClick={handleLinkClick}
                                                                            className={`block p-3 text-sm rounded-lg font-medium ${isActive(sub.to) ? 'bg-[#08061E]/5 text-[#08061E]' : 'text-[#08061E]/70'}`}
                                                                        >
                                                                            {sub.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            link.subLinks!.map((sub) => (
                                                                <Link
                                                                    key={sub.name}
                                                                    to={sub.to}
                                                                    onClick={handleLinkClick}
                                                                    className={`block p-3 text-sm rounded-lg font-medium ${isActive(sub.to) ? 'bg-[#08061E]/5 text-[#08061E]' : 'text-[#08061E]/70'}`}
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        to={link.to}
                                        onClick={handleLinkClick}
                                        className={`block p-4 font-bold transition-colors rounded-xl
                                        ${isActive(link.to) ? 'bg-[#08061E]/5 text-[#08061E] border border-[#08061E]/10' : 'bg-gray-50 text-[#08061E]/80 border border-transparent hover:border-gray-200'}`}
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
                                className="w-full justify-center bg-[#08061E] text-white font-bold py-4 shadow-xl rounded-2xl"
                                onClick={handleLinkClick}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {activeHover && navLinks.find(l => l.name === activeHover)?.megaMenu && (
                    <motion.div
                        onMouseEnter={() => setActiveHover(activeHover)}
                        onMouseLeave={() => setActiveHover(null)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[70px] lg:top-[80px] left-0 w-screen bg-white border-b border-gray-200 shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        <div className="container mx-auto max-w-[1440px] flex shadow-[inset_0_10px_20px_rgba(0,0,0,0.02)]">
                            {/* Left: Categories */}
                            <div className="w-1/4 border-r border-gray-100 py-8 px-6 bg-gray-50/50">
                                <ul className="flex flex-col gap-2">
                                    {navLinks.find(l => l.name === activeHover)!.megaMenu!.map((cat, idx) => (
                                        <li key={idx}>
                                            <button
                                                onMouseEnter={() => setActiveMegaCategory(idx)}
                                                className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all duration-300 border-l-2 rounded-r-xl
                                                    ${activeMegaCategory === idx ? 'bg-white text-[#08061E] font-bold border-[#08061E] shadow-sm' : 'text-[#08061E]/60 hover:text-[#08061E] hover:bg-gray-100/50 border-transparent'}`}
                                            >
                                                {cat.title}
                                                {activeMegaCategory === idx && <HiArrowRight className="text-[#08061E]" />}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Middle: Services Grid */}
                            <div className="w-2/4 py-8 px-10 bg-white">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {navLinks.find(l => l.name === activeHover)!.megaMenu![activeMegaCategory].items.map((sub, sIdx) => (
                                        <Link
                                            key={sIdx}
                                            to={sub.to}
                                            onClick={handleLinkClick}
                                            className="group flex flex-col gap-1 p-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 rounded-xl"
                                        >
                                            <span className="text-[#08061E] font-bold flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {sub.name}
                                            </span>
                                            {sub.desc && (
                                                <span className="text-[#08061E]/60 text-xs leading-relaxed group-hover:text-[#08061E]/80 transition-colors">
                                                    {sub.desc}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Link to="/services" onClick={handleLinkClick} className="text-[#08061E] hover:text-amber-500 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                        View all {navLinks.find(l => l.name === activeHover)!.megaMenu![activeMegaCategory].title} services <HiArrowRight />
                                    </Link>
                                </div>
                            </div>
 
                            {/* Right: Spotlight */}
                            <div className="w-1/4 bg-gradient-to-br from-gray-50 to-white py-8 px-8 border-l border-gray-100 flex flex-col">
                                <span className="text-xs font-bold tracking-widest text-[#08061E]/40 uppercase mb-4">Spotlight</span>
                                <div className="flex-1 overflow-hidden relative group cursor-pointer border border-gray-200 rounded-2xl shadow-sm">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Spotlight" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#08061E]/80 to-[#1a1440]/90 z-0" />
                                    <div className="relative h-full p-6 flex flex-col justify-end z-10">
                                        <h4 className="text-white font-bold text-lg mb-2">Digital Transformation</h4>
                                        <p className="text-white/80 text-xs mb-4">Strategies for scaling your business in the modern digital era.</p>
                                        <span className="text-amber-400 group-hover:text-amber-300 transition-colors text-xs font-bold flex items-center gap-1">Read Guide <HiArrowRight /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
