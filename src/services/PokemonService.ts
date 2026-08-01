import { ApiService } from "./ApiService.ts";

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

class PokemonService extends ApiService {
  constructor() {
    super("https://pokeapi.co/api/v2/");
  }

  async getPokemonNames(): Promise<PokemonLinkInfo[]> {
    const data = await this.get<PokemonListResponse>("pokemon?limit=100000&offset=0");
    return data.results;
  }
}

export const pokemonService = new PokemonService();