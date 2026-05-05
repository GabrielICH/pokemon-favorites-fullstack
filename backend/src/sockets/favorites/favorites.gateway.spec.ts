import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesGateway } from './favorites.gateway';

describe('FavoritesGateway', () => {
  let gateway: FavoritesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesGateway],
    }).compile();

    gateway = module.get<FavoritesGateway>(FavoritesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
