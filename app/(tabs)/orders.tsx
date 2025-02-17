import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Empty from "@/components/Empty";
import images from "@/constants/images";

const Orders = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <Text className="text-center font-semibold text-lg">Orders</Text>
      <Empty heading="No Orders Yet" image={images.order} />
    </SafeAreaView>
  );
};

export default Orders;
