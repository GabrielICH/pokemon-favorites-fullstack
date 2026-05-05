import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() body: CreateFavoriteDto): Promise<Favorite> {
    return this.favoritesService.create(body);
  }
  @Get()
  findAll(): Promise<Favorite[]> {
    return this.favoritesService.findAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.favoritesService.remove(id);
  }
}
