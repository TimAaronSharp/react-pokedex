import { ApiService } from "./ApiService.ts";

type PokemonLinkInfo = {
  name: string;
  url: string;
}

export type PokemonData = {
  cries: string,
  height: number,
  id: number,
  species: string,
  sprites: {
    front_default: string
  },
  weight: number
}

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonLinkInfo[]
}

class PokemonService extends ApiService {
  // constructor() {
  //   super("https://pokeapi.co/api/v2/");
  // }

  async getPokemonNames(): Promise<PokemonLinkInfo[]> {
    const data = await this.get<PokemonListResponse>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    return data.results;
  }

  async getPokemon(endpoint: string): Promise<PokemonData> {
    const data = await this.get<PokemonData>(endpoint);
    console.log(data);
    return data;
  }
}

export const pokemonService = new PokemonService();