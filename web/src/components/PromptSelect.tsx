import { useEffect, useState } from "react";

import { api } from "@/lib/axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useApp } from "@/hooks/useApp";

type Prompt = {
  id: string;
  title: string;
  template: string;
};

export function PromptSelect() {
  const { onPromptSelect } = useApp();

  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPrompts();
  }, []);

  async function loadPrompts() {
    try {
      setIsLoading(true);
      const response = await api.get("/prompts");
      setPrompts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangePrompt(promptId: string) {
    const selectedPrompt = prompts!.find((prompt) => prompt.id === promptId);
    onPromptSelect(selectedPrompt!.template);
  }

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-sm">Carregando prompts...</p>
    );
  }

  if (!prompts) {
    return (
      <p className="text-muted-foreground text-sm">
        Não foi possível carregas os prompts.
      </p>
    );
  }

  return (
    <Select onValueChange={handleChangePrompt}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts!.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
