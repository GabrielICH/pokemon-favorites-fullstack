import { Module } from '@nestjs/common';
import { FavoritesGateway } from './favorites/favorites.gateway';

@Module({
  providers: [FavoritesGateway],
  exports: [FavoritesGateway],
})
export class SocketsModule {}
