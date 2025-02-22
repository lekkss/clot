import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "@/components/Back";
import Empty from "@/components/Empty";
import images from "@/constants/images";
import Button from "@/components/Buttton";
import icons from "@/constants/icons";
import FormField from "@/components/form/FormField";
import { router } from "expo-router";
import { CartItemType, useCart } from "../hooks/use-cart";
const Cart = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = 10;
  const total = totalPrice + shipping + tax;
  return (
    <SafeAreaView className="bg-white h-full px-4">
      <View className="flex-1 bg-white flex flex-col gap-4">
        <Back name={cart.length > 0 ? "Cart" : ""} />
        {cart.length > 0 ? (
          <View className="flex-1 bg-white flex flex-col gap-4 mt-4">
            <TouchableOpacity
              className="flex flex-row justify-end items-end"
              onPress={() => {
                clearCart();
              }}
            >
              <Text className="text-primary-100">Remove All</Text>
            </TouchableOpacity>
            <FlatList
              data={cart}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="h-2 bg-light-2" />}
              contentContainerStyle={{ gap: 10 }}
              // ListFooterComponent={() => (
              //   <View className="gap-4 h-full flex justify-end ">
              //     <View className="flex flex-row justify-between items-center rounded-lg">
              //       <Text className="text-gray-500 text-lg">Subtotal</Text>
              //       <Text className="text-lg">${totalPrice.toFixed(2)}</Text>
              //     </View>
              //     <View className="flex flex-row justify-between items-center rounded-lg">
              //       <Text className="text-gray-500 text-lg">Shipping</Text>
              //       <Text className="text-lg">${shipping.toFixed(2)}</Text>
              //     </View>
              //     <View className="flex flex-row justify-between items-center rounded-lg">
              //       <Text className="text-gray-500 text-lg">Tax</Text>
              //       <Text className="text-lg">${tax.toFixed(2)}</Text>
              //     </View>
              //     <View className="flex flex-row justify-between items-center rounded-lg">
              //       <Text className=" text-lg">Total</Text>
              //       <Text className="font-semibold text-lg">
              //         ${total.toFixed(2)}
              //       </Text>
              //     </View>
              //   </View>
              // )}
            />
            <View className="gap-4  flex justify-end mb-10">
              <View className="flex flex-row justify-between items-center rounded-lg">
                <Text className="text-gray-500 text-lg">Subtotal</Text>
                <Text className="text-lg">${totalPrice.toFixed(2)}</Text>
              </View>
              <View className="flex flex-row justify-between items-center rounded-lg">
                <Text className="text-gray-500 text-lg">Shipping</Text>
                <Text className="text-lg">${shipping.toFixed(2)}</Text>
              </View>
              <View className="flex flex-row justify-between items-center rounded-lg">
                <Text className="text-gray-500 text-lg">Tax</Text>
                <Text className="text-lg">${tax.toFixed(2)}</Text>
              </View>
              <View className="flex flex-row justify-between items-center rounded-lg">
                <Text className=" text-lg">Total</Text>
                <Text className="font-semibold text-lg">
                  ${total.toFixed(2)}
                </Text>
              </View>
              <View className="flex flex-row  items-center rounded-lg bg-light-2 p-3 gap-4 mt-2">
                <Image source={icons.coupon} className="size-10" />
                <FormField
                  handleChange={() => {}}
                  text="Coupon"
                  value=""
                  otherStyles="flex-1"
                  placeholder="Enter Coupon"
                />
                <TouchableOpacity className="bg-primary-100 rounded-full p-2">
                  <Image
                    source={icons.arrow}
                    className="size-6 rotate-[180deg]"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title="Checkout"
              onPress={() => {
                const nextPage = "/checkout";
                if (nextPage === "/checkout") {
                  router.navigate(nextPage);
                } else {
                  router.replace(nextPage);
                }
              }}
              containerStyle="w-full bg-primary-100 rounded-full"
              textStyle="text-white"
            />
          </View>
        ) : (
          <Empty heading="Your Cart is Empty" image={images.cart} />
        )}
      </View>
    </SafeAreaView>
  );
};
const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQuantity, decreaseQuantity } = useCart();
  return (
    <View className="flex flex-row justify-between items-center bg-light-2 rounded-lg p-4 h-24">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: item.thumbnail }}
          className="size-16"
          resizeMode="cover"
        />
        <View className="flex flex-col justify-between  h-full gap-2">
          <Text>{item.title}</Text>
          {/* <View className="flex flex-row justify-between">
            <Text className="text-gray-500">
              Size -{" "}
              <Text className="text-black-100 font-semibold capitalize">
                {item.size}
              </Text>
            </Text>
            <Text className="text-gray-500">
              Color -{" "}
              <Text className="text-black-100 font-semibold capitalize">
                {item.color}
              </Text>
            </Text>
          </View> */}
        </View>
      </View>
      <View className="flex flex-col items-end justify-between h-full gap-2">
        <Text>
          ${(item.price * item.quantity).toFixed(2)} (x{item.quantity})
        </Text>
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity
            className="bg-primary-100 rounded-full size-6 aspect-square flex items-center justify-center"
            onPress={() => {
              decreaseQuantity(item.id);
            }}
          >
            <Text className="text-white">-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary-100 rounded-full size-6 aspect-square flex items-center justify-center"
            onPress={() => {
              increaseQuantity(item.id);
            }}
          >
            <Text className="text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Cart;
