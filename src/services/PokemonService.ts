
type PokemonLinkInfo = {
  name: string;
  url: string;
}

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonLinkInfo[]
}

class PokemonService {

  async getPokemonNames(): Promise<PokemonLinkInfo[]> {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${res.status}`);
    }

    const data: PokemonListResponse = await res.json();
    return data.results;
  }
}

export const pokemonService = new PokemonService();