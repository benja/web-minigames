import useSWR from "swr";
import { Game } from "@wmg/shared";
import * as querystring from "querystring";

export function useGames(options?: Partial<{
  limit: number;
}>) {
  return useSWR<Game[]>(`/games?${querystring.stringify(options)}`);
}
