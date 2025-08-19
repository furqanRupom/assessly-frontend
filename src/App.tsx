// src/pages/Home.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Award, CheckCircle } from 'lucide-react';

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

const Home = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        {/* Hero Section with Dot Background */}
        <div className="relative">
          {/* Dot Background only behind hero text */}
          <div className="absolute top-50 left-60 w-full max-w-2xl h-full -z-20 opacity-10">
            <div className="grid grid-cols-10 grid-rows-5 gap-6">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary-900"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.6, 0.3],
                    transition: {
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center mb-32 relative z-20"
          >
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium shadow-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Digital Competency Assessment
              </div>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Prove Your <span className="text-primary-600">Digital Skills</span>
            </motion.h1>

            <motion.p variants={item} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Get certified from A1 to C2 level with our comprehensive digital competency evaluation platform.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200/50"
              >
                Start Assessment
              </Link>
              <Link
                to="/how-it-works"
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                How It Works
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <BarChart2 className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Evaluation</h3>
            <p className="text-gray-600">
              Three-tiered assessment covering all digital competency levels from beginner to expert.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Official Certification</h3>
            <p className="text-gray-600">
              Receive recognized certification that validates your digital skills to employers.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your improvement over time with detailed skill breakdowns.
            </p>
          </motion.div>
        </div>

        {/* CTA Section with Dot Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-100 shadow-xl overflow-hidden"
        >
          {/* Dot Background only behind CTA */}
          <div className="absolute -top-10 -right-10 w-64 h-64 -z-10 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 gap-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary-900"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.6, 0.3],
                    transition: {
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Certified?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have validated their digital skills with Assessly.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200/50"
          >
            Start Your Assessment
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;