import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductsPropType } from "@/data/products";

// Define Cart Item type
export interface CartItemType extends ProductsPropType {
  quantity: number;
  size: string;
  color: string;
}

// Define Context State Type
interface CartState {
  items: CartItemType[];
}

// Define Context Value Type
interface CartContextType extends CartState {
  addToCart: (
    product: ProductsPropType,
    size: string,
    color: string,
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
// Define Action Types
type CartAction =
  | { type: typeof ADD_TO_CART; payload: CartItemType }
  | { type: typeof REMOVE_FROM_CART; payload: number }
  | { type: typeof INCREASE_QUANTITY; payload: number }
  | { type: typeof DECREASE_QUANTITY; payload: number }
  | { type: typeof REMOVE_ALL_ITEMS };

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case REMOVE_ALL_ITEMS:
      return {
        ...state,
        items: [],
      };

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

  const addToCart = (
    product: ProductsPropType,
    size: string,
    color: string
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, size, color, quantity: 1 },
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
