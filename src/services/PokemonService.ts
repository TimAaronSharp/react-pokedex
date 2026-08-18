import { ApiService } from "./ApiService.ts";

type PokemonLinkInfo = {
  name: string,
  url: string
}

export type PokemonData = {
  cries: {
    latest: string
  },
  height: number,
  id: number,
  species: {
    name: string
  },
  sprites: {
    front_default: string
  },
  weight: number
}

type PokemonListResponse = {
  count: number,
  next: string | null,
  previous: string | null,
  results: PokemonLinkInfo[]
}

/*NOTE For some reason in each index of the array of pokemon that is fetched by getting pokemon by type the name and url for the pokemon is inside a pokemon object (pokemon:[pokemon:{ name: , url: }]) instead of just containing the name and url like some of the other fetches. Because of this I needed a wrapper type around the type for the data in each index.*/

type PokemonByTypeWrapper = {
  pokemon: PokemonByTypeData[]
}

type PokemonByTypeData = {
  pokemon: PokemonLinkInfo
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

  async getPokemonTypes(): Promise<PokemonLinkInfo[]> {
    const data = await this.get<PokemonListResponse>("https://pokeapi.co/api/v2/type");
    console.log("Pokemon types retrieved are ", data.results);
    return data.results;
  }

  async getPokemonByType(endpoint: string): Promise<PokemonByTypeData[]> {
    const data = await this.get<PokemonByTypeWrapper>(endpoint);
    console.log("Pokemon returned by type are ", data.pokemon);
    return data.pokemon;
  }
}

export const pokemonService = new PokemonService();