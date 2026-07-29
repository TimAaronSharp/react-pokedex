

class PokemonService {

  async getPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/9");
    console.log("res returns ", res.json());
  }
}

export const pokemonService = new PokemonService();