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
                { name: 'Latest Blogs', href: '/blogs' },
                { name: 'Apply for Internship', href: '/apply/internship' },
                { name: 'Contact Us', href: '/contact' },
            ]
        }
    ];

    return (
        <footer className="bg-[#07051d] text-white pt-16 pb-2 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img 
                                src="https://codesthinker.com/companylogo.png" 
                                alt="CodesThinker Logo" 
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-white">
                            CodesThinker is a leading software development company dedicated to delivering innovative solutions that empower businesses worldwide. With a focus on quality, creativity, and customer satisfaction, we strive to transform ideas into reality through cutting-edge technology and expert craftsmanship.
                        </p>
                        <div className="flex gap-4">
                            {[<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />].map((icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-[#07051d] transition-all duration-300"
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Link Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-amber-500 pl-3">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.href} 
                                            className="text-white hover:text-amber-400  transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info Section */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-amber-500 pl-3">
                            Contact Info
                        </h4>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 group">
                                <FaPhoneAlt className="text-amber-400 shrink-0" />
                                <a href="tel:+447470103120" className=" text-white group-hover:text-white transition-colors">
                                    +44 7470 103120
                                </a>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <FaEnvelope className="text-amber-400 shrink-0" />
                                <a href="mailto:info@codesthinker.com" className=" text-white group-hover:text-white transition-colors">
                                    info@codesthinker.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                                <div className=" text-white group-hover:text-white transition-colors">
                                    <p className="font-semibold text-amber-400/80 mb-1">Regional Office</p>
                                    <p>Bartle House 9 Oxford Court, Manchester M23WQ United Kingdom</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                                <div className=" text-white group-hover:text-white transition-colors">
                                    <p className="font-semibold text-amber-400/80 mb-1">Global Delivery Center</p>
                                    <p>Hassan Manzil Basement Goheer Town Bahawalpur</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white text-md">
                        © {currentYear} CodesThinker. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-md text-white/">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;