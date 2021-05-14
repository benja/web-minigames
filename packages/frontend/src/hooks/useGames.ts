import useSWR from 'swr';
import { GameListing } from '@wmg/shared';
import * as querystring from 'querystring';

export function useGames(
  options?: Partial<{
    limit: number;
  }>,
) {
  return useSWR<GameListing[]>(`/games?${querystring.stringify(options)}`);
}
