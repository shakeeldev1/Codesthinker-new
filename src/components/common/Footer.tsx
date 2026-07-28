import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedinIn, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Services",
            links: [
                { name: 'Software Development', href: '/services/software' },
                { name: 'Web Development', href: '/services/web' },
                { name: 'Mobile Apps', href: '/services/mobile' },
                { name: 'Cyber Security', href: '/services/security' },
                { name: 'UI/UX Design', href: '/services/ui-ux' },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Our Team', href: '/team' },
                { name: 'Latest Blogs', href: '/blog' },
                { name: 'Careers (We\'re Hiring!)', href: '/careers' },
                { name: 'Apply for Internship', href: '/apply/internship' },
                { name: 'Contact Us', href: '/contact' },
            ]
        }
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
        { icon: <FaLinkedinIn />, href: "#" },
    ];

    return (
        <footer className="bg-[#07051d] text-gray-300 pt-16 pb-6 border-t border-gray-800/60 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
                    
                 {/* Brand Section */}
<div className="space-y-6 max-w-md">
    <Link to="/" className="inline-block group">
        <img
            src="https://codesthinker.com/companylogo.png"
            alt="CodesThinker Logo"
            className="h-11 w-auto transition-all duration-300 group-hover:scale-105"
        />
    </Link>

    {/* Description */}
    <div className="relative">
        <div className="absolute -left-3 top-1 h-16 w-1 rounded-full bg-[#F69A20]" />

        <p className="text-sm leading-7 text-gray-400 tracking-wide pl-4">
            <span className="text-white font-semibold">CodesThinker</span> is a
         leading software development company delivering innovative digital solutions that help businesses grow, scale, and succeed through cutting edge technology and expert developmen
        </p>
    </div>

    {/* Social Icons */}
    <div className="flex items-center gap-3 pt-2">
        {socialLinks.map((social, index) => (
            <motion.a
                key={index}
                href={social.href}
                whileHover={{ y: -5, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-gray-400 hover:bg-[#F69A20] hover:text-[#07051d] hover:border-[#F69A20] hover:shadow-[0_0_20px_rgba(246,154,32,0.35)] transition-all duration-300"
            >
                <span className="text-sm">{social.icon}</span>
            </motion.a>
        ))}
    </div>
</div>

                    {/* Dynamic Link Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="space-y-5">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F69A20]" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                    {section.title}
                                </h4>
                            </div>
                            <ul className="space-y-3.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.href} 
                                            className="inline-block text-sm text-gray-400 hover:text-[#F69A20] transition-all duration-300 hover:translate-x-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F69A20]" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                Contact Info
                            </h4>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-[#F69A20] shrink-0">
                                    <FaPhoneAlt className="text-xs" />
                                </div>
                                <a href="tel:+447470103120" className="text-gray-400 group-hover:text-white transition-colors">
                                    +44 7470 103120
                                </a>
                            </div>
                            
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-[#F69A20] shrink-0">
                                    <FaEnvelope className="text-xs" />
                                </div>
                                <a href="mailto:info@codesthinker.com" className="text-gray-400 group-hover:text-white transition-colors">
                                    info@codesthinker.com
                                </a>
                            </div>

                            <div className="flex items-start gap-3 pt-1">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-[#F69A20] shrink-0 mt-0.5">
                                    <FaMapMarkerAlt className="text-xs" />
                                </div>
                                <div className="text-gray-400">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Regional Office</p>
                                    <p className="text-xs leading-relaxed">Bartle House 9 Oxford Court, Manchester M23WQ United Kingdom</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-[#F69A20] shrink-0 mt-0.5">
                                    <FaMapMarkerAlt className="text-xs" />
                                </div>
                                <div className="text-gray-400">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Global Delivery Center</p>
                                    <p className="text-xs leading-relaxed">Hassan Manzil Basement Goheer Town Bahawalpur</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                        &copy; {currentYear} CodesThinker. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-500">
                        <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;