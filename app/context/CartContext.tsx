import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../api/types";

// Define Cart Item type
export interface CartItemType extends Product {
  quantity: number;
  //   size: string;
  //   color: string;
}

// Define Context State Type
interface CartState {
  items: CartItemType[];
}

// Define Context Value Type
interface CartContextType extends CartState {
  addToCart: (
    product: Product,
    // size: string,
    // color: string,
    quantity: number
  ) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeAllItems: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
};

// Actions
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";
const SET_CART = "SET_CART";

// Define Action Types
type CartAction =
  | { type: typeof ADD_TO_CART; payload: CartItemType }
  | { type: typeof REMOVE_FROM_CART; payload: number }
  | { type: typeof INCREASE_QUANTITY; payload: number }
  | { type: typeof DECREASE_QUANTITY; payload: number }
  | { type: typeof REMOVE_ALL_ITEMS }
  | { type: typeof SET_CART; payload: CartItemType[] };

// AsyncStorage helper functions
const CART_STORAGE_KEY = "cart_items";

const saveCartToStorage = async (cartItems: CartItemType[]) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

const loadCartFromStorage = async (dispatch: React.Dispatch<CartAction>) => {
  try {
    const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      dispatch({ type: SET_CART, payload: JSON.parse(storedCart) });
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let updatedCart;
  switch (action.type) {
    case SET_CART:
      return { ...state, items: action.payload };

    case ADD_TO_CART:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        updatedCart = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [...state.items, { ...action.payload }];
      }
      saveCartToStorage(updatedCart);
      return { ...state, items: updatedCart };

    case REMOVE_FROM_CART:
      updatedCart = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(updatedCart);
      return { ...state, items: updatedCart };

    case INCREASE_QUANTITY:
      updatedCart = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCartToStorage(updatedCart);
      return { ...state, items: updatedCart };

    case DECREASE_QUANTITY:
      updatedCart = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      saveCartToStorage(updatedCart);
      return { ...state, items: updatedCart };

    case REMOVE_ALL_ITEMS:
      saveCartToStorage([]);
      return { ...state, items: [] };

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Props Type
interface CartProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCartFromStorage(dispatch);
  }, []);

  const addToCart = (
    product: Product,
    // size: string,
    // color: string,
    quantity: number
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const increaseQuantity = (productId: number) => {
    dispatch({ type: INCREASE_QUANTITY, payload: productId });
  };

  const decreaseQuantity = (productId: number) => {
    dispatch({ type: DECREASE_QUANTITY, payload: productId });
  };

  const removeAllItems = () => {
    dispatch({ type: REMOVE_ALL_ITEMS });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        removeAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
