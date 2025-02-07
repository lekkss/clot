import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Buttton";
import { router } from "expo-router";
import images from "@/constants/images";

const Email = () => {
  return (
    <SafeAreaView className="bg-white">
      <View className="h-full flex items-center justify-center gap-8">
        <Image source={images.email} resizeMode="cover" />
        <Text className="text-black-100 text-3xl font-semibold text-center">
          We Sent you an Email to reset your password.
        </Text>
        <Button
          onPress={() => {
            router.replace("/(auth)/sign-in");
          }}
          title="Return to Login"
          containerStyle="bg-primary-100 rounded-full w-fit"
          textStyle="text-white font-semibold"
        />
      </View>
    </SafeAreaView>
  );
};

export default Email;
