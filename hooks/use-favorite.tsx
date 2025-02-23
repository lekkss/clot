import { Product } from "../app/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_QUERY_KEY = ["favorites"];

export function useFavorite() {
  const FAVORITE_STORAGE_KEY = "favorites";
  const queryClient = useQueryClient();

  // Load cart from AsyncStorage
  const { data: favorites = [] } = useQuery({
    queryKey: FAVORITE_QUERY_KEY,
    queryFn: async (): Promise<Product[]> => {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITE_STORAGE_KEY
        );
        return storedFavorites ? JSON.parse(storedFavorites) : [];
      } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
      }
    },
    staleTime: Infinity, // Keeps cart cached
  });

  // Mutation to update cart
  const updateFavoritesMutation = useMutation({
    mutationFn: async (newFavorites: Product[]) => {
      await AsyncStorage.setItem(
        FAVORITE_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(FAVORITE_QUERY_KEY, newFavorites);
    },
  });

  const addToFavorites = (product: Product) => {
    const isExist = favorites.some((p) => p.id === product.id);
    if (isExist) {
      return;
    }
    const updatedFavorites = [...favorites, product];
    updateFavoritesMutation.mutate(updatedFavorites);
  };

  const removeFromFavorites = (product: Product) => {
    const updatedFavorites = favorites.filter((p) => p.id !== product.id);
    updateFavoritesMutation.mutate(updatedFavorites);
  };

  const clearFavorites = () => {
    updateFavoritesMutation.mutate([]);
    async () => {
      try {
        await AsyncStorage.removeItem(FAVORITE_STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing favorites:", error);
      }
    };
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite: (product: Product) =>
      favorites.some((p) => p.id === product.id),
  };
}
