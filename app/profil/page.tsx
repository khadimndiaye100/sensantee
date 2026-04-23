export default function ProfilPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Mon profil</h1>
      <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
        <p className="text-gray-600">
          <strong>Nom :</strong> Moussa Diop
        </p>
        <p className="mt-2 text-gray-600">
          <strong>Role :</strong> Agent de sante
        </p>
        <p className="mt-2 text-gray-600">
          <strong>Region :</strong> Dakar
        </p>
      </div>
    </div>
  );
}