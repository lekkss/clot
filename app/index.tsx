import images from "@/constants/images";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 300);
  });
  return (
    <SafeAreaView className="flex-1 bg-primary-100 h-full items-center justify-center">
      <Image source={images.clot} resizeMode="cover" />
    </SafeAreaView>
  );
}
