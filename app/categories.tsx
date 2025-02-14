import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import ShopCategories from "@/components/ShopCategories";

const Categories = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="h-full bg-white gap-8">
        <TouchableOpacity
          className="size-12 bg-light-2 rounded-full flex items-center justify-center"
          onPress={() => router.back()}
        >
          <Image source={icons.arrow} resizeMode="cover" />
        </TouchableOpacity>
        <ShopCategories />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
