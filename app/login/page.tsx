export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Connexion</h1>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full rounded-lg border p-3" />
          <input type="password" placeholder="Mot de passe" className="w-full rounded-lg border p-3" />
          <button className="w-full rounded-lg bg-teal-600 py-3 text-white transition hover:bg-teal-700">
            Se connecter
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">Fonctionnalite complete dans le Lab Auth</p>
      </div>
    </div>
  );
}
