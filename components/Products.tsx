import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ProductsPropType } from "@/data/products";
import { router } from "expo-router";

interface Products {
  products: ProductsPropType[];
  text: string; // Section header text (e.g., "Top Selling", "New In")
  to: string; // Navigation route for "See All"
}

interface ProductItem {
  product: ProductsPropType;
}

const ProductItem = ({ product }: ProductItem) => {
  return (
    <View className="mr-4 bg-light-2 p-2 rounded-lg">
      <Image
        source={product.image}
        className=""
        resizeMode="cover" // Ensures the image scales proportionally to fill the space
      />
      <Text className="mt-2 text-lg font-normal">{product.name}</Text>
      <Text className="mt-2 text-xl font-semibold">${product.price}</Text>
    </View>
  );
};

const Products = ({ products, text, to }: Products) => {
  return (
    <View className="my-6">
      {/* Header for the section */}
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="font-semibold text-2xl">{text}</Text>
        <TouchableOpacity onPress={() => router.push(to)}>
          <Text className="text-2xl text-blue-500">See All</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ProductItem product={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Products;
