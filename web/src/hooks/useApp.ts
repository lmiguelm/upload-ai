import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export function useApp() {
  return useContext(AppContext);
}
