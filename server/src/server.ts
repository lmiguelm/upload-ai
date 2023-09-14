import { fastify } from "fastify";

import { ENVIRONMENTS } from "./config/environments";

const app = fastify();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .listen({
    port: ENVIRONMENTS.APPLICATION_PORT,
  })
  .then(() =>
    console.log("Server listening on port:", ENVIRONMENTS.APPLICATION_PORT)
  );
