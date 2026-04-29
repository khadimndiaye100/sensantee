import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/register --- Créer un compte utilisateur
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nom = body?.nom?.trim();
    const prenom = body?.prenom?.trim();
    const email = body?.email?.trim()?.toLowerCase();
    const password = body?.password;
    const role = body?.role ?? "user";

    if (!nom || !prenom || !email || !password) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: nom, prenom, email, password" },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Erreur POST register:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500 },
    );
  }
}
