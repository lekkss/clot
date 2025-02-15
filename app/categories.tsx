import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import ShopCategories from "@/components/ShopCategories";
import Back from "@/components/Back";

const Categories = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="h-full bg-white gap-8">
        <Back />
        <ShopCategories />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
