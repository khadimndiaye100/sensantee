"use client";

import { useEffect, useState } from "react";
import PatientCard from "@/components/PatientCard";
import PatientForm from "@/components/PatientForm";

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  telephone: string | null;
  adresse: string | null;
  region: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function chargerPatients() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/patients");
      
      if (!res.ok) {
        const errorMessage = `Erreur ${res.status}: ${res.statusText}`;
        setPatients([]);
        setError(errorMessage);
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        setPatients([]);
        setError("Format de réponse inattendu du serveur");
        return;
      }

      setPatients(data as Patient[]);
    } catch (err) {
      console.error("Erreur de chargement:", err);
      setPatients([]);
      setError("Impossible de se connecter au serveur. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerPatients();
  }, []);

  function calculerAge(dateNaissance: string): number {
    if (!dateNaissance) return 0;
    
    const naissance = new Date(dateNaissance);
    const today = new Date();
    
    // Vérifier si la date est valide
    if (isNaN(naissance.getTime())) return 0;
    
    let age = today.getFullYear() - naissance.getFullYear();
    const moisDifference = today.getMonth() - naissance.getMonth();
    
    if (moisDifference < 0 || (moisDifference === 0 && today.getDate() < naissance.getDate())) {
      age--;
    }
    
    return age;
  }

  // Trier les patients par nom (optionnel mais recommandé)
  const patientsTries = [...patients].sort((a, b) => {
    const nomCompletA = `${a.nom} ${a.prenom}`;
    const nomCompletB = `${b.nom} ${b.prenom}`;
    return nomCompletA.localeCompare(nomCompletB);
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Patients</h1>

      <div className="mb-8">
        <PatientForm onSuccess={chargerPatients} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Liste des patients ({patients.length})
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Chargement des patients...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <button
              onClick={chargerPatients}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Réessayer
            </button>
          </div>
        ) : patients.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Aucun patient enregistré.</p>
            <p className="text-gray-400 text-sm mt-2">
              Utilisez le formulaire ci-dessus pour ajouter votre premier patient.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patientsTries.map((patient) => (
              <PatientCard
                key={patient.id}
                nom={`${patient.prenom} ${patient.nom}`}
                region={patient.region}
                age={calculerAge(patient.dateNaissance)}
                sexe={patient.sexe as "M" | "F"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}