"use client";

import { useQuery } from "@tanstack/react-query";

import { toPokemonList } from "./model/adapters";
import { pokemonKeys } from "./model/queryKeys";
import type { PokemonListItem } from "./model/types";

const PAGE_SIZE = 30;
const TOTAL = 151;

const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  const offsets = Array.from(
    { length: Math.ceil(TOTAL / PAGE_SIZE) },
    (_, i) => i * PAGE_SIZE,
  );

  const pages = await Promise.all(
    offsets.map(async (offset) => {
      const limit = Math.min(PAGE_SIZE, TOTAL - offset);
      const res = await fetch(`/api/pokemon-list?offset=${offset}&limit=${limit}`);
      if (!res.ok) throw new Error(`pokemon-list error: ${res.status}`);
      return toPokemonList(await res.json());
    }),
  );

  return pages.flat().sort((a, b) => a.id - b.id);
};

export const usePokemonList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: pokemonKeys.list(),
    queryFn: fetchPokemonList,
  });

  return {
    pokemonList: data ?? [],
    loading: isPending,
    error: isError ? "ポケモン一覧の取得に失敗しました。" : null,
  };
};
