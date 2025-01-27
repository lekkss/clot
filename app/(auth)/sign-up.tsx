import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form/FormField";
import Button from "@/components/Buttton";
import { router } from "expo-router";

const SignIn2 = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full px-5 pt-20">
        <Text className="font-semibold text-4xl">Create Account</Text>
        <View className="gap-5 mt-10">
          <FormField
            text="text"
            value={""}
            placeholder="Firstname"
            handleChange={() => {}}
            otherStyles={""}
          />
          <FormField
            text="text"
            value={""}
            placeholder="lastname"
            handleChange={() => {}}
            otherStyles={""}
          />
          <FormField
            text="email"
            value={""}
            placeholder="Email Address"
            handleChange={() => {}}
            otherStyles={""}
          />
          <FormField
            text="password"
            value={""}
            placeholder="Passord"
            handleChange={() => {}}
            otherStyles={""}
          />
          <Button
            onPress={() => {
              router.push("/auth/email");
            }}
            title="Continue"
            containerStyle="bg-primary-100 rounded-full"
            textStyle="text-white font-semibold"
          />
          <Pressable className="pt-5">
            <Text
              className="font-semibold"
              onPress={() => router.push("/(root)/auth/sign-in")}
            >
              Already have an Account? Signin
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn2;
