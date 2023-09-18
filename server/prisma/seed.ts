import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: "Resumo",
      template: `Seu papel é gerar um resumo do vídeo.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar o resumo.

Use palavras chamativas e que cativam a atenção de quem está lendo.

Além disso, no final da descrição inclua uma lista de 3 até 10 hashtags em letra minúscula contendo palavras-chave do vídeo.

O retorno deve seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Traduzir",
      template: `Seu papel é traduzir o vídeo para português (Brasil).
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar a tradução.

O retorno deve seguir o seguinte formato:
'''
Descrição.
'''

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Gerar Título",
      template: `Seu papel é gerar sugestões de título para o vídeo.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar os títulos com base na transcrição.

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
