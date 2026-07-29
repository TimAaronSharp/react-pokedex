import './App.css'
import { pokemonService } from './services/PokemonService.ts'

async function getPokemon() {
  await pokemonService.getPokemon()
}

function App() {
  return (
    <>
      <button onClick={getPokemon}>Get Pokemon</button>
    </>
  )
}

export default App
