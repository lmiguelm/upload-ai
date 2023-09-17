import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENTS = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: String(process.env.DATABASE_URL),
  OPEN_IA_KEY: String(process.env.OPEN_IA_KEY),
  RENDER: "RENDER" in process.env,
};
