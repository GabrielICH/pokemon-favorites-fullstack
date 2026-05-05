import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Favorite } from '../../favorites/entities/favorite.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FavoritesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Socket client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Socket client disconnected: ${client.id}`);
  }

  emitFavoriteAdded(favorite: Favorite) {
    console.log('Emitting socket event: favorite:added');
    this.server.emit('favorite:added', favorite);
  }

  emitFavoriteRemoved(id: string) {
    console.log('Emitting socket event: favorite:removed');
    this.server.emit('favorite:removed', { id });
  }
}
