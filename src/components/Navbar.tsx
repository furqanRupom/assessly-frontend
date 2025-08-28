import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Home,
    Info,
    HelpCircle
} from 'lucide-react';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    // Get user profile data
    const { data, isLoading } = useGetUserProfileQuery({});
    const profile = data?.data;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/login");
        dispatch(logout());
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: Info },
        { name: 'How it works', path: '/how-it-works', icon: HelpCircle },
    ];

    const isActiveLink = (path: string) => location.pathname === path;

    const slideIn = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: 'tween' as const,
                duration: 0.3
            }
        }
    };

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.2
            }
        }
    };

    // Skeleton components
    const ProfileSkeleton = () => (
        <div className="flex items-center space-x-2 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="hidden md:block">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
    );

    const NavLinksSkeleton = () => (
        <nav className="hidden md:flex items-center space-x-1">
            {[1, 2, 3].map((item) => (
                <div key={item} className="px-4 py-2 rounded-lg flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
            ))}
        </nav>
    );

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                    : 'bg-white/90 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                                        <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-primary-600">Assessly</span>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        {isLoading ? (
                            <NavLinksSkeleton />
                        ) : (
                            <nav className="hidden md:flex items-center space-x-1">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`relative px-4 py-2 rounded-lg text-md font-medium transition-all duration-200 flex items-center gap-2 ${isActiveLink(link.path)
                                                ? 'text-primary-600 bg-gray-50'
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon size={18} />
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
                                    );
                                })}
                            </nav>
                        )}

                        {/* Right Side - Desktop */}
                        <div className="hidden md:flex items-center space-x-3">
                            {isLoading ? (
                                <ProfileSkeleton />
                            ) : profile ? (
                                <>
                                    {/* User Profile Dropdown */}
                                    <motion.div className="relative">
                                        <button
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">
                                                    {profile.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold text-gray-900">{profile.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{profile.role}</p>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown size={16} className="text-gray-400" />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {dropdownOpen && (
                                                <motion.div
                                                    variants={dropdownVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    className="absolute right-0 mt-2  bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                                                >
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <p className="font-semibold text-gray-900">{profile.name}</p>
                                                        <p className="text-sm text-gray-500">{profile.email}</p>
                                                    </div>

                                                    <Link
                                                        to={`/${profile.role}/dashboard`}
                                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        <LayoutDashboard className="mr-3 h-4 w-4" />
                                                        Dashboard
                                                    </Link>

                                                    <div className="border-t border-gray-100 my-1"></div>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut className="mr-3 h-4 w-4" />
                                                        Sign out
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg">
                                            Sign in
                                        </Link>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <Link to="/register">Get Started</Link>
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
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
                            variants={slideIn}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
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
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>

                                {/* Mobile Menu Content */}
                                <div className="flex-1 px-6 py-4 overflow-y-auto">
                                    <nav className="space-y-2">
                                        {navLinks.map((link, index) => {
                                            const Icon = link.icon;
                                            return (
                                                <motion.div
                                                    key={link.path}
                                                    initial={{ x: 50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        to={link.path}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${isActiveLink(link.path)
                                                            ? 'bg-gray-50 text-primary-600 border border-primary-200'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <Icon size={20} />
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </nav>

                                    {/* Mobile User Actions */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        {isLoading ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                                    <div>
                                                        <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
                                                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                                                    </div>
                                                </div>
                                                <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                                <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                            </div>
                                        ) : profile ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                                        <span className="text-white text-sm font-semibold">
                                                            {profile.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{profile.name}</div>
                                                        <div className="text-sm text-gray-500 capitalize">{profile.role}</div>
                                                    </div>
                                                </div>
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full'>
                                                    <Link
                                                        to={`/${profile.role}/dashboard`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="px-4 py-3 w-full flex items-center justify-center bg-primary-600 text-white font-medium rounded-lg shadow-md"
                                                    >
                                                        <LayoutDashboard className="mr-2 h-5 w-5" />
                                                        Dashboard
                                                    </Link>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                                                >
                                                    <LogOut className="mr-2 h-5 w-5" />
                                                    Sign out
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full'>
                                                    <Link
                                                        to="/login"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        Sign in
                                                    </Link>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-md"
                                                >
                                                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                                        Get Started
                                                    </Link>
                                                </motion.button>
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