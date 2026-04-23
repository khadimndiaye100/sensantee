interface AlerteIAProps {
  diagnostic: string;
  confiance: number;
  niveau: "faible" | "moyen" | "urgent";
}

export default function AlerteIA({ diagnostic, confiance, niveau }: AlerteIAProps) {
  const couleurs = {
    faible: "border-green-500 bg-green-50",
    moyen: "border-orange-500 bg-orange-50",
    urgent: "border-red-500 bg-red-50",
  };

  return (
    <div className={`rounded-lg border-l-4 p-6 ${couleurs[niveau]}`}>
      <h3 className="font-bold text-gray-800">Resultat IA</h3>
      <p className="mt-2 text-gray-700">{diagnostic}</p>
      <p className="mt-1 text-sm text-gray-500">Confiance : {confiance}%</p>
      <p className="mt-3 text-xs italic text-gray-400">
        Ceci n&apos;est pas un diagnostic medical. Consultez un professionnel de sante.
      </p>
    </div>
  );
}