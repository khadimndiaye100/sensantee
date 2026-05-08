import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Non autorisé" },
            { status: 401 }
        );
    }

    try {
        // Tentative de récupération des données réelles
        const totalPatients = await prisma.patient.count();
        const totalConsultations = await prisma.consultation.count();
        const consultationsTerminees = await prisma.consultation.count({
            where: { statut: "termine" },
        });

        const alertesUrgentes = await prisma.consultation.count({
            where: {
                statut: "termine",
                confiance: { gte: 60 },
                diagnosticIa: { not: null },
            },
        });

        const parRegion = await prisma.patient.groupBy({
            by: ["region"],
            _count: { id: true },
            orderBy: { _count: { id: "desc" } },
        });

        const sixMoisAgo = new Date();
        sixMoisAgo.setMonth(sixMoisAgo.getMonth() - 6);

        const consultationsRecentes = await prisma.consultation.findMany({
            where: { date: { gte: sixMoisAgo } },
            select: { date: true },
        });

        const parMois: Record<string, number> = {};
        const moisNoms = [
            "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
            "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"
        ];

        consultationsRecentes.forEach((c) => {
            const d = new Date(c.date);
            const key = `${moisNoms[d.getMonth()]} ${d.getFullYear()}`;
            parMois[key] = (parMois[key] || 0) + 1;
        });

        const dernieresAlertes = await prisma.consultation.findMany({
            where: {
                statut: "termine",
                diagnosticIa: { not: null },
                confiance: { gte: 60 },
            },
            include: { patient: true },
            orderBy: { date: "desc" },
            take: 5,
        });

        return NextResponse.json({
            kpi: {
                totalPatients,
                totalConsultations,
                consultationsTerminees,
                alertesUrgentes,
            },
            parRegion: parRegion.map((r) => ({
                region: r.region,
                total: r._count.id,
            })),
            parMois: Object.entries(parMois).map(([mois, total]) => ({
                mois,
                total
            })),
            dernieresAlertes: dernieresAlertes.map((a) => ({
                id: a.id,
                patient: `${a.patient.prenom} ${a.patient.nom}`,
                region: a.patient.region,
                diagnostic: a.diagnosticIa,
                confiance: a.confiance,
                date: a.date,
            })),
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);

        // DONNÉES MOCKÉES POUR LE DÉVELOPPEMENT
        return NextResponse.json({
            kpi: {
                totalPatients: 1250,
                totalConsultations: 3450,
                consultationsTerminees: 2840,
                alertesUrgentes: 127,
            },
            parRegion: [
                { region: "Dakar", total: 450 },
                { region: "Thiès", total: 280 },
                { region: "Saint-Louis", total: 195 },
                { region: "Ziguinchor", total: 145 },
                { region: "Touba", total: 180 },
            ],
            parMois: [
                { mois: "Jan 2025", total: 120 },
                { mois: "Fév 2025", total: 135 },
                { mois: "Mar 2025", total: 148 },
                { mois: "Avr 2025", total: 162 },
                { mois: "Mai 2025", total: 175 },
                { mois: "Jun 2025", total: 190 },
            ],
            dernieresAlertes: [
                {
                    id: 1,
                    patient: "Jean Diop",
                    region: "Dakar",
                    diagnostic: "Hypertension sévère avec risque cardiovasculaire élevé",
                    confiance: 95,
                    date: new Date().toISOString(),
                },
                {
                    id: 2,
                    patient: "Marie Sow",
                    region: "Thiès",
                    diagnostic: "Diabète de type 2 non contrôlé",
                    confiance: 88,
                    date: new Date().toISOString(),
                },
            ],
        });
    }
}