import {
  View,
  Text,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form/FormField";
import Button from "@/components/Buttton";
import icons from "@/constants/icons";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full px-5 pt-20">
        <Text className="font-semibold text-4xl">Sign in</Text>
        <View className="gap-5 mt-10">
          <FormField
            text="email"
            value={""}
            placeholder="Email Address"
            handleChange={() => {}}
            otherStyles={""}
          />
          <Button
            onPress={() => {
              router.push("/auth/sign-in-2");
            }}
            title="Continue"
            containerStyle="bg-primary-100 rounded-full"
            textStyle="text-white font-semibold"
          />
          <Pressable onPress={() => router.push("/auth/sign-up")}>
            <Text className="font-semibold">
              {" "}
              Dont have an Account? Create One
            </Text>
          </Pressable>
        </View>

        <View className="gap-3 pt-16">
          <Button
            onPress={() => {}}
            title="Continue With Apple"
            icon={icons.apple}
            containerStyle="bg-light-2 rounded-full"
            textStyle="text-black font-semibold"
          />
          <Button
            onPress={() => {}}
            title="Continue With Google"
            icon={icons.google}
            containerStyle="bg-light-2 rounded-full"
            textStyle="text-black font-semibold"
          />
          <Button
            onPress={() => {}}
            title="Continue With Faceboook"
            icon={icons.facebook}
            containerStyle="bg-light-2 rounded-full"
            textStyle="text-black font-semibold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
