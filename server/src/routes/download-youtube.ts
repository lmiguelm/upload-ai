import { FastifyInstance } from "fastify";
import ytdl from "ytdl-core";
import { z } from "zod";

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function downloadYoutubeVideo(app: FastifyInstance) {
  app.post("/videos/youtube/download", async (request, response) => {
    const bodyScheme = z.object({
      url: z.string(),
    });

    const { url } = bodyScheme.parse(request.body);

    const uploadDestinationDir = path.resolve(__dirname, "../", "../", "tmp");
    const uploadDestination = path.resolve(uploadDestinationDir, "youtube.mp4");

    if (!fs.existsSync(uploadDestinationDir)) {
      fs.mkdirSync(uploadDestinationDir, { recursive: true });
    }

    await pump(
      ytdl(url, { quality: 0 }),
      fs.createWriteStream(uploadDestination)
    );

    response.header("Content-Type", "video/mp4");
    return response.send(fs.createReadStream(uploadDestination));
  });
}
