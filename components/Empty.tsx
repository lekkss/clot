import icons from "@/constants/icons";
import { router } from "expo-router";
import React from "react";
import { View, Image, Text } from "react-native";
import Button from "./Buttton";

const Empty = ({ heading, image }: { heading: string; image: any }) => {
  return (
    <View className="flex items-center justify-center h-full gap-7">
      <Image source={image} resizeMode="cover" />
      <Text className="text-2xl font-semibold text-center">{heading}</Text>
      <Button
        onPress={() => {
          router.push("/categories");
        }}
        title="Explore Categories"
        containerStyle="bg-primary-100 rounded-full"
        textStyle="text-white"
      />
    </View>
  );
};

export default Empty;
