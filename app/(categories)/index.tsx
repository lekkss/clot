import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ShopCategories from "@/components/ShopCategories";
import Back from "@/components/Back";
import Loading from "@/components/Loading";
import { useCategoriesQuery } from "@/hooks/use-product";
const Categories = () => {
  const { isLoading } = useCategoriesQuery();
  if (isLoading) return <Loading />;
  return (
    <SafeAreaView className="bg-white p-6">
      <View className="gap-8 h-full">
        <Back />
        <ShopCategories />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
