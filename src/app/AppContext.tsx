"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Summary, Opinion, Segment, Color } from "./types";
import { getNextOpinion, getOpinionFromId} from "./sample_data";
import { colors } from "./annotations/opinions/ColorSelector";
import api from "./api";

type AppContextType = {
  hasStarted: boolean;
  setHasStarted: (v: boolean) => void;
  tokenError: boolean;
  onStart: (token: string) => void;
  summaries: Summary[];
  setSummaries: (s: Summary[]) => void;
  opinion: Opinion | null;
  segments: { [key: string]: Segment };
  setSegments: (s: { [key: string]: Segment }) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  selectedColor: Color;
  setSelectedColor: (c: Color) => void;
  availableColors: string[];
  setAvailableColors: (arr: string[]) => void;
  handleNext: () => void;
  token: string;
  setToken: (t: string) => void;
  opinionFromId: (id: string) => void
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [opinion, setOpinion] = useState<Opinion | null>(null);
  const [segments, setSegments] = useState<{ [key: string]: Segment }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color>(Object.values(colors)[0][3]);
  const [availableColors, setAvailableColors] = useState<string[]>([Object.keys(colors)[0]]);
  const [token, setToken] = useState("");

  const handleNext = () => {
    setIsLoading(true);
    getNextOpinion(setOpinion);
    setSegments({});
    setSummaries([]);
    setAvailableColors([Object.keys(colors)[0]]);
    setSelectedColor(Object.values(colors)[0][3]);
    setIsLoading(false);
  };

  const opinionFromId =(opinionId: string) => {
    setIsLoading(true);
    getOpinionFromId(setOpinion, opinionId)
    setSegments({});
    setSummaries([]);
    setAvailableColors([Object.keys(colors)[0]]);
    setSelectedColor(Object.values(colors)[0][3]);
    setIsLoading(false);
  }

  const onStart = (token: string) => {
    api.post("/check-token", JSON.stringify({ token }))
      .then((res) => {
        localStorage.setItem("token", token);
        setTokenError(false);
        setHasStarted(true);
      })
      .catch(() => setTokenError(true));
  };

  useEffect(() => {
    if (hasStarted) handleNext();
  }, [hasStarted]);

  return (
    <AppContext.Provider value={{
      hasStarted, setHasStarted, tokenError, onStart,
      summaries, setSummaries, opinion,
      segments, setSegments, isLoading, setIsLoading,
      selectedColor, setSelectedColor,
      availableColors, setAvailableColors,
      handleNext, token, setToken, opinionFromId
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
