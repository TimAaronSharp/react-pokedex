import './App.css'
import { PokemonInfoDisplay } from './components/PokemonInfoDisplay.tsx';

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
