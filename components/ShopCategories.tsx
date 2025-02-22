import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useCategoriesQuery } from "@/hooks/use-product";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
const ShopCategories = () => {
  const { data: categories, isLoading } = useCategoriesQuery();
  if (isLoading) return <Loading />;
  return (
    <View className="gap-4 mb-32">
      <Text className="text-black-100 font-bold text-xl">
        Shop by Categories
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100 + 100)
              .springify()
              .damping(11)}
          >
            <TouchableOpacity
              onPress={() => router.push(`/${item.name}`)}
              className="flex flex-row items-center gap-5 bg-light-2 rounded-xl p-3"
            >
              {/* <View className="size-16 rounded-full">
              <Image
                source={item.image}
                className="size-full"
                resizeMode="cover"
              />
            </View> */}
              <Text className="text-black-100 text-lg capitalize">
                {item.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View className="h-3"></View>}
      />
    </View>
  );
};

export default ShopCategories;
