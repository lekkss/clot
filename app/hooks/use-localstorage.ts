import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize state asynchronously
    const loadInitialValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    };

    loadInitialValue();
    return initialValue; // Return initial value while loading
  });

  useEffect(() => {
    const saveValue = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    };

    saveValue();
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
