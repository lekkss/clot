import { Stack } from "expo-router";
import "./global.css";
import { AddressProvider } from "./context/AddressContext";
export default function RootLayout() {
  return (
    <AddressProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="categories" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
    </AddressProvider>
  );
}
