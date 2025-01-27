import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form/FormField";
import Button from "@/components/Buttton";
import { router } from "expo-router";

const SignIn2 = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full px-5 pt-20">
        <Text className="font-semibold text-4xl">Sign in</Text>
        <View className="gap-5 mt-10">
          <FormField
            text="password"
            value={""}
            placeholder="Passord"
            handleChange={() => {}}
            otherStyles={""}
          />
          <Button
            onPress={() => {
              router.replace("/");
            }}
            title="Continue"
            containerStyle="bg-primary-100 rounded-full"
            textStyle="text-white font-semibold"
          />
          <Text>
            Forgot Password <Text className="font-semibold">Reset</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn2;
