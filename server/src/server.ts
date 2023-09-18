import cors from "@fastify/cors";
import { fastify } from "fastify";

import { ENVIRONMENTS } from "./config/environments";

import { createTranscriptionRoute } from "./routes/create-transcription";
import { downloadYoutubeVideo } from "./routes/download-youtube";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();
app.register(cors, { origin: "*" });
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);
app.register(downloadYoutubeVideo);

app
  .listen({
    port: ENVIRONMENTS.PORT,
    host: ENVIRONMENTS.RENDER ? `0.0.0.0` : `localhost`,
  })
  .then(() => console.log("Server listening on port:", ENVIRONMENTS.PORT));
