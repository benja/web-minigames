import useSWR from "swr";
import { Game } from "@wmg/shared";

export function useGames() {
  return useSWR<Game[]>("/games");
}
