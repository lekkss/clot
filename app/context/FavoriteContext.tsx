import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
const SET_FAVORITES = "SET_FAVORITES";

// Define Action Types
type FavoriteAction =
  | { type: typeof ADD_TO_FAVORITES; payload: ProductsPropType }
  | { type: typeof REMOVE_FROM_FAVORITES; payload: number }
  | { type: typeof SET_FAVORITES; payload: ProductsPropType[] };

// Reducer function
const favoriteReducer = (
  state: FavoriteState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, items: action.payload };

    case ADD_TO_FAVORITES:
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state;
      }
      const updatedFavorites = [...state.items, action.payload];
      saveFavoritesToStorage(updatedFavorites);
      return { ...state, items: updatedFavorites };

    case REMOVE_FROM_FAVORITES:
      const filteredFavorites = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveFavoritesToStorage(filteredFavorites);
      return { ...state, items: filteredFavorites };

    default:
      return state;
  }
};

// AsyncStorage helper functions
const FAVORITES_STORAGE_KEY = "favorites";

const saveFavoritesToStorage = async (favorites: ProductsPropType[]) => {
  try {
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

const loadFavoritesFromStorage = async (
  dispatch: React.Dispatch<FavoriteAction>
) => {
  try {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      dispatch({ type: SET_FAVORITES, payload: JSON.parse(storedFavorites) });
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
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

  // Load favorites from AsyncStorage on app start
  useEffect(() => {
    loadFavoritesFromStorage(dispatch);
  }, []);

  const addToFavorites = (product: ProductsPropType) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: product });
  };

  const removeFromFavorites = (productId: number) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
  };

  return (
    <FavoriteContext.Provider
      value={{ items: state.items, addToFavorites, removeFromFavorites }}
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
