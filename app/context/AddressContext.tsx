import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define Address type
interface Address {
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

// Initial state
const initialState: AddressState = {
  addresses: [
    {
      id: 1,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    {
      id: 2,
      street: "456 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90038",
    },
  ],
};

// Actions
const ADD_ADDRESS = "ADD_ADDRESS";

// Define Action Type
type AddressAction = { type: typeof ADD_ADDRESS; payload: Address };

// Reducer function
const addressReducer = (
  state: AddressState,
  action: AddressAction
): AddressState => {
  switch (action.type) {
    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };
    default:
      return state;
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
  const [state, dispatch] = useReducer(addressReducer, initialState);

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
