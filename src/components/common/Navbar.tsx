import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Services',
        href: '#',
        subLinks: [
            { name: 'Software Development', href: '/services/software', desc: 'Custom enterprise apps' },
            { name: 'Web Development', href: '/services/web', desc: 'Fast, responsive sites' },
            { name: 'Mobile App Development', href: '/services/mobile', desc: 'iOS & Android' },
            { name: 'AI/ML & Gaming', href: '/services/gaming', desc: 'The future of tech' },
            { name: 'Cyber Security', href: '/services/security', desc: 'Protect your data' },
            { name: 'Remote IT Resources', href: '/services/resources', desc: 'Expert staff' },
            { name: 'UI/UX Design', href: '/services/ui-ux', desc: 'User-first design' },
            { name: 'Graphic Design', href: '/services/graphic-design', desc: 'Brand identity' },
            { name: 'Digital Marketing', href: '/services/marketing', desc: 'Scale your reach' },
        ]
    },
    {
        name: 'Apply Now',
        href: '#',
        subLinks: [
         
            { name: 'Project Training', href: '/apply/projects' },
            { name: 'Apply for Internship', href: '/apply/internship' },
            { name: 'Job Board', href: '/apply/jobs' },
        ]
    },
    { name: 'Team', href: '/team' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
];

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 
            ${scrolled 
                ? 'py-3 bg-[#07051d] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                : 'py-3 bg-[#07051d] border-b border-white/5'}`}>

            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo Section */}
                <Link to="/" className="flex items-center group">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="https://codesthinker.com/companylogo.png"
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                to={link.href}
                                className={`px-5 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 rounded-full
                                ${activeDropdown === link.name ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                            >
                                {link.name}
                                {link.subLinks && (
                                    <HiChevronDown className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-amber-400' : ''}`} />
                                )}
                            </Link>

                            {/* Dropdown Menu - POSITIONED LEFT */}
                            <AnimatePresence>
                                {link.subLinks && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                        // "left-0" aligns to start, "-translate-x-1/2" centers it, 
                                        // but for "Show left side" we use left-0 or right-auto
                                        className={`absolute top-full left-0 mt-3 bg-[#0a0826] border border-white/10 rounded-2xl p-3 shadow-2xl
                                        ${link.name === 'Services' ? 'w-[600px]' : 'w-64'}`}
                                    >
                                        <div className={`grid gap-1 ${link.name === 'Services' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.href}
                                                    className="group flex flex-col p-3 rounded-xl hover:bg-white/5 transition-all"
                                                >
                                                    <span className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                                                        {sub.name}
                                                    </span>
                                                    {sub.desc && (
                                                        <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">
                                                            {sub.desc}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Call to Action Button */}
                <Link to="/contact" className="hidden lg:block">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-[#07051d] rounded-full font-bold shadow-lg shadow-amber-500/20"
                    >
                        GET IN TOUCH
                    </motion.button>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white p-2 bg-white/5 rounded-xl border border-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden bg-[#07051d] border-t border-white/10 overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name} className="border-b border-white/5 last:border-0 pb-2">
                                    <button
                                        onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                                        className="w-full flex justify-between items-center text-white font-semibold py-2"
                                    >
                                        <span className={openMobileDropdown === link.name ? "text-amber-400" : ""}>
                                            {link.name}
                                        </span>
                                        {link.subLinks && (
                                            <HiChevronDown className={`transition-transform ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {link.subLinks && openMobileDropdown === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="pl-4 space-y-1 mt-2 overflow-hidden"
                                            >
                                                {link.subLinks.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.href}
                                                        onClick={closeMobileMenu}
                                                        className="block text-white/50 py-2 hover:text-amber-400 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <Link to="/contact" onClick={closeMobileMenu}>
                                <button className="w-full mt-4 py-2 bg-amber-500 text-[#07051d] rounded-xl font-bold">
                                    GET IN TOUCH
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;