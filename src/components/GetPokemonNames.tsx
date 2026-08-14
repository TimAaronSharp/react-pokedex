import { useEffect, useState } from "react";
import { pokemonService } from "../services/PokemonService";

type PokemonNames = {
  name: string;
  url: string;
}

export default function GetPokemonNames() {
  const [pokemonNames, setPokemonNames] = useState<PokemonNames[]>([]);

  async function populatePokemonNames() {
    setPokemonNames(await pokemonService.getPokemonNames());
  }

  useEffect(() => {
    populatePokemonNames();
  }, []);

  return (
    <>
      <label htmlFor="pokemon-select">Choose pokemon:</label>
      <select name="pokemon-name" id="pokemon-name-select">
        {
          pokemonNames?.map((pokemonName: PokemonNames) => (
            <option key={pokemonName.url} value={pokemonName.url}>{pokemonName.name}</option>
          ))}
      </select>
    </>
  )
}