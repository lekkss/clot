import { useLocalStorage } from "./use-localstorage";
import { Product } from "../api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useFavorite() {
  const [favorites, setFavorites] = useLocalStorage<Product[]>("favorites", []);

  const queryClient = useQueryClient();

  const addToFavorites = useMutation({
    mutationFn: async (product: Product) => {
      const isExist = favorites.some((p) => p.id === product.id);
      if (isExist) {
        return;
      }
      // Assuming you want to store favorites in localStorage
      const updatedFavorites = [...favorites, product];
      console.log(updatedFavorites, "updatedFavorites");

      setFavorites(updatedFavorites);
      return updatedFavorites; // Return the updated list
    },
    onSuccess: (updatedFavorites) => {
      if (updatedFavorites) {
        setFavorites(updatedFavorites);
      }
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: async (product: Product) => {
      setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const clearFavorites = useMutation({
    mutationFn: async () => {
      setFavorites([]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite: (product: Product) =>
      favorites.some((p) => p.id === product.id),
  };
}
