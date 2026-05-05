import { useEffect } from 'react';
import { socket } from './services/socket';

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('favorite:added', (data) => {
      console.log('Socket favorite added:', data);
    });

    socket.on('favorite:removed', (data) => {
      console.log('Socket favorite removed:', data);
    });

    return () => {
      socket.off('favorite:added');
      socket.off('favorite:removed');
    };
  }, []);

  return <h1>Pokemon App</h1>;
}

export default App;