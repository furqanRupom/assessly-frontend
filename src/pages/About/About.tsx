// src/pages/About.tsx
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, BarChart2, Clock, Award, Users, Globe, ChevronRight, Target, Zap, Heart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const stats = [
        { icon: Award, value: '25K+', label: 'Professionals Certified', growth: '+15% this month' },
        { icon: Users, value: '1,200+', label: 'Enterprise Partners', growth: 'Fortune 500 companies' },
        { icon: Globe, value: '85+', label: 'Countries Worldwide', growth: '6 continents' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Precision',
            description: 'Scientifically validated assessments that accurately measure real-world digital competencies'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'Cutting-edge adaptive testing technology that evolves with industry standards'
        },
        {
            icon: Heart,
            title: 'Accessibility',
            description: 'Making digital literacy accessible to everyone, regardless of background or experience'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: 'Foundation Assessment',
            subtitle: 'A1-A2 Levels',
            description: 'Begin with core digital literacy skills including basic computer operations, internet navigation, and essential software usage.',
            duration: '45 minutes',
            questions: '35 questions',
            features: ['Multiple choice format', 'Instant feedback', 'Progress tracking']
        },
        {
            step: '02',
            title: 'Practical Evaluation',
            subtitle: 'B1-B2 Levels',
            description: 'Demonstrate real-world application through interactive scenarios covering productivity tools, digital communication, and problem-solving.',
            duration: '60 minutes',
            questions: '40 scenarios',
            features: ['Interactive simulations', 'Hands-on tasks', 'Skill breakdown']
        },
        {
            step: '03',
            title: 'Expert Certification',
            subtitle: 'C1-C2 Levels',
            description: 'Master advanced concepts including digital strategy, security protocols, and emerging technologies through comprehensive challenges.',
            duration: '90 minutes',
            questions: '25 challenges',
            features: ['Complex projects', 'Peer review', 'Industry validation']
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div variants={item} className="mb-6">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold border border-primary-200">
                                <BookOpen className="w-4 h-4 mr-2" />
                                About Assessly
                            </div>
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Defining the Future of{' '}
                            <span className="relative">
                                <span className="text-primary-600">Digital Skills</span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 w-full h-3 bg-primary-100 rounded-full -z-10"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1.5 }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p variants={item} className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            We're bridging the digital divide with scientifically-backed assessments that validate real-world competencies across six proficiency levels.
                        </motion.p>

                        <motion.div variants={item}>
                            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
                                <Link to="/assessments">
                                    Explore Our Assessments
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Our Mission
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Empowering Everyone with Digital Confidence
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                In an increasingly digital world, we believe that everyone deserves the opportunity to prove their digital competency with confidence and precision.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our platform combines rigorous psychometric principles with modern technology to deliver assessments that are fair, accurate, and meaningful to both individuals and organizations.
                            </p>

                            {/* Key Features */}
                            <div className="space-y-4">
                                {[
                                    'ISO-compliant assessment methodology',
                                    'AI-powered adaptive testing engine',
                                    'Real-time performance analytics',
                                    'Industry-recognized certifications'
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
                                <div className="space-y-6">
                                    {values.map((value, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                                                <value.icon className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Assessment Process */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            A Three-Tiered Assessment Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our progressive evaluation system adapts to your skill level, ensuring accurate measurement from beginner to expert competency.
                        </p>
                    </motion.div>

                    <div className="space-y-12">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                                    }`}
                            >
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                            <p className="text-primary-600 font-semibold">{step.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-primary-600">{step.duration}</div>
                                            <div className="text-sm text-gray-600">Duration</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-primary-600">{step.questions}</div>
                                            <div className="text-sm text-gray-600">Content</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {step.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center">
                                                <CheckCircle2 className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-4">
                                                {index === 0 && <BarChart2 className="w-10 h-10 text-primary-700" />}
                                                {index === 1 && <Clock className="w-10 h-10 text-primary-700" />}
                                                {index === 2 && <Award className="w-10 h-10 text-primary-700" />}
                                            </div>
                                            <div className="text-lg font-semibold text-primary-700">
                                                Step {step.step} Assessment
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Trusted by Professionals Worldwide
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join thousands of individuals and organizations who trust Assessly for their digital competency validation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 text-center shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <stat.icon className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
                                <p className="text-sm text-primary-600 font-medium">{stat.growth}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Ready to Validate Your Digital Skills?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Join the thousands of professionals who have advanced their careers with internationally recognized digital competency certification.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                                <Link to="/register">
                                    Start Your Assessment
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="default" asChild size="lg" className="border-primary-300 text-primary-100 hover:bg-primary-500 bg-primary-700">
                                <Link to="/assessments">
                                    Learn More
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;