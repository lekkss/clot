import { Stack } from "expo-router";
import "./global.css";
import { AddressProvider } from "./context/AddressContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { CartProvider } from "./context/CartContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <AddressProvider>
          <FavoriteProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="categories"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="search" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(profile)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="product/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="cart" options={{ headerShown: false }} />
              </Stack>
            </CartProvider>
          </FavoriteProvider>
        </AddressProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
