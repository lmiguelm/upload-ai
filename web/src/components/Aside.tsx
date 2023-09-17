import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useApp } from "@/hooks/useApp";
import { PromptSelect } from "./PromptSelect";
import { VideoInputForm } from "./VideoInputForm";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";

export function Aside() {
  const {
    temperature,
    onTemperatureChanged,
    isLoading,
    handleSubmit,
    videoId,
  } = useApp();

  return (
    <aside className="w-80 max-sm:w-full space-y-5">
      <VideoInputForm />

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <PromptSelect />
        </div>

        <div className="space-y-2">
          <Label>Modelo</Label>

          <Select disabled defaultValue="gpt3.5">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>

          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar essa opção em breve
          </span>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label
            htmlFor="temperature"
            className="flex justify-between items-center"
          >
            <span>Temperatura</span>
            <span>{temperature * 100}%</span>
          </Label>

          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={([value]) => onTemperatureChanged(value)}
          />

          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tendem a deixar o resultado mais criativo e com
            possíveis erros
          </span>
        </div>

        <Separator />

        <Button
          disabled={isLoading || !videoId}
          className="w-full gap-2"
          type="submit"
        >
          {!isLoading && <Wand2 className="w-4 h-4" />}
          {isLoading ? "Gerando..." : "Executar"}
        </Button>
      </form>
    </aside>
  );
}
