import { useApp } from "@/hooks/useApp";
import { Textarea } from "./ui/textarea";

export function Content() {
  const { input, handleInputChange, generated } = useApp();

  console.log(generated);

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="max-sm:h-40 resize-none p-5 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={input}
          onChange={handleInputChange}
        />

        <Textarea
          readOnly
          className="resize-none p-5 leading-relaxed"
          placeholder="Resultado gerado pela IA..."
          value={generated}
        />
      </div>

      <p className="text-sm text-muted-foreground max-sm:text-center">
        Lembre-se: você pode utilizar a variável
        <code className="text-violet-400">{" {transcription} "}</code>
        no seu prompt para adicionar o conteúdo da transcrição do vídeo
        selecionado.
      </p>
    </div>
  );
}
