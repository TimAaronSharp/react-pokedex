import { useEffect, useState } from "react"
import { pokemonService } from "../services/PokemonService"

type PokemonType = {
  name: string,
  url: string
}
/*NOTE For some reason in each index of the array of pokemon that is fetched by getting pokemon by type the name and url for the pokemon is inside a pokemon object (pokemon:[pokemon:{ name: , url: }]) instead of just containing the name and url like some of the other fetches. Because of this I needed to make the "PokemonTypeArray" type to be able to properly drill down to the actual data. I'm not happy with needing to do "pokemon.pokemon.url" etc. to render so I will be experiment with it later but moving on for now.*/
type PokemonTypeArray = {
  pokemon: PokemonType
}

export function GetPokemonTypes() {

  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [selectedTypeUrl, setSelectedTypeUrl] = useState<string>("");
  const [pokemonByType, setPokemonByType] = useState<PokemonTypeArray[]>([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string>("");

  async function getPokemonTypes() {
    const types = await pokemonService.getPokemonTypes();
    setPokemonTypes(types);

    /*NOTE The state variable is not accessible until the next render cycle and therefore cannot be accessed during the same execution block that it is set in. This console.log will show that "pokemonTypes" is an empty array because it is in the same execution block that the variable was set in. If you want to verify that the state variable was set you would need to do so in another way, such as rendering it in HTML. */
    // console.log("pokemonTypes are now set as ", pokemonTypes);
  }

  async function handlePokemonTypeSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTypeUrl) return;

    const selectedType = await pokemonService.getPokemonByType(selectedTypeUrl);
    setPokemonByType(selectedType);
  }

  useEffect(() => {
    getPokemonTypes();
  }, []);

  return (
    <>
      <form onSubmit={handlePokemonTypeSubmit}>
        <label htmlFor="pokemon-type-select">Choose Type:</label>
        <select name="pokemon-type" id="pokemon-type-select" value={selectedTypeUrl} onChange={(e) => setSelectedTypeUrl(e.target.value)}>
          <option value="" disabled >Select Type</option>
          {
            pokemonTypes?.map((pokemonType: PokemonType) => (
              <option key={pokemonType.url} value={pokemonType.url}>{pokemonType.name}</option>
            ))
          }
        </select>
        <button type="submit">Get</button>
      </form>
      {pokemonByType.length > 0 && (
        <form action="">
          <label htmlFor="pokemon-select-from-type">Select Pokemon</label>
          <select name="pokemon-by-type-select" id="pokemon-select-from-type" value={selectedPokemonUrl} onChange={(e) => setSelectedPokemonUrl(e.target.value)}>
            {
              pokemonByType?.map((pokemon: PokemonTypeArray) => (
                <option key={`key-for-${pokemon.pokemon.url}`} value={pokemon.pokemon.url}>{pokemon.pokemon.name}</option>
              ))
            }
          </select>
        </form>
      )}
    </>
  )
}