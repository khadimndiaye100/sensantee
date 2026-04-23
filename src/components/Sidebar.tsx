"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const liens = [
  { nom: "Accueil", href: "/", icone: "H" },
  { nom: "Patients", href: "/patients", icone: "P" },
  { nom: "Consultations", href: "/consultations", icone: "C" },
  { nom: "Dashboard", href: "/dashboard", icone: "D" },
  { nom: "Profil", href: "/profil", icone: "U" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-teal-800 p-4 text-white">
      <nav className="mt-4 space-y-2">
        {liens.map((lien) => {
          const actif = pathname === lien.href;

          return (
            <Link
              key={lien.href}
              href={lien.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                actif ? "bg-teal-600 font-bold" : "hover:bg-teal-700"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm">
                {lien.icone}
              </span>
              {lien.nom}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}