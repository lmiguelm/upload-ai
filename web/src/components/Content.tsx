import { useApp } from "@/hooks/useApp";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

export function Content() {
  const { input, handleInputChange, generated } = useApp();

  const [hasCopied, setHasCopied] = useState<boolean>(false);

  useEffect(() => {}, []);

  function handleCopy() {
    navigator.clipboard.writeText(generated);
    setHasCopied(true);
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="max-sm:h-40 resize-none p-5 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={input}
          onChange={handleInputChange}
        />

        <div className="flex relative">
          <a
            href="#"
            onClick={handleCopy}
            className="absolute right-5 top-5 transition-colors"
          >
            <div
              data-success={hasCopied}
              className="border data-[success=true]:bg-emerald-400 hover:bg-current/5 rounded p-1"
            >
              {hasCopied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </div>
          </a>

          <Textarea
            readOnly
            className="resize-none p-5 leading-relaxed"
            placeholder="Resultado gerado pela IA..."
            value={generated}
          />
        </div>
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
