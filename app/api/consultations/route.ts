import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/consultations
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const consultations = await prisma.consultation.findMany({
      include: {
        patient: true,
        user: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Erreur GET consultations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des consultations" },
      { status: 500 },
    );
  }
}

// POST /api/consultations
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.patientId) {
      return NextResponse.json(
        { error: "L'ID du patient est requis" },
        { status: 400 },
      );
    }

    if (!body.symptomes) {
      return NextResponse.json(
        { error: "Les symptômes sont requis" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: body.patientId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient non trouvé" }, { status: 404 });
    }

    const consultation = await prisma.consultation.create({
      data: {
        patientId: body.patientId,
        userId: user.id,
        symptomes: body.symptomes,
        notes: body.notes || null,
        statut: "en_attente",
      },
      include: {
        patient: true,
        user: {
          select: {
            nom: true,
            prenom: true,
          },
        },
      },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Erreur POST consultation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la consultation" },
      { status: 500 },
    );
  }
}

