import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import { fastifyMultipart } from "@fastify/multipart";
import { FastifyInstance } from "fastify";

import { prisma } from "../lib/prisma";

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_756 * 25, // 25mb
    },
  });

  app.post("/videos", async (request, response) => {
    const data = await request.file();

    if (!data) {
      return response.status(400).send({ error: "Missing file input." });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return response
        .status(400)
        .send({ error: "Invalid input type, please upload a MP3." });
    }

    const videoId = randomUUID();
    const fileUploadName = `${videoId}${extension}`;

    const uploadDestination = path.resolve(
      __dirname,
      "../",
      "../",
      "tmp",
      fileUploadName
    );

    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        id: videoId,
        name: fileUploadName,
        path: uploadDestination,
      },
    });

    return video;
  });
}
