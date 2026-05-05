import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesGateway } from '../sockets/favorites/favorites.gateway';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repo: Repository<Favorite>,
    private readonly favoritesGateway: FavoritesGateway,
  ) {}

  async create(data: CreateFavoriteDto): Promise<Favorite> {
    const existingFavorite = await this.repo.findOne({
      where: {
        pokemonId: data.pokemonId,
      },
    });

    if (existingFavorite) {
      throw new ConflictException('This pokemon is already in favorites');
    }

    const favorite = this.repo.create(data);
    const savedFavorite = await this.repo.save(favorite);

    this.favoritesGateway.emitFavoriteAdded(savedFavorite);

    return savedFavorite;
  }

  async findAll(): Promise<Favorite[]> {
    return this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.repo.delete(id);
    const deleted = Boolean(result.affected);

    if (deleted) {
      this.favoritesGateway.emitFavoriteRemoved(id);
    }

    return { deleted };
  }
}
