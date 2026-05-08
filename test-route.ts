import "dotenv/config";
import { prisma } from "./src/lib/prisma";
import { analyserSymptomes } from "./src/lib/groq";

async function run() {
  const consultation = await prisma.consultation.findFirst({
    include: { patient: true }
  });
  
  if (!consultation) {
    console.log("Aucune consultation trouvée.");
    return;
  }
  console.log("Consultation trouvée:", consultation.id);
  
  try {
    const naissance = new Date(consultation.patient.dateNaissance);
    const age = new Date().getFullYear() - naissance.getFullYear();
    
    console.log("Appel de Groq avec l'age:", age);
    
    const resultat = await analyserSymptomes(
      {
        nom: consultation.patient.nom,
        prenom: consultation.patient.prenom,
        age,
        sexe: consultation.patient.sexe,
        region: consultation.patient.region,
      },
      consultation.symptomes,
      consultation.notes
    );
    
    console.log("Resultat:", resultat);
    
    const updated = await prisma.consultation.update({
      where: { id: consultation.id },
      data: {
        diagnosticIa: resultat.diagnostic,
        confiance: resultat.confiance,
        recommandation: resultat.recommandation,
        urgence: resultat.urgence,
        statut: "termine",
      },
    });
    console.log("Update OK", updated.id);
  } catch (error) {
    console.error("ERREUR DE TEST:", error);
  }
}

run();
