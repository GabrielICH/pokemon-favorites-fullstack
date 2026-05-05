export class CreateFavoriteDto {
  pokemonId: number;
  name: string;
  imageUrl: string;
  types: string[];
  note?: string;
}
