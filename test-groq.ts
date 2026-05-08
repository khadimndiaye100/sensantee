import "dotenv/config";
import { analyserSymptomes } from "./src/lib/groq";

async function test() {
  try {
    const res = await analyserSymptomes(
      { nom: "Doe", prenom: "John", age: 30, sexe: "M", region: "Dakar" },
      ["maux de tête", "fièvre"],
      null
    );
    console.log("Result:", res);
  } catch (err) {
    console.error("Error calling Groq:", err);
  }
}

test();
