import { create } from 'zustand';

export interface Favorite {
  id: string;
  pokemonId: number;
  name: string;
  imageUrl: string;
  types: string[];
  note?: string;
}

interface FavoritesStore {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],

  setFavorites: (favorites) =>
    set({
      favorites,
    }),

  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [favorite, ...state.favorites],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (favorite) => favorite.id !== id,
      ),
    })),
}));