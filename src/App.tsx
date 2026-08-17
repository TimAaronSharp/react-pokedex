import { useState } from 'react';
import './App.css'
import { GetPokemonNames } from './components/GetPokemonNames.tsx';
import { PokemonInfoDisplay } from './components/PokemonInfoDisplay.tsx';
import { type PokemonData } from './services/PokemonService.ts';

export type PokemonNames = {
  name: string;
  url: string;
}

function App() {
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
      <GetPokemonNames onNamesFetched={handleSetPokemonNames} onPokemonSelection={handleSetPokemonInfo} pokemonNames={pokemonNames} />
      <PokemonInfoDisplay pokemonInfo={pokemonInfo} />
    </>
  )
}

export default App
