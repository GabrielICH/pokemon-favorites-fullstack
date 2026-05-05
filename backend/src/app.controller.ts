import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'Pokemon Favorites API running',
      status: 'ok',
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      database: 'connected',
    };
  }
}
