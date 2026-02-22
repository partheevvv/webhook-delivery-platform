import dotenv from "dotenv";
import path from "path";

export function loadRootEnv() {
  const envPath = path.resolve(process.cwd(), "../../.env");
  dotenv.config({ path: envPath });
}
