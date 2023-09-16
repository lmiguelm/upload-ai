import cors from "@fastify/cors";
import { fastify } from "fastify";

import { ENVIRONMENTS } from "./config/environments";

import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();
app.register(cors, { origin: "*" });
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: ENVIRONMENTS.APPLICATION_PORT,
  })
  .then(() =>
    console.log("Server listening on port:", ENVIRONMENTS.APPLICATION_PORT)
  );
