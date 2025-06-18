import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingSection from "@/components/landing-section";
import OnboardingSection from "@/components/onboarding-section";
import SuccessSection from "@/components/success-section";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'landing' | 'onboarding' | 'success'>('landing');
  const [userEmail, setUserEmail] = useState<string>("");

  const handleStartOnboarding = () => {
    setCurrentSection('onboarding');
  };

  const handleOnboardingComplete = (email: string) => {
    setUserEmail(email);
    setCurrentSection('success');
  };

  const handleBackToHome = () => {
    setCurrentSection('landing');
    setUserEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === 'landing' && (
            <LandingSection 
              key="landing"
              onStartOnboarding={handleStartOnboarding} 
            />
          )}
          {currentSection === 'onboarding' && (
            <OnboardingSection 
              key="onboarding"
              onComplete={handleOnboardingComplete} 
            />
          )}
          {currentSection === 'success' && (
            <SuccessSection 
              key="success"
              userEmail={userEmail}
              onBackToHome={handleBackToHome} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
