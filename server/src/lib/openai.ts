import { OpenAI } from "openai";
import { ENVIRONMENTS } from "../config/environments";

export const openai = new OpenAI({
  apiKey: ENVIRONMENTS.OPEN_IA_KEY,
});
