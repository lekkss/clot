import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/app/api/product";

export const PRODUCT_QUERY_KEY = {
  products: (limit: number, skip: number) => ["products", limit, skip] as const,
  productById: (id: number) => ["product", id] as const,
  searchProducts: (query: string) => ["search", query] as const,
  categories: () => ["categories"] as const,
  categoryList: () => ["category-list"] as const,
};
export function useProductQuery(limit: number, skip: number) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY.products(limit, skip),
    queryFn: () => productApi.getProducts(limit, skip),
  });
}

export function useProductByIdQuery(id: number) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY.productById(id),
    queryFn: () => productApi.getProductById(id),
  });
}

export function useSearchProductsQuery(query: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY.searchProducts(query),
    queryFn: () => productApi.searchProducts(query),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY.categories(),
    queryFn: () => productApi.getCategories(),
  });
}

export function useProductByCategoryQuery(category: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY.categoryList(),
    queryFn: () => productApi.getProductsByCategory(category),
  });
}
