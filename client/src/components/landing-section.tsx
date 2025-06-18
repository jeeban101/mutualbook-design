import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

interface LandingSectionProps {
  onStartOnboarding: () => void;
}

export default function LandingSection({ onStartOnboarding }: LandingSectionProps) {
  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Hero Content */}
        <motion.div className="mb-12" variants={fadeInUp}>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Connect. Learn.{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              Grow.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Join thousands of students and professionals building meaningful connections in our vibrant community platform.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto"
          variants={staggerContainer}
        >
          <motion.div className="text-center" variants={fadeInUp}>
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-sm text-gray-400">Students</div>
          </motion.div>
          <motion.div className="text-center" variants={fadeInUp}>
            <div className="text-3xl font-bold text-white">5K+</div>
            <div className="text-sm text-gray-400">Professionals</div>
          </motion.div>
          <motion.div className="text-center" variants={fadeInUp}>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-gray-400">Communities</div>
          </motion.div>
        </motion.div>

        {/* Main CTA */}
        <motion.div variants={fadeInUp}>
          <Button
            onClick={onStartOnboarding}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 animate-pulse-slow border-0"
            {...scaleOnHover}
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </div>
    </motion.section>
  );
}
