import type { PokemonId, PokemonName } from "#/entities/pokemon";

export type MatchRequest = { id_a: PokemonId; id_b: PokemonId };

export type RawMatchResult = {
  score: number;
  name_a: string;
  name_b: string;
  img_a: string;
  img_b: string;
};

export type MatchResult = {
  score: number;
  nameA: PokemonName;
  nameB: PokemonName;
  imgA: string;
  imgB: string;
};
