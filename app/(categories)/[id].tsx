import { View, Text, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "@/components/Back";
import { ProductItem } from "@/components/Products";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import images from "@/constants/images";
import { useProductByCategoryQuery } from "@/hooks/use-product";
const SingleCategory = () => {
  const { id: name } = useLocalSearchParams();
  const productQuery = useProductByCategoryQuery(name as string);
  const { data: products, isLoading } = productQuery;

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView className="bg-white p-6 flex-1">
      <View className="gap-5 mb-20">
        <Back />
        {products.products.length > 0 && (
          <Text className="text-black-100 font-semibold text-lg">
            {name} ({products.products.length || 0})
          </Text>
        )}

        <FlatList
          data={products.products}
          renderItem={({ item }) => (
            <View className="w-1/2">
              <ProductItem product={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }} // Add spacing between columns
          contentContainerStyle={{ gap: 16 }} // Padding for entire grid
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex items-center justify-center h-[calc(100vh-30vh)] gap-7 px-10">
              <Empty
                heading={`No product found in ${name}`}
                image={images.bag}
              />
            </View>
          }
        />
        <View className="h-10"></View>
      </View>
    </SafeAreaView>
  );
};

export default SingleCategory;
