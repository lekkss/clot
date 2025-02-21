import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { router } from "expo-router";
const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white flex flex-col gap-4 items-center justify-center p-4">
        <Image
          source={images.user}
          className="w-full size-24 rounded-full"
          resizeMode="contain"
        />
        <View className="flex-row bg-light-2 w-full items-center  justify-between p-5 rounded-lg">
          <View className="flex flex-col items-start gap-1">
            <Text className="text-xl font-semibold">John Doe</Text>
            <Text className="text-base text-gray-500">johndoe@gmail.com</Text>
            <Text className="text-base text-gray-500">121-224-7890</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-base font-semibold text-primary-100">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col gap-2 mt-4 w-full">
          {["Address", "Wishlist", "Payment", "Help", "Support"].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row bg-light-2 w-full items-center  justify-between p-5 rounded-lg"
                onPress={() => router.push(`/${item.toLowerCase()}` as any)}
              >
                <Text className="text-base">{item}</Text>
                <Image
                  source={icons.arrow}
                  className="w-5 rotate-180"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )
          )}
        </View>
        <TouchableOpacity>
          <Text className="text-base font-semibold text-red">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
