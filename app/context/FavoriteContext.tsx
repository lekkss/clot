import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductsPropType } from "@/data/products";

// Define Context State Type
interface FavoriteState {
  items: ProductsPropType[];
}

// Define Context Value Type
interface FavoriteContextType extends FavoriteState {
  addToFavorites: (product: ProductsPropType) => void;
  removeFromFavorites: (productId: number) => void;
}

// Initial state
const initialState: FavoriteState = {
  items: [],
};

// Actions
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

// Define Action Types
type FavoriteAction =
  | { type: typeof ADD_TO_FAVORITES; payload: ProductsPropType }
  | { type: typeof REMOVE_FROM_FAVORITES; payload: number };

// Reducer function
const favoriteReducer = (
  state: FavoriteState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create Context
const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

// Provider Props Type
interface FavoriteProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  const addToFavorites = (product: ProductsPropType) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: product });
  };

  const removeFromFavorites = (productId: number) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
  };

  return (
    <FavoriteContext.Provider
      value={{
        items: state.items,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use context
export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
