import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOnboardingEntrySchema, emailSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit onboarding form and send email
  app.post("/api/onboarding", async (req, res) => {
    try {
      const validatedData = insertOnboardingEntrySchema.parse(req.body);
      
      // Save onboarding entry
      const entry = await storage.createOnboardingEntry(validatedData);
      
      // Generate a unique form link (in a real app, this would be a proper UUID)
      const formLink = `https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/complete-profile/${entry.id}`;
      
      // Send email (simulated for now - in production, use Nodemailer or similar)
      await sendOnboardingEmail(entry.email, formLink, entry);
      
      res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing onboarding:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Resend email endpoint
  app.post("/api/resend-email", async (req, res) => {
    try {
      const { email } = emailSchema.parse(req.body);
      
      const entry = await storage.getOnboardingEntryByEmail(email);
      if (!entry) {
        return res.status(404).json({ message: "Entry not found for this email" });
      }
      
      const formLink = `https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/complete-profile/${entry.id}`;
      await sendOnboardingEmail(entry.email, formLink, entry);
      
      res.json({ success: true, message: "Email resent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error resending email:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Email sending function (simulated)
async function sendOnboardingEmail(email: string, formLink: string, entry: any) {
  // In a real application, you would use Nodemailer or a service like SendGrid
  // For now, we'll just log the email content
  console.log(`
    ===== EMAIL SENT TO: ${email} =====
    Subject: Welcome to MUTUAL BOOK - Complete Your Profile
    
    Hi there!
    
    Welcome to MUTUAL BOOK - where students and professionals connect and grow together! 
    
    Your Initial Details:
    - Type: ${entry.userType}
    - Communities: ${entry.communities.join(', ')}
    - Social Media: ${JSON.stringify(entry.socialMedia, null, 2)}
    
    Click the link below to complete your profile setup:
    ${formLink}
    
    This personalized link will take you to a detailed form where you can finish setting up your MUTUAL BOOK profile and start connecting with other ${entry.userType}s in your selected communities.
    
    Get ready to unlock meaningful connections and opportunities!
    
    Best regards,
    The MUTUAL BOOK Team
    =====================================
  `);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}
