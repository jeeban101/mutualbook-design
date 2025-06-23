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

export const insertOnboardingEntrySchema = createInsertSchema(onboardingEntries, {
  communities: z.array(z.string()).nonempty(),
}).omit({
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

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  onboardingId: serial("onboarding_id").notNull(),
  fullName: text("full_name").notNull(),
  bio: text("bio").notNull(),
  personalityTraits: json("personality_traits").$type<string[]>().notNull(),
  goals: text("goals").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profiles, {
  personalityTraits: z.array(z.string()).nonempty(),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
