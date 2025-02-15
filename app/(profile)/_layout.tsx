import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="address" options={{ headerShown: false }} />
      <Stack.Screen name="add-address" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
