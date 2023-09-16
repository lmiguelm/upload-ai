import { OpenAIStream, streamToResponse } from "ai";
import { z } from "zod";

import { FastifyInstance } from "fastify";

import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (request, response) => {
    const bodyScheme = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { temperature, prompt, videoId } = bodyScheme.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcription) {
      return response
        .status(400)
        .send({ error: "Video transcription was not generated yet." });
    }

    const promptMessage = prompt.replace(
      "{transcription}",
      video.transcription
    );

    const openAiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [
        {
          role: "user",
          content: promptMessage,
        },
      ],
      stream: true,
    });

    const stream = OpenAIStream(openAiResponse);

    streamToResponse(stream, response.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
  });
}
