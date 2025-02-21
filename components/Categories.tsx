import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { router } from "expo-router";
interface Category {
  id: string;
  image?: any;
  name: string;
}
const Categories = ({ id, image, name }: Category) => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/categories/${name}`)}
      className="flex gap-2 items-center m-1 rounded-lg bg-light-2 p-2"
    >
      {/* <View className="size-24"> */}
      {/* <Image source={image} className="size-full" resizeMode="cover" /> */}
      {/* </View> */}
      <Text className="text-lg capitalize">{name}</Text>
    </TouchableOpacity>
  );
};

export default Categories;
