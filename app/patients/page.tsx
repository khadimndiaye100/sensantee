import PatientCard from "@/src/components/PatientCard";
export default function PatientsPage() {
  const patients = [
    { nom: "Aminata Sow", region: "Dakar", age: 34, sexe: "F" as const },
    { nom: "Ibrahima Ba", region: "Thies", age: 45, sexe: "M" as const },
    { nom: "Awa Diallo", region: "Saint-Louis", age: 28, sexe: "F" as const },
    { nom: "Cheikh Fall", region: "Ziguinchor", age: 52, sexe: "M" as const },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Patients</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard key={patient.nom} {...patient} />
        ))}
      </div>
    </div>
  );
}