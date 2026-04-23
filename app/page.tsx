import PatientCard from "@/src/components/PatientCard";
import ConsultationCard from "@/src/components/ConsultationCard";
import AlerteIA from "@/src/components/AlerteIA";
import StatCard from "@/src/components/StatCard";
import LoginButton from "@/src/components/LoginButton";

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
        <LoginButton />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard titre="Patients" valeur={127} unite="enregistres" couleur="border-teal-500" />
        <StatCard titre="Consultations" valeur={43} unite="ce mois" couleur="border-orange-500" />
        <StatCard titre="Alertes IA" valeur={8} unite="urgentes" couleur="border-red-500" />
      </div>

      <h2 className="mb-4 text-xl font-semibold text-gray-700">Derniers patients</h2>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PatientCard nom="Aminata Sow" region="Dakar" age={34} sexe="F" />
        <PatientCard nom="Ibrahima Ba" region="Thies" age={45} sexe="M" />
        <PatientCard nom="Awa Diallo" region="Saint-Louis" age={28} sexe="F" />
      </div>

      <h2 className="mb-4 text-xl font-semibold text-gray-700">Derniere consultation</h2>
      <ConsultationCard
        patient="Aminata Sow"
        date="18 mars 2025"
        symptomes="Fievre, toux, fatigue"
        statut="termine"
      />

      <div className="mt-6">
        <AlerteIA
          diagnostic="Suspicion d'infection respiratoire a surveiller."
          confiance={87}
          niveau="moyen"
        />
      </div>
    </div>
  );
}