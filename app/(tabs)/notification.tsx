import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Button from "@/components/Buttton";
import { router } from "expo-router";

const Notification = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Text className="text-center font-semibold text-lg">Notifications</Text>
      <View className="flex items-center justify-center h-full gap-7">
        <Image source={icons.bell} resizeMode="cover" />
        <Text className="text-2xl font-semibold">No Notifications Yet</Text>
        <Button
          onPress={() => {
            router.push("/categories");
          }}
          title="Explore Categories"
          containerStyle="bg-primary-100 rounded-full"
          textStyle="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
