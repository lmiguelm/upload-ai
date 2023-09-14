import { fastify } from "fastify";

import { ENVIRONMENTS } from "./config/environments";

import { createTranscriptionRoute } from "./routes/create-transcription";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);

app
  .listen({
    port: ENVIRONMENTS.APPLICATION_PORT,
  })
  .then(() =>
    console.log("Server listening on port:", ENVIRONMENTS.APPLICATION_PORT)
  );
