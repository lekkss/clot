import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
interface Category {
  id: number;
  image: any;
  name: string;
}
const Categories = ({ id, image, name }: Category) => {
  return (
    <View className="flex gap-2 items-center m-1">
      <View className="size-24">
        <Image source={image} className="size-full" resizeMode="cover" />
      </View>
      <Text className="text-lg">{name}</Text>
    </View>
  );
};

export default Categories;
