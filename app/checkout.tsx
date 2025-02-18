import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "@/components/Back";
import icons from "@/constants/icons";
import { useAddress, Address } from "./context/AddressContext";
import AddressModal from "@/components/AddressModal";
import { useSheetRef } from "@/components/Sheet";
import { useCart } from "./context/CartContext";
import Button from "@/components/Buttton";
import { router } from "expo-router";
import { useCheckout } from "./context/ChecoutContext";
const Checkout = () => {
  const addressModalRef = useSheetRef();
  const { addresses } = useAddress();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardDetails, setCardDetails] = useState<{
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const closeFilterModal = () => {
    addressModalRef.current?.dismiss();
  };
  const { items, removeAllItems } = useCart();
  // const { completeCheckout } = useCheckout();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = 10;
  const total = totalPrice + shipping + tax;

  const handlePlaceOrder = () => {
    if (selectedAddress == null) {
      addressModalRef.current?.present();
    } else {
      removeAllItems();
      router.replace("/placed");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full px-4">
      <View className="flex-1 bg-white flex flex-col gap-4">
        <Back name="Checkout" />
        <View className="flex-1 bg-white flex flex-col gap-4 mt-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center bg-light-2 rounded-lg p-4"
            onPress={() => addressModalRef.current?.present()}
          >
            <View className="flex flex-col gap-2">
              <Text className="text-gray-500 text-sm">Shipping Address</Text>
              {selectedAddress ? (
                <Text>{selectedAddress.street}</Text>
              ) : (
                <Text>Add Shipping Address</Text>
              )}
            </View>
            <Image source={icons.arrow} className="size-6 rotate-180" />
          </TouchableOpacity>
        </View>
      </View>
      <AddressModal
        title="Shipping Address"
        modalRef={addressModalRef}
        closeFilterModal={closeFilterModal}
        filters={addresses}
        selectedFilter={selectedAddress}
        setSelectedFilter={setSelectedAddress}
      />

      <View className="gap-4 flex justify-end mb-10">
        <View className="flex flex-row justify-between items-center rounded-lg">
          <Text className="text-gray-500 text-lg">Subtotal</Text>
          <Text className="text-lg">${totalPrice.toFixed(2)}</Text>
        </View>
        <View className="flex flex-row justify-between items-center rounded-lg">
          <Text className="text-gray-500 text-lg">Shipping</Text>
          <Text className="text-lg">${shipping.toFixed(2)}</Text>
        </View>
        <View className="flex flex-row justify-between items-center rounded-lg">
          <Text className="text-gray-500 text-lg">Tax</Text>
          <Text className="text-lg">${tax.toFixed(2)}</Text>
        </View>
        <View className="flex flex-row justify-between items-center rounded-lg">
          <Text className=" text-lg">Total</Text>
          <Text className="font-semibold text-lg">${total.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-primary-100 flex-row items-center justify-between rounded-full p-4"
        onPress={handlePlaceOrder}
      >
        <Text className="text-white text-lg font-semibold">
          ${total.toFixed(2)}
        </Text>
        <Text className="text-white text-lg font">Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Checkout;
