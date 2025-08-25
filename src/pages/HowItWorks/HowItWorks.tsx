// src/pages/HowItWorks.tsx
import { cubicBezier, motion } from 'framer-motion';
import {
    ClipboardCheck,
    UserCheck,
    BarChart3,
    Award,
    Clock,
    FileText,
    ChevronRight,
    CheckCircle2,
    Play,
    Shield,
    Users,
    Target,
    Zap,
    Mail,
    Phone,
    MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
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
                ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
            }
        }
    };

    const steps = [
        {
            step: 1,
            icon: UserCheck,
            title: "Create Your Account",
            description: "Sign up in less than a minute with your email or social accounts",
            details: "No lengthy forms or complicated setup. Just basic information to get you started on your assessment journey.",
            duration: "1 minute",
            image: "/api/placeholder/400/300",
            features: ["Email or social login", "Progress saving", "Multi-device access"]
        },
        {
            step: 2,
            icon: ClipboardCheck,
            title: "Select Assessment Level",
            description: "Choose the right assessment based on your skill level and goals",
            details: "Our system guides you to the appropriate assessment level, from foundational digital literacy to advanced technical skills.",
            duration: "2 minutes",
            image: "/api/placeholder/400/300",
            features: ["Skill level guidance", "Goal-based selection", "Time commitment estimates"]
        },
        {
            step: 3,
            icon: FileText,
            title: "Complete the Assessment",
            description: "Work through practical tasks and scenarios at your own pace",
            details: "Experience real-world simulations that test actual digital competencies rather than just theoretical knowledge.",
            duration: "45-90 minutes",
            image: "/api/placeholder/400/300",
            features: ["Practical simulations", "Adaptive difficulty", "Pause and resume"]
        },
        {
            step: 4,
            icon: BarChart3,
            title: "Get Detailed Results",
            description: "Receive comprehensive feedback on your performance",
            details: "Our analytics engine breaks down your results by skill category, providing actionable insights for improvement.",
            duration: "Instant",
            image: "/api/placeholder/400/300",
            features: ["Skill breakdown", "Strength identification", "Improvement areas"]
        },
        {
            step: 5,
            icon: Award,
            title: "Earn Your Certification",
            description: "Receive your digital badge and share your achievement",
            details: "Get an industry-recognized credential that validates your digital skills to employers and educational institutions.",
            duration: "Instant",
            image: "/api/placeholder/400/300",
            features: ["Digital credential", "Shareable badge", "Verification link"]
        }
    ];

    const features = [
        {
            icon: Shield,
            title: "Secure & Private",
            description: "Your assessment data is encrypted and never shared without your permission"
        },
        {
            icon: Users,
            title: "Benchmarked Results",
            description: "See how your skills compare to others in your industry and experience level"
        },
        {
            icon: Target,
            title: "Actionable Insights",
            description: "Get personalized recommendations for skills development and training resources"
        },
        {
            icon: Zap,
            title: "Adaptive Testing",
            description: "Our algorithm adjusts question difficulty based on your responses for accurate measurement"
        }
    ];

    const faqs = [
        {
            question: "How long does an assessment take?",
            answer: "Most assessments take between 45-90 minutes depending on the level and your pace. You can pause and resume at any time."
        },
        {
            question: "Do I need to install any software?",
            answer: "No, our assessments run directly in your web browser. You just need a stable internet connection."
        },
        {
            question: "Can I retake the assessment?",
            answer: "Yes, you can retake assessments after 30 days to measure your improvement. Some premium plans offer immediate retakes."
        },
        {
            question: "How are the results used?",
            answer: "Your results are private to you. You choose if and how to share them with employers or educational institutions."
        },
        {
            question: "What technology do I need?",
            answer: "You'll need a computer with a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div variants={item} className="mb-6">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-200 text-primary-800 text-sm font-semibold border border-primary-300">
                                <ClipboardCheck className="w-4 h-4 mr-2" />
                                Process Overview
                            </div>
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            How <span className="text-primary-600">Assessly</span> Works
                        </motion.h1>

                        <motion.p variants={item} className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Our simple 5-step process helps you accurately measure your digital skills and earn recognized certifications that boost your career.
                        </motion.p>

                        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
                                <Link to="/register">
                                    Start Your Assessment
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg">
                                <a href="#video-demo">
                                    <Play className="w-4 h-4 mr-2" />
                                    Watch Demo
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

           
            
            </section>

            {/* Process Steps */}
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
                            The 5-Step Assessment Process
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            From registration to certification, here's how you'll demonstrate and validate your digital skills.
                        </p>
                    </motion.div>

                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-6">
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                            <p className="text-primary-600 font-semibold">{step.description}</p>
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        {step.details}
                                    </p>

                                    <div className="flex items-center mb-8">
                                        <Clock className="w-5 h-5 text-primary-600 mr-2" />
                                        <span className="text-gray-700 font-medium">Approx. {step.duration}</span>
                                    </div>

                                    <div className="space-y-3">
                                        {step.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center">
                                                <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-4">
                                                <step.icon className="w-10 h-10 text-primary-700" />
                                            </div>
                                            <div className="text-lg font-semibold text-primary-700">
                                                Step {step.step}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section id="video-demo" className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            See Assessly in Action
                        </h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Watch this short demo to see how our assessment platform works and what you can expect.
                        </p>

                        <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-20"></div>
                            <Button size="lg" className="relative z-10 bg-white text-primary-600 hover:bg-gray-100">
                                <Play className="w-6 h-6 mr-2 fill-current" />
                                Play Demo Video
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Features */}
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
                            Why Choose Assessly?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our platform is designed to provide the most accurate and meaningful assessment of your digital skills.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about the assessment process and platform.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <p className="text-lg text-gray-600 mb-6">Still have questions? We're here to help.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button variant="outline" className="gap-2">
                                <Mail className="w-4 h-4" />
                                Email Support
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Live Chat
                            </Button>
                        </div>
                    </motion.div>
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
                            Ready to Assess Your Digital Skills?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of professionals who have validated their skills and advanced their careers with Assessly certifications.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                            <Link to="/register">
                                Start Your Assessment
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;