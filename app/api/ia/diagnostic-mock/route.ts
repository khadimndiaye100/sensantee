import { analyserSymptomes } from "@/lib/groq";
import { NextResponse } from "next/server";

// POST /api/ia/diagnostic-mock
// Appelle Groq directement sans base de données.
// Body attendu :
// {
//   patient: { nom, prenom, age, sexe, region },
//   symptomes: string[],
//   notes: string | null
// }
export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      patient: { nom: string; prenom: string; age: number; sexe: string; region: string };
      symptomes: string[];
      notes: string | null;
    };

    if (!body.patient || !Array.isArray(body.symptomes) || body.symptomes.length === 0) {
      return NextResponse.json(
        { error: "Données manquantes : patient et symptomes sont requis" },
        { status: 400 }
      );
    }

    const resultat = await analyserSymptomes(
      body.patient,
      body.symptomes,
      body.notes
    );

    return NextResponse.json(resultat);
  } catch (error) {
    console.error("Erreur diagnostic-mock:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse IA" },
      { status: 500 }
    );
  }
}
