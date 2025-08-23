// src/pages/About.tsx
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, BarChart2, Clock, Award, Users, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () =>  {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={item} className="mb-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium shadow-sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            About Assessly
                        </div>
                    </motion.div>
                    <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Empowering Digital Competency
                    </motion.h1>
                    <motion.p variants={item} className="text-xl text-gray-600 max-w-3xl">
                        Assessly is a comprehensive platform designed to evaluate and certify digital skills across six proficiency levels from A1 to C2.
                    </motion.p>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-50 mt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4 shadow-sm">
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Our Mission
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Bridging the Digital Skills Gap
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                In today's rapidly evolving digital landscape, we recognized the need for a standardized way to measure and validate digital competencies across industries and professions.
                            </p>
                            <p className="text-lg text-gray-600">
                                Assessly was created to provide individuals and organizations with reliable, objective assessments that accurately reflect real-world digital skills.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-start mb-6">
                                    <BarChart2 className="w-10 h-10 text-primary-600 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Scientific Approach</h3>
                                        <p className="text-gray-600">
                                            Our assessment methodology is based on extensive research and aligns with international digital competency frameworks.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="w-10 h-10 text-primary-600 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Continuous Improvement</h3>
                                        <p className="text-gray-600">
                                            We regularly update our question bank and evaluation criteria to reflect the latest digital trends and technologies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Assessment Process */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Assessment Process</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A rigorous three-step evaluation designed to accurately measure your digital competencies.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-primary-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Evaluation</h3>
                            <p className="text-gray-600 mb-4">
                                Tests foundational digital literacy (A1-A2 levels) with 44 carefully curated questions.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>60 minute time limit</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Automated scoring</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Immediate results</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-primary-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Intermediate Assessment</h3>
                            <p className="text-gray-600 mb-4">
                                Evaluates practical digital skills (B1-B2 levels) for those who qualify from Step 1.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>75 minute time limit</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Scenario-based questions</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Detailed skill breakdown</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-primary-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Certification</h3>
                            <p className="text-gray-600 mb-4">
                                Challenges top performers with expert-level (C1-C2) tasks and simulations.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>90 minute time limit</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Practical tasks</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Professional certification</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-3 gap-8 text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <Award className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">10,000+</h3>
                            <p className="text-gray-600">Certifications Issued</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <Users className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
                            <p className="text-gray-600">Partner Organizations</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <Globe className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">45+</h3>
                            <p className="text-gray-600">Countries Served</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Backed by Experts</h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Our team combines decades of experience in education, psychometrics, and technology to deliver assessments you can trust.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/register"
                                className="inline-block px-8 py-3.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-md"
                            >
                                Start Your Assessment
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;