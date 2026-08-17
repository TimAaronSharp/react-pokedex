import { type PokemonData } from "../services/PokemonService"

type PokemonInfo = {
  pokemonInfo?: PokemonData
}
// NOTE LOOK INTO REACT SKELETONS OR A PLACEHOLDER TEMPLATE COMPONENT OR DUMMY PROPS AND IMPLEMENT FOR WHEN POKEMONINFODISPLAY IS NULL
export function PokemonInfoDisplay({ pokemonInfo }: PokemonInfo) {
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
    </>
  )
}