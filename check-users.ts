import "dotenv/config";
import { prisma } from "./src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const usersCount = await prisma.user.count();
  if (usersCount === 0) {
    console.log("Aucun utilisateur trouvé. Création d'un utilisateur de test...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: {
        nom: "Agent",
        prenom: "Test",
        email: "test@sensantee.com",
        password: hashedPassword,
        role: "user",
      },
    });
    console.log("✅ Utilisateur créé avec succès :");
    console.log(`Email : test@sensantee.com`);
    console.log(`Mot de passe : password123`);
  } else {
    const user = await prisma.user.findFirst();
    console.log(`✅ ${usersCount} utilisateur(s) existant(s) dans la base.`);
    console.log(`Email du premier utilisateur : ${user?.email}`);
    console.log(`(Si vous avez oublié le mot de passe, vous pouvez créer un nouveau compte ou réinitialiser la DB).`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
