import Back from "@/components/Back";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddress } from "@/hooks/use-address";
import { useFocusEffect } from "@react-navigation/native";

const Address = () => {
  const { address } = useAddress();
  useFocusEffect(useCallback(() => {}, [address]));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white flex flex-col gap-4  p-4">
        <Back name="Address" />
        <View className="flex-1 bg-white flex flex-col gap-4 mt-5">
          <View className="flex-1 bg-white flex flex-col gap-4  ">
            {address.map((address) => (
              <View
                key={address.id}
                className="flex-row justify-between items-center gap-2 rounded-lg p-4 py-5 bg-light-2"
              >
                <Text
                  className="text-base max-w-[70%] truncate"
                  numberOfLines={1}
                >
                  {`${address.street} ${address.city}, ${address.state} ${address.zip}`}
                </Text>
                <TouchableOpacity>
                  <Text className="text-primary-100">Edit</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            className="bg-primary-100 rounded-full p-4"
            onPress={() => router.push("/add-address")}
          >
            <Text className="text-white text-center text-base font-semibold">
              Add Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;
