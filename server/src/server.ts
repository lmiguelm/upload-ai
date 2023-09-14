import { fastify } from "fastify";

import { ENVIRONMENTS } from "./config/environments";

import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);

app
  .listen({
    port: ENVIRONMENTS.APPLICATION_PORT,
  })
  .then(() =>
    console.log("Server listening on port:", ENVIRONMENTS.APPLICATION_PORT)
  );
