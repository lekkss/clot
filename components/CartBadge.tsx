import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useCart } from "@/hooks/use-cart";
import { router } from "expo-router";
const CartBadge = () => {
  const { cart } = useCart();
  return (
    <TouchableOpacity
      className="relative size-14 rounded-full bg-primary-100 flex items-center justify-center"
      onPress={() => router.navigate("/cart")}
    >
      <Image source={icons.bag} className="w-5" resizeMode="cover" />
      {cart.length > 0 && (
        <View className="absolute top-2 right-1  px-2">
          <Text className="text text-white font-semibold">{cart.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartBadge;
