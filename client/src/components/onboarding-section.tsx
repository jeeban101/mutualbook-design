import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, GraduationCap, Briefcase, Mail, Phone, Instagram, Camera, Linkedin, Loader2, Info } from "lucide-react";
import { slideInFromRight, slideInFromLeft, fadeInUp } from "@/lib/animations";

interface OnboardingSectionProps {
  onComplete: (email: string) => void;
}

const communities = [
  "Technology", "Design", "Business", "Marketing", "Finance", 
  "Health", "Education", "Arts", "Sports", "Science"
];

export default function OnboardingSection({ onComplete }: OnboardingSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<string>("");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState({
    whatsapp: "",
    instagram: "",
    snapchat: "",
    linkedin: ""
  });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/onboarding", data);
      return response.json();
    },
    onSuccess: () => {
      onComplete(email);
      toast({
        title: "Success!",
        description: "Your onboarding information has been submitted and email sent!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!userType) {
          toast({
            title: "Selection Required",
            description: "Please select whether you are a student or professional.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (selectedCommunities.length < 3) {
          toast({
            title: "More selections needed",
            description: "Please select at least 3 communities.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        // Social media links are optional
        break;
      case 4:
        if (!email || !isValidEmail(email)) {
          setEmailError("Please enter a valid email address");
          return false;
        }
        setEmailError("");
        break;
    }
    return true;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCommunityToggle = (community: string) => {
    setSelectedCommunities(prev => 
      prev.includes(community) 
        ? prev.filter(c => c !== community)
        : [...prev, community]
    );
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    const formData = {
      userType,
      communities: selectedCommunities,
      socialMedia,
      email
    };

    submitMutation.mutate(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            {...slideInFromRight}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Tell us about yourself</h3>
            <div className="space-y-4">
              <motion.div
                className={`flex items-center p-6 bg-white/5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  userType === 'student' 
                    ? 'border-purple-400 bg-white/15 ring-2 ring-purple-400' 
                    : 'border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setUserType('student')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  userType === 'student' ? 'border-purple-400' : 'border-purple-400'
                }`}>
                  {userType === 'student' && (
                    <div className="w-3 h-3 rounded-full bg-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">Student</div>
                  <div className="text-gray-400 text-sm">I'm currently studying or recently graduated</div>
                </div>
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </motion.div>

              <motion.div
                className={`flex items-center p-6 bg-white/5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  userType === 'professional' 
                    ? 'border-blue-400 bg-white/15 ring-2 ring-blue-400' 
                    : 'border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setUserType('professional')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  userType === 'professional' ? 'border-blue-400' : 'border-blue-400'
                }`}>
                  {userType === 'professional' && (
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">Professional</div>
                  <div className="text-gray-400 text-sm">I'm working in my field or looking for opportunities</div>
                </div>
                <Briefcase className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            {...slideInFromRight}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Choose Your Communities</h3>
            <p className="text-gray-300 text-center mb-6">Select the topics you're interested in (choose 3-5)</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {communities.map((community) => (
                <motion.div
                  key={community}
                  className={`p-3 text-center border rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium ${
                    selectedCommunities.includes(community)
                      ? 'bg-purple-500/30 border-purple-400 ring-2 ring-purple-400/50 text-white'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 text-white'
                  }`}
                  onClick={() => handleCommunityToggle(community)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {community}
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-400">{selectedCommunities.length} selected</span>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            {...slideInFromRight}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Connect Your Social Media</h3>
            <p className="text-gray-300 text-center mb-6">Add your preferred social media links so mutual connections can reach out</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number</Label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-4 focus-within:border-green-400 focus-within:bg-white/10 transition-all duration-300">
                  <Phone className="w-6 h-6 text-green-400 mr-3" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={socialMedia.whatsapp}
                    onChange={(e) => setSocialMedia(prev => ({...prev, whatsapp: e.target.value}))}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="relative">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Instagram Username</Label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-4 focus-within:border-pink-400 focus-within:bg-white/10 transition-all duration-300">
                  <Instagram className="w-6 h-6 text-pink-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="@yourusername"
                    value={socialMedia.instagram}
                    onChange={(e) => setSocialMedia(prev => ({...prev, instagram: e.target.value}))}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="relative">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Snapchat Username</Label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-4 focus-within:border-yellow-400 focus-within:bg-white/10 transition-all duration-300">
                  <Camera className="w-6 h-6 text-yellow-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="yourusername"
                    value={socialMedia.snapchat}
                    onChange={(e) => setSocialMedia(prev => ({...prev, snapchat: e.target.value}))}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="relative">
                <Label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</Label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-4 focus-within:border-blue-400 focus-within:bg-white/10 transition-all duration-300">
                  <Linkedin className="w-6 h-6 text-blue-400 mr-3" />
                  <Input
                    type="url"
                    placeholder="linkedin.com/in/yourprofile"
                    value={socialMedia.linkedin}
                    onChange={(e) => setSocialMedia(prev => ({...prev, linkedin: e.target.value}))}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            {...slideInFromRight}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Almost Done! 🎉</h3>
            <p className="text-gray-300 text-center mb-6">Enter your email address to receive your personalized form link and complete your profile</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Official Email Address</Label>
                <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-4 focus-within:border-purple-400 focus-within:bg-white/10 transition-all duration-300">
                  <Mail className="w-6 h-6 text-purple-400 mr-3" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus-visible:ring-0"
                    required
                  />
                </div>
                {emailError && (
                  <div className="text-red-400 text-sm mt-2">{emailError}</div>
                )}
              </div>

              <div className="bg-purple-500/20 border border-purple-400/30 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">What happens next?</h4>
                    <p className="text-gray-300 text-sm">We'll send you a personalized form link to complete your profile setup and connect with your selected communities.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section 
      className="min-h-screen px-4 py-12"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Get You Started</h2>
          <p className="text-gray-300">Complete your profile to unlock your community experience</p>
          
          {/* Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress 
              value={progress} 
              className="w-full h-2 bg-gray-700"
            />
          </div>
        </div>

        {/* Onboarding Steps Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={previousStep}
              disabled={currentStep === 1}
              variant="ghost"
              className={`px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed invisible' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 font-medium"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Me the Link
                    <Mail className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
