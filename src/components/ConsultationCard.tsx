interface ConsultationCardProps {
  patient: string;
  date: string;
  symptomes: string;
  statut: "en_attente" | "termine";
}

export default function ConsultationCard({
  patient,
  date,
  symptomes,
  statut,
}: ConsultationCardProps) {
  const statutColor =
    statut === "termine" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";

  return (
    <div className="rounded-lg border-l-4 border-orange-400 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">{patient}</h3>
        <span className={`rounded-full px-2 py-1 text-xs ${statutColor}`}>
          {statut === "termine" ? "Termine" : "En attente"}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-500">{date}</p>
      <p className="mt-2 text-gray-600">{symptomes}</p>
    </div>
  );
}