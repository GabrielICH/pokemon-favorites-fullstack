import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async findAll(limit = 20, offset = 0) {
    const response = await axios.get(this.baseUrl, {
      params: {
        limit,
        offset,
      },
    });

    return response.data;
  }

  async findOne(id: string) {
    const response = await axios.get(`${this.baseUrl}/${id}`);

    return response.data;
  }
}
