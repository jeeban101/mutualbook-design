import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp, bounceIn } from "@/lib/animations";

interface SuccessSectionProps {
  userEmail: string;
  onBackToHome: () => void;
}

export default function SuccessSection({ userEmail, onBackToHome }: SuccessSectionProps) {
  const { toast } = useToast();

  const resendMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/resend-email", { email: userEmail });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Email Resent!",
        description: "Please check your inbox for the form link.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to resend email. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleResendEmail = () => {
    resendMutation.mutate();
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-12"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Success Animation */}
        <motion.div className="mb-8" variants={bounceIn}>
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Check className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Content */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Check Your Email! 📧</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We've sent a personalized form link to{" "}
            <span className="text-purple-400 font-medium">{userEmail}</span>.{" "}
            Complete your profile to start connecting with your communities!
          </p>
        </motion.div>

        {/* Email Status */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div 
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white font-medium">Email Successfully Sent</span>
          </div>
          <p className="text-gray-400 text-sm">
            Can't find it? Check your spam folder or{" "}
            <Button
              variant="link"
              onClick={handleResendEmail}
              disabled={resendMutation.isPending}
              className="text-purple-400 hover:text-purple-300 underline p-0 h-auto"
            >
              {resendMutation.isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "click here to resend"
              )}
            </Button>
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div className="space-y-4" variants={fadeInUp}>
          <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
          <div className="grid gap-4 text-left">
            <motion.div 
              className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <div className="text-white font-medium">Check Your Email</div>
                <div className="text-gray-400 text-sm">Click the link we sent to continue your profile setup</div>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <div className="text-white font-medium">Complete Your Profile</div>
                <div className="text-gray-400 text-sm">Fill out the detailed form to get matched with communities</div>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <div className="text-white font-medium">Start Connecting</div>
                <div className="text-gray-400 text-sm">Begin networking with students and professionals in your field</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={fadeInUp}>
          <Button
            onClick={onBackToHome}
            variant="ghost"
            className="mt-8 px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
