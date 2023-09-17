import { useCompletion, UseCompletionHelpers } from "ai/react";
import React, { createContext, useCallback, useState } from "react";

type AppContextData = Partial<Omit<UseCompletionHelpers, "completion">> & {
  videoId: string | null;
  temperature: number;
  isLoading: boolean;
  generated: string;
  onPromptSelect: (prompt: string) => void;
  onVideoUploaded: (videoId: string) => void;
  onTemperatureChanged: (temperature: number) => void;
};

export const AppContext = createContext({} as AppContextData);

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number>(0.5);

  const {
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3001/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const onVideoUploaded = useCallback((videoId: string) => {
    setVideoId(videoId);
  }, []);

  const onTemperatureChanged = useCallback((temperature: number) => {
    setTemperature(temperature);
  }, []);

  return (
    <AppContext.Provider
      value={{
        videoId,
        temperature,
        isLoading,
        generated: completion,
        handleSubmit,
        handleInputChange,
        input,
        setInput,
        onPromptSelect: setInput,
        onVideoUploaded,
        onTemperatureChanged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
