interface StatCardProps {
  titre: string;
  valeur: number;
  unite: string;
  couleur: string;
}

export default function StatCard({ titre, valeur, unite, couleur }: StatCardProps) {
  return (
    <div className={`rounded-lg border-t-4 bg-white p-6 shadow-md ${couleur}`}>
      <p className="text-sm text-gray-500">{titre}</p>
      <p className="mt-2 text-3xl font-bold text-gray-800">{valeur}</p>
      <p className="text-sm text-gray-400">{unite}</p>
    </div>
  );
}