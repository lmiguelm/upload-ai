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

import { useState } from "react";
import { VideoInputForm } from "./VideoInputForm";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";

export function Aside() {
  const [temperature, setTemperature] = useState(0.5);

  return (
    <aside className="w-80 max-sm:w-full space-y-6">
      <VideoInputForm />

      <Separator />

      <form className="space-y-6">
        <div className="space-y-2">
          <Label>Prompt</Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="title">Título do YouTube</SelectItem>
              <SelectItem value="description">Descrição do YouTube</SelectItem>
            </SelectContent>
          </Select>
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
            onValueChange={([value]) => setTemperature(value)}
          />

          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tendem a deixar o resultado mais criativo e com
            possíveis erros
          </span>
        </div>

        <Separator />

        <Button className="w-full gap-2" type="submit">
          Executar <Wand2 className="w-4 h-4" />
        </Button>
      </form>
    </aside>
  );
}
