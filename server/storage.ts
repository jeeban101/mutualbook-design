import { onboardingEntries, type OnboardingEntry, type InsertOnboardingEntry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createOnboardingEntry(entry: InsertOnboardingEntry): Promise<OnboardingEntry>;
  getOnboardingEntryByEmail(email: string): Promise<OnboardingEntry | undefined>;
}

export class DrizzleStorage implements IStorage {
  async createOnboardingEntry(insertEntry: InsertOnboardingEntry): Promise<OnboardingEntry> {
    const result = await db
      .insert(onboardingEntries)
      .values(insertEntry)
      .returning();
    return result[0];
  }

  async getOnboardingEntryByEmail(email: string): Promise<OnboardingEntry | undefined> {
    const result = await db
      .select()
      .from(onboardingEntries)
      .where(eq(onboardingEntries.email, email));
    return result[0];
  }
}


export const storage = new DrizzleStorage();
