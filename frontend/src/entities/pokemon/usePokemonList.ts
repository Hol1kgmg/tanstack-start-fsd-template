"use client";

import { useEffect, useState } from "react";

import { toPokemonList } from "./model/adapters";
import type { PokemonListItem } from "./model/types";

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const PAGE_SIZE = 30;
    const TOTAL = 151;
    let cancelled = false;

    const offsets = Array.from(
      { length: Math.ceil(TOTAL / PAGE_SIZE) },
      (_, i) => i * PAGE_SIZE,
    );

    Promise.all(
      offsets.map(async (offset) => {
        const limit = Math.min(PAGE_SIZE, TOTAL - offset);
        const res = await fetch(`/api/pokemon-list?offset=${offset}&limit=${limit}`);
        if (!res.ok) throw new Error(`pokemon-list error: ${res.status}`);
        return toPokemonList(await res.json());
      }),
    )
      .then((pages) => {
        if (cancelled) return;
        setPokemonList(pages.flat().sort((a, b) => a.id - b.id));
      })
      .catch(() => {
        if (cancelled) return;
        setError("ポケモン一覧の取得に失敗しました。");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pokemonList, loading, error };
};
