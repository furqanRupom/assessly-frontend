// src/pages/Home.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Award, CheckCircle, ArrowRight, Users, Star, Play } from 'lucide-react';
import PrimaryButton from './components/button/PrimaryButton';
import { useUser } from './hooks/useUser';
import { roleLabels } from './constants/rolesLabel';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const Home = () => {
  const user = useUser();
  const stats = [
    { value: '10,000+', label: 'Certified Users' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Countries' }
  ];

  const features = [
    {
      icon: BarChart2,
      title: 'Adaptive Assessment',
      description: 'AI-powered evaluation that adapts to your skill level in real-time'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Certificates recognized by leading companies worldwide'
    },
    {
      icon: CheckCircle,
      title: 'Instant Results',
      description: 'Get detailed feedback and certification immediately after completion'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold border border-primary-100">
                <BookOpen className="w-4 h-4 mr-2" />
                Trusted by 10,000+ professionals
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Master Your{' '}
              <span className="relative">
                <span className="text-primary-600">Digital Skills</span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-3 bg-primary-100 rounded-full -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Get certified with our comprehensive digital competency assessment platform.
              From A1 to C2 levels, prove your expertise to the world.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <PrimaryButton
                link={
                  user
                    ? user.role === "student"
                      ? "student/assessments"
                      : `/${user.role}/dashboard`
                    : "/register"
                }
                className="inline-flex items-center"
              >
                {user ? (
                  user.role === "student" ? (
                    <>
                      Start Assessment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <span>{roleLabels[user.role]} Dashboard</span>
                  )
                ) : (
                  "Start your journey"
                )}
              </PrimaryButton>


              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-gray-400">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Assessly?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with expert-designed assessments
              to provide the most accurate digital competency evaluation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 font-medium">4.9/5 from 2,000+ reviews</span>
            </div>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Assessly helped me land my dream job at a tech company. The certification was exactly what my employer was looking for.",
                author: "Sarah Chen",
                role: "Software Developer"
              },
              {
                quote: "The adaptive assessment was challenging but fair. I finally have proof of my digital marketing skills.",
                author: "Michael Rodriguez",
                role: "Digital Marketer"
              },
              {
                quote: "As an HR manager, I use Assessly certificates to verify candidates' technical competencies. It's reliable and comprehensive.",
                author: "Emma Thompson",
                role: "HR Manager"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Validate Your Skills?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of professionals who have advanced their careers with Assessly certification.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-primary-300 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;