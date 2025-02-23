import Back from "@/components/Back";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form/FormField";
import { router } from "expo-router";
import { useAddress } from "@/hooks/use-address";

const AddAddress = () => {
  const { addAddress } = useAddress();

  // Manage form state in one object
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  // Function to handle form input changes
  const handleChange = (field: keyof typeof newAddress, value: string) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Save
  const handleSave = () => {
    if (
      newAddress.street &&
      newAddress.city &&
      newAddress.state &&
      newAddress.zip
    ) {
      addAddress({
        ...newAddress,
        id: Date.now(),
      });
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white flex flex-col gap-4 p-4">
        <Back name="Add Address" />
        <View className="flex-1 bg-white flex flex-col gap-4 mt-5">
          <FormField
            text="Street Name"
            placeholder="Enter Street Name"
            value={newAddress.street}
            handleChange={(e) => handleChange("street", e.nativeEvent.text)}
            otherStyles="border-gray-300"
          />
          <FormField
            text="City"
            placeholder="Enter City"
            value={newAddress.city}
            handleChange={(e) => handleChange("city", e.nativeEvent.text)}
            otherStyles="border-gray-300"
          />
          <View className="flex-row gap-2 w-full">
            <FormField
              text="State"
              placeholder="Enter State"
              value={newAddress.state}
              handleChange={(e) => handleChange("state", e.nativeEvent.text)}
              otherStyles="border-gray-300 w-1/2"
            />
            <FormField
              text="Zip Code"
              placeholder="Enter Zip Code"
              value={newAddress.zip}
              handleChange={(e) => handleChange("zip", e.nativeEvent.text)}
              otherStyles="border-gray-300 w-1/2"
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary-100 rounded-full p-4"
          onPress={handleSave}
        >
          <Text className="text-white text-center text-base font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;
