"use client";
import { useEffect, useState } from "react";
import ConsultationForm from "@/components/ConsultationForm";
import DiagnosticIA from "@/components/DiagnosticIA";

interface Consultation {
  id: string;
  date: string;
  symptomes: string[];
  diagnosticIa?: string | null;
  confiance?: number | null;
  statut: string;
  notes: string | null;
  patient: {
    nom: string;
    prenom: string;
    region: string;
  };
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function charger() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/consultations");
      const data = await res.json();
      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Erreur lors du chargement des consultations"
        );
        setConsultations([]);
        return;
      }
      if (!Array.isArray(data)) {
        setError("Réponse invalide du serveur");
        setConsultations([]);
        return;
      }
      setConsultations(data as Consultation[]);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      setError("Erreur de connexion au serveur");
      setConsultations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    charger();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Consultations</h1>

      <ConsultationForm onSuccess={charger} />

      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Historique ({consultations.length})
      </h2>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={charger}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Réessayer
          </button>
        </div>
      ) : consultations.length === 0 ? (
        <p className="text-gray-500">Aucune consultation enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400"
            >
              {/* En-tête : nom + statut */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {c.patient.prenom} {c.patient.nom}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {c.patient.region} —{" "}
                    {new Date(c.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    c.statut === "termine"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.statut === "termine" ? "Terminé" : "En attente"}
                </span>
              </div>

              {/* Symptômes */}
              <div className="flex flex-wrap gap-2 mt-3">
                {(Array.isArray(c.symptomes) ? c.symptomes : []).map((s, i) => (
                  <span
                    key={i}
                    className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Notes */}
              {c.notes && (
                <p className="text-sm text-gray-600 mt-3 italic">{c.notes}</p>
              )}

              {/* Diagnostic IA */}
              <DiagnosticIA
                consultationId={c.id}
                diagnosticExistant={c.diagnosticIa ?? null}
                confianceExistante={c.confiance ?? null}
                onDiagnostic={charger}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
