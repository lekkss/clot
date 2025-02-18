import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define Address type
export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}

// Define Context State Type
interface AddressState {
  addresses: Address[];
}

// Define Context Value Type
interface AddressContextType extends AddressState {
  addAddress: (address: Omit<Address, "id">) => void;
}

// Actions
const ADD_ADDRESS = "ADD_ADDRESS";
const SET_ADDRESSES = "SET_ADDRESSES";

// Define Action Type
type AddressAction =
  | { type: typeof ADD_ADDRESS; payload: Address }
  | { type: typeof SET_ADDRESSES; payload: Address[] };

// Reducer function
const addressReducer = (
  state: AddressState,
  action: AddressAction
): AddressState => {
  switch (action.type) {
    case ADD_ADDRESS:
      const newAddresses = [...state.addresses, action.payload];
      saveAddressesToStorage(newAddresses);
      return { addresses: newAddresses };

    case SET_ADDRESSES:
      return { addresses: action.payload };

    default:
      return state;
  }
};

// Save to AsyncStorage
const saveAddressesToStorage = async (addresses: Address[]) => {
  try {
    await AsyncStorage.setItem("addresses", JSON.stringify(addresses));
  } catch (error) {
    console.error("Error saving addresses:", error);
  }
};

// Create Context
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Provider Props Type
interface AddressProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(addressReducer, { addresses: [] });

  // Load addresses from AsyncStorage when app starts
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem("addresses");
        if (storedAddresses) {
          dispatch({
            type: SET_ADDRESSES,
            payload: JSON.parse(storedAddresses),
          });
        }
      } catch (error) {
        console.error("Error loading addresses:", error);
      }
    };

    loadAddresses();
  }, []);

  // Function to add a new address
  const addAddress = (newAddress: Omit<Address, "id">) => {
    dispatch({ type: ADD_ADDRESS, payload: { id: Date.now(), ...newAddress } });
  };

  return (
    <AddressContext.Provider value={{ addresses: state.addresses, addAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

// Custom hook to use context
export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
