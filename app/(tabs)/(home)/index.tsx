import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Categories";
import { categories } from "@/data/categories";
import Products from "@/components/Products";
import { topSelling } from "@/data/products";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import Cart from "@/app/cart";
import CartBadge from "@/components/CartBadge";

const Index = () => {
  const renderHeader = () => (
    <View className="gap-7">
      <View className="flex flex-row justify-between ">
        <View className="size-16 bg-gray-300 rounded-full flex items-center justify-center">
          <Image source={images.user} className="w-full" resizeMode="cover" />
        </View>
        <CartBadge />
      </View>
      {/* Search Bar */}
      <TouchableOpacity
        className="bg-light-2 rounded-[48px] p-4 flex flex-row items-center gap-4"
        onPress={() => router.navigate("/search")}
      >
        <Image source={icons.search} className="ml-2" resizeMode="cover" />
        <TextInput placeholder="Search" />
      </TouchableOpacity>

      {/* Categories Section */}
      <View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="font-semibold text-2xl">Categories</Text>
          <TouchableOpacity onPress={() => router.navigate("/categories")}>
            <Text className="text-2xl">See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Categories id={item.id} image={item.image} name={item.name} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const renderProducts = () => (
    <View className="gap-7">
      {/* Top Selling Section */}
      <Products products={topSelling} text="Top Selling" to="top-selling" />
      {/* New In Section */}
      <Products products={topSelling} text="New In" to="new-in" />
    </View>
  );

  return (
    <SafeAreaView className="bg-white h-full px-5">
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderProducts()}
          </View>
        }
        renderItem={null} // Empty since header includes all content
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Index;
