import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { categories } from "@/data/categories";

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
        <Text className="text-black-100 font-bold text-3xl">
          Shop by Categories
        </Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex flex-row items-center gap-5 bg-light-2 rounded-md p-3">
              <View className="size-16 rounded-full">
                <Image
                  source={item.image}
                  className="size-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-black-100 text-xl capitalize">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View className="h-3"></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;
