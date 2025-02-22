import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../app/api/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface CartItemType extends Product {
  quantity: number;
}
const CART_QUERY_KEY = ["cart"];

export const useCart = () => {
  const CART_STORAGE_KEY = "cart";
  const queryClient = useQueryClient();

  // Load cart from AsyncStorage
  const { data: cart = [] } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async (): Promise<CartItemType[]> => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (error) {
        console.error("Error loading cart:", error);
        return [];
      }
    },
    staleTime: Infinity, // Keeps cart cached
  });

  // Mutation to update cart
  const updateCartMutation = useMutation({
    mutationFn: async (newCart: CartItemType[]) => {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      return newCart;
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(CART_QUERY_KEY, newCart);
    },
  });

  // Add to Cart
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const newCart = existingItem
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    updateCartMutation.mutate(newCart);
  };

  // Increase Quantity
  const increaseQuantity = (productId: number) => {
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartMutation.mutate(newCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (productId: number) => {
    const newCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0

    updateCartMutation.mutate(newCart);
  };

  // Remove from Cart
  const removeFromCart = (productId: number) => {
    const newCart = cart.filter((item) => item.id !== productId);
    updateCartMutation.mutate(newCart);
  };

  // Clear Cart
  const clearCart = () => {
    updateCartMutation.mutate([]);
    async () => {
      try {
        await AsyncStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
};
