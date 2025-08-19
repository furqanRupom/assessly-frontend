// src/pages/NotFound.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Home, Search } from 'lucide-react';

const NotFound = () => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-white text-primary-600 min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl w-full text-center"
                >
                    {/* Icon */}
                    <motion.div variants={item}>
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-primary-100 rounded-full opacity-40 blur-lg"></div>
                            <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-primary-400 shadow-md">
                                <AlertTriangle className="w-12 h-12 text-primary-600" strokeWidth={1.5} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold mb-6">
                        404
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2 variants={item} className="text-2xl md:text-3xl font-semibold mb-6">
                        Page Not Found
                    </motion.h2>

                    {/* Description */}
                    <motion.p variants={item} className="text-lg text-primary-400 mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                    </motion.p>

                    {/* Actions */}
                    <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/"
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center shadow-sm"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go Home
                        </Link>
                        <Link
                            to="/assessments"
                            className="px-6 py-3 border border-primary-300 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center shadow-sm"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Browse Assessments
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring' }}
                        className="absolute left-10 bottom-20 w-16 h-16 rounded-full bg-primary-100 opacity-40 -z-10"
                    ></motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: 'spring' }}
                        className="absolute right-10 top-20 w-24 h-24 rounded-full bg-primary-100 opacity-40 -z-10"
                    ></motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: 'spring' }}
                        className="absolute left-1/4 top-1/3 w-20 h-20 rounded-full bg-primary-100 opacity-40 -z-10"
                    ></motion.div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-primary-50 py-6 border-t border-primary-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-primary-400 text-sm">
                    <p>© {new Date().getFullYear()} Assessly. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default NotFound;