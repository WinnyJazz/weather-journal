export interface JournalEntry {
  id: number;
  city: string;
  temperature: number;
  weather: string;
  description: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}