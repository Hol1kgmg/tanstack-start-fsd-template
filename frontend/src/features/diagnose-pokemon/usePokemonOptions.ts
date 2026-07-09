"use client";

import { useAtomValue } from "jotai";

import { usePokemonList } from "#/entities/pokemon";
import type { PokemonId, PokemonListItem, PokemonName } from "#/entities/pokemon";
import { isJaAtom } from "#/shared/state/langAtom";

export type PokemonOption = { value: PokemonId; label: string };

const toLabel = (id: PokemonId, name: PokemonName): string =>
  `${String(id).padStart(3, "0")} - ${name}`;

const toOption = (item: PokemonListItem, isJa: boolean): PokemonOption => ({
  value: item.id,
  label: toLabel(item.id, isJa ? item.nameJa : item.name),
});

export const usePokemonOptions = () => {
  const isJa = useAtomValue(isJaAtom);
  const { pokemonList, loading, error } = usePokemonList();

  const options = pokemonList.map((item) => toOption(item, isJa));

  return { options, loading, error };
};
