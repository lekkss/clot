import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import Button from "@/components/Buttton";
import { router } from "expo-router";
const Placed = () => {
  return (
    <SafeAreaView className="relative flex-1 bg-primary-100">
      <View className="flex-1 flex-col items-center">
        {/* Top section with image */}
        <View className="mt-20 items-start justify-start px-4">
          <View className="size-80 flex justify-center items-center">
            <Image
              source={images.placed}
              className="size-full"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom section with white background */}
        <View className="bg-white z-10 absolute  -bottom-10 min-h-[calc(100vh-60vh)] left-0 right-0 rounded-t-3xl px-4 py-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Order Placed
          </Text>
          <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Successfully
          </Text>

          <Text className="text-gray-500 text-center mt-8">
            You will receive an email confirmation
          </Text>

          <Button
            title="See Order details"
            containerStyle="w-full bg-primary-100 py-4 rounded-full mt-auto mb-10"
            textStyle="text-white text-center font-semibold text-lg"
            onPress={() => router.replace("/orders")} //dont give option to go back
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Placed;
