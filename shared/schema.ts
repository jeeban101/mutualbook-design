import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const onboardingEntries = pgTable("onboarding_entries", {
  id: serial("id").primaryKey(),
  userType: text("user_type").notNull(),
  communities: json("communities").$type<string[]>().notNull(),
  socialMedia: json("social_media").$type<{
    whatsapp?: string;
    instagram?: string;
    snapchat?: string;
    linkedin?: string;
  }>().notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOnboardingEntrySchema = createInsertSchema(onboardingEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertOnboardingEntry = z.infer<typeof insertOnboardingEntrySchema>;
export type OnboardingEntry = typeof onboardingEntries.$inferSelect;

// Email validation schema
export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type EmailRequest = z.infer<typeof emailSchema>;
