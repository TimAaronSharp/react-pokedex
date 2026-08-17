import { type PokemonData } from "../services/PokemonService"

type PokemonInfo = {
    pokemonInfo: PokemonData
}
// NOTE LOOK INTO REACT SKELETONS OR A PLACEHOLDER TEMPLATE COMPONENT OR DUMMY PROPS AND IMPLEMENT FOR WHEN POKEMONINFODISPLAY IS NULL
export function PokemonInfoDisplay({ pokemonInfo }: PokemonInfo) {
    return (
        <>
            <img src={pokemonInfo.sprites.front_default} alt="" />
        </>
    )
}