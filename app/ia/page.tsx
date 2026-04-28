import AlerteIA from "@/components/AlerteIA";
export default function IAPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Assistant IA</h1>
      <p className="mb-6 text-gray-600">Saisissez les symptomes du patient pour obtenir un pre-diagnostic.</p>
      <AlerteIA
        diagnostic="Suspicion de paludisme. Orientation vers un centre de sante."
        confiance={78}
        niveau="urgent"
      />
    </div>
  );
}