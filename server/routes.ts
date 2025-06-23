import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOnboardingEntrySchema, emailSchema, profiles, insertProfileSchema } from "@shared/schema";
import { z } from "zod";
import { Resend } from 'resend';
import { db } from "./db";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit onboarding form and send email
  app.post("/api/onboarding", async (req, res) => {
    try {
      const validatedData = insertOnboardingEntrySchema.parse(req.body);
      
      // Save onboarding entry
      const entry = await storage.createOnboardingEntry(validatedData);
      
      // Generate a unique form link (in a real app, this would be a proper UUID)
      const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5000';
      const formLink = `${baseUrl}/complete-profile/${entry.id}`;
      
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
      
      const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5000';
      const formLink = `${baseUrl}/complete-profile/${entry.id}`;
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

  // Complete profile endpoint
  app.post("/api/complete-profile", async (req, res) => {
    try {
      console.log("Received profile data:", req.body);
      const validatedData = insertProfileSchema.parse(req.body);
      const result = await db.insert(profiles).values(validatedData).returning();
      res.json({ success: true, profile: result[0] });
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Email sending function (simulated)
async function sendOnboardingEmail(email: string, formLink: string, entry: any) {
  const firstName = entry.email.split('@')[0] || 'there';
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev', // fallback if env missing
      to: email,
      subject: '🔒 Your private MutualBook link is here',
      html: `
        <p>Hi ${firstName},</p>
        <p>You're one step away from your first meaningful match.</p>
        <p>
          👇 <a href="${formLink}" style="background:#4f46e5;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Start My Match Form</a>
        </p>
        <p>This link is personal and secure — only you can access it.<br>
        Once completed, you'll get one <b>real match</b> from someone aligned with your goals, tags, and vibe.</p>
        <p>✅ No swiping. No spam. Just real people from communities you trust.</p>
        <p>If you don't see the email, check your spam folder and mark us safe!</p>
        <p>— Team MutualBook<br>🌐 <a href="https://mutualbook.com">mutualbook.com</a></p>
        <p style="font-size:12px;color:#888;">This link expires in 30 minutes.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);

  }
}
