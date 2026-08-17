import { useState } from 'react';
import './App.css'
import GetPokemonNames from './components/GetPokemonNames.tsx';

export type PokemonNames = {
  name: string;
  url: string;
}

function App() {
  const [pokemonNames, setPokemonNames] = useState<PokemonNames[]>([]);

  return (
    <GetPokemonNames setPokemonNames={setPokemonNames} pokemonNames={pokemonNames} />
  )
}

export default App
