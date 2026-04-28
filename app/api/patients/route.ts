import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/patients --- Lister tous les patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Erreur GET patients:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des patients" },
      { status: 500 },
    );
  }
}

// POST /api/patients --- Créer un patient
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body?.nom ||
      !body?.prenom ||
      !body?.dateNaissance ||
      !body?.sexe ||
      !body?.region
    ) {
      return NextResponse.json(
        {
          error:
            "Données obligatoires manquantes: nom, prenom, dateNaissance, sexe, region",
        },
        { status: 400 },
      );
    }

    const dateNaissance = new Date(body.dateNaissance);
    if (isNaN(dateNaissance.getTime())) {
      return NextResponse.json(
        { error: "Format de date invalide pour dateNaissance" },
        { status: 400 },
      );
    }

    const patient = await prisma.patient.create({
      data: {
        nom: body.nom.trim(),
        prenom: body.prenom.trim(),
        dateNaissance,
        sexe: body.sexe,
        telephone: body.telephone?.trim() || null,
        adresse: body.adresse?.trim() || null,
        region: body.region.trim(),
      },
    });
    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Erreur POST patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du patient" },
      { status: 500 },
    );
  }
}

