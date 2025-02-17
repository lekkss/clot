import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ProductsPropType } from "@/data/products";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { useFavorite } from "@/app/context/FavoriteContext";
import FavoriteButton from "./FavoriteButton";
interface Products {
  products: ProductsPropType[];
  text: string;
  to: string;
}

interface ProductItem {
  product: ProductsPropType;
}

export const ProductItem = ({ product }: ProductItem) => {
  const { addToFavorites } = useFavorite();
  return (
    <View className="relative bg-light-2 p-2 rounded-lg">
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
        <Image source={product.image} className="" resizeMode="cover" />
        <Text className="mt-2 text-base font-normal">{product.name}</Text>
        <Text className="mt-2 text-lg font-semibold">${product.price}</Text>
        <FavoriteButton product={product} />
      </TouchableOpacity>
    </View>
  );
};

const Products = ({ products, text, to }: Products) => {
  return (
    <View className="my-6">
      {/* Header for the section */}
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="font-semibold text-2xl">{text}</Text>
        <TouchableOpacity onPress={() => router.push(to as any)}>
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
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};

export default Products;
