import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENTS = {
  APPLICATION_PORT: Number(process.env.APPLICATION_PORT),
};
