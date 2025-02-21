import { API_CONFIG } from "./config";

class ProductApi {
  getProducts = async (limit: number, skip: number) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    return data;
  };

  getProductById = async (id: number) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  };
  searchProducts = async (query: string) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/products/search?q=${query}`
    );
    const data = await response.json();
    return data;
  };

  getCategories = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  };

  getCategoryList = async () => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/products/category-list`
    );
    const data = await response.json();
    return data;
  };

  getProductsByCategory = async (category: string) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/products/category/${category}`
    );
    const data = await response.json();
    return data;
  };
}

export const productApi = new ProductApi();
