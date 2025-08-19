// src/components/Footer.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const footerLinks = [
        {
            title: "Quick Links",
            links: [
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Assessments", path: "/assessments" },
                { name: "Contact", path: "/contact" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", path: "/blog" },
                { name: "FAQ", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" }
            ]
        }
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                                        <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-primary-600">Assessly</span>
                            </Link>
                        </motion.div>
                        <p className="text-gray-600">
                            The premier digital competency assessment platform for professionals and organizations.
                        </p>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h3>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <motion.li key={link.path} whileHover={{ x: 5 }}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-primary-600 mr-2"></span>
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                        <address className="not-italic text-gray-600 space-y-3">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                                <p>123 Assessment Lane<br />San Francisco, CA 94107</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                                <a href="mailto:hello@assessly.com" className="hover:text-primary-600 transition-colors">
                                    hello@assessly.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                                <a href="tel:+14155550199" className="hover:text-primary-600 transition-colors">
                                    (415) 555-0199
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border-t border-gray-200 my-8"
                ></motion.div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Assessly. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <motion.a
                            href="#"
                            className="text-gray-500 hover:text-primary-600 transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-gray-500 hover:text-primary-600 transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-5 w-5" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;