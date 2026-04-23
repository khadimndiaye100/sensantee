interface PatientCardProps {
  nom: string;
  region: string;
  age: number;
  sexe: "F" | "M";
}

export default function PatientCard({ nom, region, age, sexe }: PatientCardProps) {
  return (
    <div className="rounded-lg border-l-4 border-teal-500 bg-white p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
      <p className="mt-1 text-gray-600">Region : {region}</p>
      <p className="mt-1 text-sm text-gray-500">Sexe : {sexe}</p>
      <p className="mt-1 text-sm text-gray-500">{age} ans</p>
    </div>
  );
}