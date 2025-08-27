export interface UserMedical {
    id: string;
    userId: string;
    conditions: string[];
    medications: string[];
    allergies: string[];
    surgeries: string[];
    familyHistory: string[];
    lastUpdated: string; // ISO date string
}