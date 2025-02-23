import { useMutation } from "@tanstack/react-query";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}
const ADDRESS_QUERY_KEY = ["address"];

export const useAddress = () => {
  const ADDRESS_STORAGE_KEY = "address";
  const queryClient = useQueryClient();

  // Load cart from AsyncStorage
  const { data: address = [] } = useQuery({
    queryKey: ADDRESS_QUERY_KEY,
    queryFn: async (): Promise<Address[]> => {
      try {
        const storedAddress = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY);
        return storedAddress ? JSON.parse(storedAddress) : [];
      } catch (error) {
        console.error("Error loading address:", error);
        return [];
      }
    },
    staleTime: Infinity, // Keeps cart cached
  });

  // Mutation to update cart
  const updateAddressMutation = useMutation({
    mutationFn: async (newAddress: Address[]) => {
      await AsyncStorage.setItem(
        ADDRESS_STORAGE_KEY,
        JSON.stringify(newAddress)
      );
      return newAddress;
    },
    onSuccess: (newAddress) => {
      queryClient.setQueryData(ADDRESS_QUERY_KEY, newAddress);
    },
  });

  const addAddress = (newAddress: Address) => {
    const updatedAddress = [...address, newAddress];
    updateAddressMutation.mutate(updatedAddress);
  };

  const setAddresses = (newAddresses: Address[]) => {
    updateAddressMutation.mutate(newAddresses);
  };

  return { address, addAddress, setAddresses };
};
