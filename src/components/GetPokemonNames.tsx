import { useEffect, useState } from "react";
import { pokemonService, type PokemonData } from "../services/PokemonService";
import type { PokemonNames } from "../App.tsx";

type PokemonNamesProps = {
  pokemonNames: PokemonNames[],
  onNamesFetched: (pokemonNames: PokemonNames[]) => void,
  onPokemonSelection: (pokemonInfo: PokemonData) => void
}
// NOTE LOOK OVER THIS STUFF AGAIN.
export function GetPokemonNames({ onNamesFetched, onPokemonSelection, pokemonNames }: PokemonNamesProps) {

  const [selectedUrl, setSelectedUrl] = useState<string>("");

  async function populatePokemonNames() {
    const names = await pokemonService.getPokemonNames();
    onNamesFetched(names);

    if (names.length > 0) {
      setSelectedUrl(names[0].url);
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    /* NOTE This "if" guards against the event that selectedUrl somehow is an empty string
    when the form is submitted. It shouldn't happen with how it is automatically set in
    populatePokemonNames(), but it in the event that the user somehow is able to mash
    the "Get" button and submit the form before the selectedUrl can be set (super
    unlikely), or if in the future changes are made to the code that could break that 
    initial set I think it is good to have this safeguard in place (the scope of this
    project most likely wouldn't change that much, but I still like to build things
    to scale properly).*/
    if (!selectedUrl) return;
    const selectedPokemon = await pokemonService.getPokemon(selectedUrl)
    onPokemonSelection(selectedPokemon);
  }

  useEffect(() => {
    populatePokemonNames();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-select">Choose pokemon:</label>
        <select name="pokemon-name" id="pokemon-name-select" value={selectedUrl} onChange={(e) => setSelectedUrl(e.target.value)}>
          {
            pokemonNames?.map((pokemonName: PokemonNames) => (
              <option key={pokemonName.url} value={pokemonName.url}>{pokemonName.name}</option>
            ))}
        </select>
        <button type="submit">Get</button>
      </form>
    </>
  )
}