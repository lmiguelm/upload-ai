import { FileVideo } from "lucide-react";
import { Label } from "./ui/label";

export function InputVideo() {
  return (
    <>
      <Label
        className="border flex w-full rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 transition-colors"
        htmlFor="video"
      >
        <FileVideo className="h-4 w-4" />
        Selecione um vídeo
      </Label>

      <input
        className="sr-only"
        type="file"
        name="file"
        id="video"
        accept="video/mp4"
      />
    </>
  );
}
