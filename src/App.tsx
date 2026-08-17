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
  return (
    <>
      <PokemonInfoDisplay />
    </>
  )
}

export default App
