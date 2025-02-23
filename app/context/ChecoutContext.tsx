import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Address } from "./AddressContext";
import { CartItemType } from "@/hooks/use-cart";
// Define Checkout State Type
interface CheckoutState {
  cartItems: CartItemType[];
  shippingAddress: Omit<Address, "id">;
  paymentMethod: "card" | "paypal";
  cardDetails?: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

// Define Checkout Context Type
interface CheckoutContextType extends CheckoutState {
  setShippingAddress: (address: Omit<Address, "id">) => void;
  setPaymentMethod: (method: "card" | "paypal") => void;
  setCardDetails: (details: CheckoutState["cardDetails"]) => void;
  setCartItems: (items: CartItemType[]) => void;
  completeCheckout: () => Promise<void>;
  clearCheckout: () => void;
}

// Initial State
const initialState: CheckoutState = {
  cartItems: [],
  shippingAddress: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  paymentMethod: "card",
  cardDetails: undefined,
};

// Create Context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Provider Props
interface CheckoutProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [checkoutState, setCheckoutState] =
    useState<CheckoutState>(initialState);

  // Load stored checkout data on mount
  useEffect(() => {
    const loadCheckoutData = async () => {
      const savedData = await AsyncStorage.getItem("checkoutData");
      if (savedData) {
        setCheckoutState(JSON.parse(savedData));
      }
    };
    loadCheckoutData();
  }, []);

  // Save checkout data to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("checkoutData", JSON.stringify(checkoutState));
  }, [checkoutState]);

  // Set shipping address
  const setShippingAddress = (address: Omit<Address, "id">) => {
    setCheckoutState((prev) => ({ ...prev, shippingAddress: address }));
  };

  // Set payment method
  const setPaymentMethod = (method: "card" | "paypal") => {
    setCheckoutState((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Set card details
  const setCardDetails = (details: CheckoutState["cardDetails"]) => {
    setCheckoutState((prev) => ({ ...prev, cardDetails: details }));
  };

  // Set cart items
  const setCartItems = (items: CartItemType[]) => {
    setCheckoutState((prev) => ({ ...prev, cartItems: items }));
  };

  // Complete checkout and clear storage
  const completeCheckout = async () => {
    console.log("Order placed:", checkoutState);
    await AsyncStorage.removeItem("checkoutData");
    setCheckoutState(initialState);
  };

  // Clear checkout data
  const clearCheckout = () => {
    setCheckoutState(initialState);
    AsyncStorage.removeItem("checkoutData");
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...checkoutState,
        setShippingAddress,
        setPaymentMethod,
        setCardDetails,
        setCartItems,
        completeCheckout,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use context
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
