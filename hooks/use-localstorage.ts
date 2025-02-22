import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T | null>(null);

  // Load from AsyncStorage when component mounts
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item)); // Load stored data
        } else {
          setStoredValue(initialValue); // Default if empty
        }
      } catch (error) {
        console.error("Error loading from AsyncStorage:", error);
        setStoredValue(initialValue);
      }
    };

    loadStoredValue();
  }, [key]);

  // Save changes to AsyncStorage whenever storedValue changes
  useEffect(() => {
    if (storedValue !== null) {
      const saveValue = async () => {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
          console.error("Error saving to AsyncStorage:", error);
        }
      };

      saveValue();
    }
  }, [key, storedValue]);

  return [storedValue ?? initialValue, setStoredValue] as const;
}
