import type { PokemonNames } from "../App.tsx";
import { type PokemonData } from "../services/PokemonService"
import { GetPokemonNames } from "./GetPokemonNames.tsx";

type PokemonInfo = {
  pokemonInfo?: PokemonData,
  onNamesFetched: (names: PokemonNames[]) => void,
  onPokemonSelection: (pokemonFetchInfo: PokemonData) => void,
  pokemonNames: PokemonNames[]
}

function playPokemonCry() {
  const pokemonCry = document.getElementById("pokemon-cry");
  if (pokemonCry instanceof HTMLAudioElement) {
    pokemonCry.play();
  }
}
// NOTE LOOK INTO REACT SKELETONS OR A PLACEHOLDER TEMPLATE COMPONENT OR DUMMY PROPS AND IMPLEMENT FOR WHEN POKEMONINFODISPLAY IS NULL
export function PokemonInfoDisplay({ pokemonInfo, onNamesFetched, onPokemonSelection, pokemonNames }: PokemonInfo) {
  return (
    <>
      <div className="pokedex-body">
        <div className="pokedex-screens-container">
          <div className="pokedex-screen-pokemon-img">
            <img className="pokemon-img" src={pokemonInfo?.sprites.front_default} alt="" />
          </div>
          <div className="pokedex-screen-info">
            <span>Id: {pokemonInfo?.id}</span>
            <span>Species: {pokemonInfo?.species.name}</span>
            <div className="pokedex-ht-wt">
              <span>Ht: {pokemonInfo?.height}</span>
              <span>Wt: {pokemonInfo?.weight}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* NOTE Work on getting this properly structured/styled inside the pokedex-body. */}
        {/* NOTE When prop drilling a function that was passed down from a parent to a child component
        to ANOTHER child component (<App /> -> <PokemonInfoDisplay /> -> <GetPokemonNames />) you will need
        to pass it on by what this child component knows it as, you cannot refer to the actual function name
        from <App />
        
        Say the function "handleSetPokemonNames()" is defined in <App /> and you've passed it to 
        <PokemonInfoDisplay /> as "onNamesFetched" (onNamesFetched={handleSetPokemonNames}). <PokemonInfoDisplay />
        has no idea/reference to "handleSetPokemonNames()". It only knows that something was sent to it
        as a prop called "onNamesFetched". Because of this, if you need to pass that down to another
        component (<GetPokemonNames />) you would need to pass it down as "onNamesFetched={onNamesFetched}"*/}
        <GetPokemonNames onNamesFetched={onNamesFetched} onPokemonSelection={onPokemonSelection} pokemonNames={pokemonNames} />
      </div>
      <button onClick={playPokemonCry}>Cry</button>
      <audio id="pokemon-cry" src={pokemonInfo?.cries.latest}></audio>
    </>
  )
}