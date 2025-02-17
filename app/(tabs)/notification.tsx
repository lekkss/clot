import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Button from "@/components/Buttton";
import { router } from "expo-router";
import Empty from "@/components/Empty";

const Notification = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Text className="text-center font-semibold text-lg">Notifications</Text>
      <Empty heading="No Notifications Yet" image={icons.bell} />
    </SafeAreaView>
  );
};

export default Notification;
