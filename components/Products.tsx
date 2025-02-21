import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import FavoriteButton from "./FavoriteButton";
import { Product } from "@/app/api/types";
interface Products {
  products: Product[];
  text: string;
  to: string;
}

interface ProductItem {
  product: Product;
}

export const ProductItem = ({ product }: ProductItem) => {
  const getMainPrice = (price: number, discountPercentage: number) => {
    return (price + (discountPercentage / 100) * price).toFixed(2);
  };

  return (
    <View className="bg-light-2 p-2 rounded-lg w-48 h-72">
      <TouchableOpacity
        onPress={() => router.push(`/product/${product.id}`)}
        className="flex-1 flex flex-col justify-between"
      >
        {/* Image Container */}
        <View className="w-full h-48">
          <Image
            source={{ uri: product.thumbnail }}
            className="w-full h-full rounded-lg flex-1"
            resizeMode="cover"
          />
        </View>

        <View className="">
          <Text
            className="text-base font-normal"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {product.title}
          </Text>
          <View className="mt-2 flex flex-row gap-2 items-center">
            <Text className="text-lg text-primary-100 font-semibold">
              ${getMainPrice(product.price, product.discountPercentage)}
            </Text>
            {product.discountPercentage > 0 && (
              <Text className="text-sm text-gray-500 line-through">
                ${product.price}
              </Text>
            )}
          </View>
        </View>
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
        <Text className="font-semibold text-xl">{text}</Text>
        <TouchableOpacity onPress={() => router.push(to as any)}>
          <Text className="text-lg text-blue-500">See All</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row gap-4">
            <ProductItem product={item} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};

export default Products;
