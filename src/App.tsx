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
      {/* NOTE This line checks if the "pokemonInfo" variable exists/is undefined. If it is not
      then it will render the component. */}
      <PokemonInfoDisplay pokemonInfo={pokemonInfo} />
    </>
  )
}

export default App
