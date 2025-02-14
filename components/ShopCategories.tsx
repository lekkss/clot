import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categories } from "@/data/categories";

const ShopCategories = () => {
  return (
    <View className="gap-4">
      <Text className="text-black-100 font-bold text-xl">
        Shop by Categories
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex flex-row items-center gap-5 bg-light-2 rounded-xl p-3">
            <View className="size-16 rounded-full">
              <Image
                source={item.image}
                className="size-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-black-100 text-lg capitalize">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className="h-3"></View>}
      />
    </View>
  );
};

export default ShopCategories;
