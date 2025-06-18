import { onboardingEntries, type OnboardingEntry, type InsertOnboardingEntry } from "@shared/schema";

export interface IStorage {
  createOnboardingEntry(entry: InsertOnboardingEntry): Promise<OnboardingEntry>;
  getOnboardingEntryByEmail(email: string): Promise<OnboardingEntry | undefined>;
}

export class MemStorage implements IStorage {
  private entries: Map<number, OnboardingEntry>;
  private currentId: number;

  constructor() {
    this.entries = new Map();
    this.currentId = 1;
  }

  async createOnboardingEntry(insertEntry: InsertOnboardingEntry): Promise<OnboardingEntry> {
    const id = this.currentId++;
    const entry: OnboardingEntry = {
      id,
      userType: insertEntry.userType,
      communities: insertEntry.communities,
      socialMedia: insertEntry.socialMedia,
      email: insertEntry.email,
      createdAt: new Date(),
    };
    this.entries.set(id, entry);
    return entry;
  }

  async getOnboardingEntryByEmail(email: string): Promise<OnboardingEntry | undefined> {
    return Array.from(this.entries.values()).find(
      (entry) => entry.email === email,
    );
  }
}

export const storage = new MemStorage();
