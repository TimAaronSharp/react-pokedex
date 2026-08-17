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
      {/* NOTE When prop drilling functions from the level that they are defined in you can either
        make them the same name (handleSetPokemonNames={handleSetPokemonNames}). This will still work,
        but convention says it's clearer to name the internal component logic with the "handle" prefix 
        (the actual function) because it is what is actually handling the action, and "on" prefix 
        (onNamesFetched) for props being passed down because it represents the event that the parent
        component is listening for. */}
      {/* NOTE MORE RELATED TO THIS IN <PokemonInfoDisplay />*/}
      <PokemonInfoDisplay pokemonInfo={pokemonInfo} onNamesFetched={handleSetPokemonNames} onPokemonSelection={handleSetPokemonInfo} pokemonNames={pokemonNames} />
    </>
  )
}

export default App
