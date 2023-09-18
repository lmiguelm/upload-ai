import { useApp } from "@/hooks/useApp";
import { api } from "@/lib/axios";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Upload } from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { InputVideo } from "./InputVideo";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

type InputMethod = "youtube" | "file";

type Status =
  | "waiting"
  | "downloading"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

type StatusFeedback = {
  [status in Status]: {
    message: string;
    Icon?: () => React.ReactNode;
  };
};

const statusFeedbacks: StatusFeedback = {
  waiting: {
    message: "Carregar vídeo",
    Icon: () => <Upload className="w-4 h-4" />,
  },
  downloading: {
    message: "Baixando...",
  },
  converting: {
    message: "Convertendo...",
  },
  generating: {
    message: "Transcrevendo...",
  },
  uploading: {
    message: "Carregando",
  },
  success: {
    message: "Sucesso!",
  },
  error: {
    message: "Erro!",
  },
};

export function VideoInputForm() {
  const { onVideoUploaded } = useApp();

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const [status, setStatus] = useState<Status>("waiting");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<InputMethod | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  useEffect(() => {
    if (status !== "waiting") {
      setStatus("waiting");
    }

    onVideoUploaded("");
  }, [videoFile, inputMethod, youtubeUrl]);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files.item(0);

    setVideoFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    console.log("Convert started.");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress: " + Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mp3" });
    const audioFile = new File([audioFileBlob], "output.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finished.");

    return audioFile;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const prompt = promptInputRef.current?.value;
      let video = videoFile;

      if (
        !inputMethod ||
        (inputMethod === "file" && !videoFile) ||
        (inputMethod === "youtube" && !youtubeUrl)
      ) {
        return;
      }

      if (inputMethod === "youtube") {
        setStatus("downloading");

        const response = await api.post(
          "/videos/youtube/download",
          {
            url: youtubeUrl,
          },
          { responseType: "blob" }
        );

        const videoBlob = new Blob([response.data], { type: "video/mp4" });

        video = new File([videoBlob], "youtube.mp4", { type: "video/mp4" });
      }

      setStatus("converting");
      const audio = await convertVideoToAudio(video!);

      const data = new FormData();
      data.append("file", audio);

      setStatus("uploading");
      const videoResponse = await api.post("/videos", data);

      const videoId = videoResponse.data.id;

      setStatus("generating");
      await api.post(`/videos/${videoId}/transcription`, { prompt });

      setStatus("success");

      onVideoUploaded(videoId);
    } catch (error) {
      setVideoFile(null);
      setStatus("error");
    }
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  const { Icon, message } = statusFeedbacks[status];

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div className="space-y-2">
        <Label>Tipo de entrada</Label>

        <Select
          disabled={
            status !== "waiting" && status !== "success" && status !== "error"
          }
          onValueChange={(value) => setInputMethod(value as InputMethod)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="file">Upload de Arquivo</SelectItem>
            <SelectItem value="youtube">Link do YouTube</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {inputMethod === "file" && (
        <InputVideo
          previewUrl={previewUrl}
          onChange={handleFileSelected}
          onRemoveFile={() => setVideoFile(null)}
          disabled={
            status !== "error" && status !== "waiting" && status !== "success"
          }
        />
      )}

      {inputMethod === "youtube" && (
        <div className="space-y-2">
          <Label htmlFor="youtube-url">Informe o link do vídeo</Label>

          <Textarea
            id="youtube-url"
            className="h-20 resize-none leading-relaxed"
            placeholder="Ex: https://www.youtube.com/"
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)}
            disabled={
              status !== "error" && status !== "waiting" && status !== "success"
            }
          />
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>

        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="h-20 resize-none leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (.)"
          disabled={
            status !== "error" && status !== "waiting" && status !== "success"
          }
        />
      </div>

      <Button
        type="submit"
        disabled={
          status != "waiting" ||
          !inputMethod ||
          (inputMethod === "file" && !videoFile) ||
          (inputMethod === "youtube" && !youtubeUrl)
        }
        data-success={status === "success"}
        data-error={status === "error"}
        className="w-full gap-2 data-[success=true]:bg-emerald-400 data-[error=true]:bg-destructive"
      >
        {message}
        {Icon && <Icon />}
      </Button>
    </form>
  );
}
