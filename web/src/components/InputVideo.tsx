import { FileVideo } from "lucide-react";
import { ComponentProps } from "react";
import { Label } from "./ui/label";

type Props = ComponentProps<"input"> & {
  previewUrl: string | null;
};

export function InputVideo(props: Props) {
  return (
    <>
      <Label
        className="relative border flex w-full rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 transition-colors"
        htmlFor="video"
      >
        {!!props.previewUrl ? (
          <video
            src={props.previewUrl}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="h-4 w-4" />
            Selecione um vídeo
          </>
        )}
      </Label>

      <input
        {...props}
        className="sr-only"
        type="file"
        name="file"
        id="video"
        accept="video/mp4"
      />
    </>
  );
}
