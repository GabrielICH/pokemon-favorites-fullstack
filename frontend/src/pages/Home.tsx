import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { socket } from '../services/socket';
import { useFavoritesStore } from '../store/favorites.store';

interface Pokemon {
  name: string;
  url: string;
}

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const { favorites, setFavorites, addFavorite, removeFavorite } =
    useFavoritesStore();

  async function handleAddFavorite(name: string) {
    const pokemonResponse = await api.get(`/pokemon/${name}`);
    const pokemon = pokemonResponse.data;

    await api.post('/favorites', {
      pokemonId: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.sprites.front_default,
      types: pokemon.types.map(
        (item: { type: { name: string } }) => item.type.name,
      ),
    });
  }

  async function handleRemoveFavorite(id: string) {
    await api.delete(`/favorites/${id}`);
  }

  useEffect(() => {
    async function loadInitialData() {
      const pokemonResponse = await api.get('/pokemon');
      setPokemons(pokemonResponse.data.results);

      const favoritesResponse = await api.get('/favorites');
      setFavorites(favoritesResponse.data);
    }

    loadInitialData();

    socket.on('favorite:added', addFavorite);
    socket.on('favorite:removed', ({ id }: { id: string }) => {
      removeFavorite(id);
    });

    return () => {
      socket.off('favorite:added', addFavorite);
      socket.off('favorite:removed');
    };
  }, [addFavorite, removeFavorite, setFavorites]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Pokemons</h1>

      {pokemons.map((pokemon) => (
        <div key={pokemon.name}>
          {pokemon.name}{' '}
          <button onClick={() => handleAddFavorite(pokemon.name)}>
            Favorite
          </button>
        </div>
      ))}

      <hr />

      <h1>Favorites</h1>

      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <img src={favorite.imageUrl} width={50} />
          {favorite.name}{' '}
          <button onClick={() => handleRemoveFavorite(favorite.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}