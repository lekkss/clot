import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useCart } from "@/app/context/CartContext";
import { router } from "expo-router";
const CartBadge = () => {
  const { items } = useCart();
  return (
    <TouchableOpacity
      className="size-16 rounded-full bg-primary-100 flex items-center justify-center"
      onPress={() => router.navigate("/cart")}
    >
      <Image source={icons.bag} className="w-5" resizeMode="cover" />
      {items.length > 0 && (
        <View className="absolute -top-2 -right-2 bg-white rounded-full px-2">
          <Text className="text-xs font-semibold">{items.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartBadge;
