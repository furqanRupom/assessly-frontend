// src/components/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LayoutDashboard } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { Button } from '@/components/ui/button';
import PrimaryButton from './button/PrimaryButton';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const user = useUser();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Assessments', path: '/assessments' },
    ];

    const isActiveLink = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                        : 'bg-white/90 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Original Logo - Unchanged */}
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                                        <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-primary-600 tracking-tight">Assessly</span>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-6 py-2 rounded-lg text-md font-medium transition-all duration-200 ${isActiveLink(link.path)
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                    {isActiveLink(link.path) && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side - Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-2 h-9"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                            <User className="w-4 h-4 text-primary-600" />
                                        </div>
                                        <motion.div
                                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.div>
                                    </Button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                                            >
                                                <Link
                                                    to={`/${user.role}/dashboard`}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Dashboard
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Button variant="ghost" asChild>
                                        <Link to="/login">Sign in</Link>
                                    </Button>
                                    <PrimaryButton link='/register'>Get Started</PrimaryButton>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Side Panel */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-sm bg-white shadow-2xl z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white">
                                                <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-bold text-gray-900">Menu</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <X className="w-10 h-10" />
                                    </Button>
                                </div>

                                {/* Mobile Menu Content */}
                                <div className="flex-1 px-6 py-4">
                                    <nav className="space-y-2">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.path}
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    to={link.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${isActiveLink(link.path)
                                                            ? 'bg-primary-50 text-primary-600 border border-primary-200'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>

                                    {/* Mobile User Actions */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        {user ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                                        <User className="w-5 h-5 text-primary-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Account</div>
                                                    </div>
                                                </div>
                                                <Button asChild className="w-full">
                                                    <Link
                                                        to={`/${user.role}/dashboard`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center justify-center"
                                                    >
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        Dashboard
                                                    </Link>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <Button variant="outline" asChild className="w-full">
                                                    <Link
                                                        to="/login"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        Sign in
                                                    </Link>
                                                </Button>
                                                <PrimaryButton className='w-full' link="/register">Get Started</PrimaryButton>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;