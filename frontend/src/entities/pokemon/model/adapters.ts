import { brand } from "#/shared/lib/branded";

import type { Pokemon, PokemonId, PokemonListItem, PokemonName } from "./types";

type RawPokemon = {
  id: number;
  name: string;
};

type RawPokemonListItem = {
  id: number;
  name: string;
  names: { name: string; language: { name: string } }[];
};

export const toPokemon = (raw: RawPokemon): Pokemon => ({
  id: brand<PokemonId>(raw.id),
  name: brand<PokemonName>(raw.name),
});

const getJapaneseName = (item: RawPokemonListItem): string => {
  const jaHrkt = item.names.find((n) => n.language.name === "ja-Hrkt");
  if (jaHrkt !== undefined) return jaHrkt.name;
  const ja = item.names.find((n) => n.language.name === "ja");
  if (ja !== undefined) return ja.name;
  return item.name;
};

export const toPokemonList = (raw: unknown): PokemonListItem[] =>
  (raw as RawPokemonListItem[]).map((item) => ({
    id: brand<PokemonId>(item.id),
    name: brand<PokemonName>(item.name),
    nameJa: brand<PokemonName>(getJapaneseName(item)),
  }));
