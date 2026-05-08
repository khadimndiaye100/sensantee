export interface Consultation {
  id: string;
  date: string;
  symptomes: string[];
  diagnosticIa?: string | null;
  confiance?: number | null;
  recommandation?: string | null;
  urgence?: string | null;
  statut: string;
  notes: string | null;
  patient: {
    nom: string;
    prenom: string;
    region: string;
    age: number;
    sexe: string;
  };
}
