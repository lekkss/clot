import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { productApi } from "@/app/api/product";
import { Product, Category } from "@/app/api/types";

// Define Product State
interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// Define Context Type
interface ProductContextType extends ProductState {
  fetchProducts: (limit: number, skip: number) => void;
  fetchProductById: (id: number) => void;
  fetchCategories: () => void;
  searchProducts: (query: string) => Promise<Product[]>;
  fetchProductsByCategory: (category: string) => Promise<Product[]>;
}

// Initial State
const initialState: ProductState = {
  products: [],
  categories: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Create Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider Props
interface ProductProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<ProductState>(initialState);

  // Fetch all products
  const fetchProducts = async (limit: number, skip: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productApi.getProducts(limit, skip);
      setState((prev) => ({
        ...prev,
        products: data.products,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load products",
        loading: false,
      }));
    }
  };

  // Fetch a single product by ID
  const fetchProductById = async (id: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productApi.getProductById(id);
      setState((prev) => ({ ...prev, selectedProduct: data, loading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load product details",
        loading: false,
      }));
    }
  };

  // Fetch product categories
  const fetchCategories = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productApi.getCategories();
      setState((prev) => ({ ...prev, categories: data, loading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load categories",
        loading: false,
      }));
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (
    category: string
  ): Promise<Product[]> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productApi.getProductsByCategory(category);
      setState((prev) => ({
        ...prev,
        products: data.products,
        loading: false,
      }));
      return data.products;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load products by category",
        loading: false,
      }));
      return [];
    }
  };

  // Search for products
  const searchProducts = async (query: string): Promise<Product[]> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productApi.searchProducts(query);
      setState((prev) => ({
        ...prev,
        products: data.products,
        loading: false,
      }));
      return data.products;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to search products",
        loading: false,
      }));
      return [];
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts(6, 0);
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProducts,
        fetchProductById,
        fetchCategories,
        searchProducts,
        fetchProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use Product Context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
