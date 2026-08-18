import { useState } from "react";
import type { PokemonNames } from "../App.tsx";
import { type PokemonData } from "../services/PokemonService"
import { GetPokemonNames } from "./GetPokemonNames.tsx";
import { GetPokemonTypes } from "./GetPokemonTypes.tsx";

function playPokemonCry() {
  const pokemonCry = document.getElementById("pokemon-cry");
  if (pokemonCry instanceof HTMLAudioElement) {
    pokemonCry.play();
  }
}

// NOTE LOOK INTO REACT SKELETONS OR A PLACEHOLDER TEMPLATE COMPONENT OR DUMMY PROPS AND IMPLEMENT FOR WHEN POKEMONINFODISPLAY IS NULL
export function PokemonInfoDisplay() {
  const [pokemonNames, setPokemonNames] = useState<PokemonNames[]>([]);
  const [pokemonInfo, setPokemonInfo] = useState<PokemonData>();

  function handleSetPokemonNames(names: PokemonNames[]) {
    setPokemonNames(names);
  }

  function handleSetPokemonInfo(pokemonFetchInfo: PokemonData) {
    setPokemonInfo(pokemonFetchInfo);
  }
  return (
    <>
      <div className="pokedex-body">
        <div className="pokedex-screens-wrapper">
          <div className="pokedex-pokemon-screen">
            <img className="pokemon-img" src={pokemonInfo?.sprites.front_default} alt="" />
          </div>

          <div className="pokedex-info-screen-wrapper">
            {/* NOTE Work on keeping the "info screen" rendered when a pokemon hasn't been selected yet. */}
            {pokemonInfo && (
              <div className="pokedex-info-screen">
                <span>Id: {pokemonInfo?.id}</span>
                <span>Species: {pokemonInfo?.species.name}</span>
                <div className="pokedex-ht-wt-wrapper">
                  <span>Ht: {pokemonInfo?.height}</span>
                  <span>Wt: {pokemonInfo?.weight}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* NOTE Work on getting this properly structured/styled inside the pokedex-body. */}
        <GetPokemonNames onNamesFetched={handleSetPokemonNames} onPokemonSelection={handleSetPokemonInfo} pokemonNames={pokemonNames} />
      </div>
      <GetPokemonTypes onPokemonSelection={handleSetPokemonInfo} />
      <button onClick={playPokemonCry}>Cry</button>
      <audio id="pokemon-cry" src={pokemonInfo?.cries.latest}></audio>
    </>
  )
}