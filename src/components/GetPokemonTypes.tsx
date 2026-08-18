import { useEffect, useState } from "react"
import { pokemonService } from "../services/PokemonService"

type PokemonType = {
  name: string,
  url: string
}


export function GetPokemonTypes() {

  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  async function getPokemonTypes() {
    const types = await pokemonService.getPokemonTypes();
    setPokemonTypes(types);
  }

  async function handleSubmit() {

  }

  useEffect(() => {
    getPokemonTypes();
    console.log("pokemonTypes are now set as ", pokemonTypes);
  }, []);

  return (
    <>
      {/* {pokemonTypes.map(pokemon => (
        <p>{pokemon.name}</p>
      ))} */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-type-select">Choose Type:</label>
        <select name="pokemon-type" id="" value={selectedUrl} onChange={(e) => setSelectedUrl(e.target.value)}>
          {
            pokemonTypes?.map((pokemonType: PokemonType) => (
              <option key={pokemonType.url} value={pokemonType.url}>{pokemonType.name}</option>
            ))
          }
        </select>
      </form>
    </>
  )
}