import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="top-selling"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new-in"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
