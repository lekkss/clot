import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import ShopCategories from "@/components/ShopCategories";
import { ProductItem } from "@/components/Products";
import images from "@/constants/images";
import Empty from "@/components/Empty";
import { Product } from "./api/types";
import { useSearchProductsQuery } from "@/hooks/use-product";
import Loading from "@/components/Loading";
const Search = () => {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<TextInput>(null);
  const searchProductsQuery = useSearchProductsQuery(search);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    setFilteredProducts(searchProductsQuery.data?.products || []);
  }, [searchProductsQuery.data]);

  if (searchProductsQuery.isLoading) return <Loading />;
  if (searchProductsQuery.error)
    return <Text>Error: {searchProductsQuery.error.message}</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <View className="h-full bg-white gap-8">
        <View className="flex flex-row justify-between gap-3 items-center">
          <TouchableOpacity
            className="size-14 bg-light-2 rounded-full flex items-center justify-center"
            onPress={() => router.back()}
          >
            <Image source={icons.arrow} resizeMode="cover" />
          </TouchableOpacity>
          <View className="bg-light-2 flex-1  rounded-[48px] p-4 flex flex-row items-center gap-4">
            <Image source={icons.search} className="ml-2" resizeMode="cover" />
            <TextInput
              ref={searchInputRef}
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              className="flex-1"
            />
          </View>
        </View>
        {filteredProducts.length > 0 && search != "" && (
          <View>
            <Text>{filteredProducts.length} results found</Text>
          </View>
        )}
        {search == "" ? (
          <ShopCategories />
        ) : filteredProducts.length > 0 ? (
          //some products are wider than others so i want to make them the same width
          <FlatList
            data={filteredProducts}
            contentContainerClassName="gap-4"
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Ensures two columns for uniform width
            columnWrapperStyle={{ gap: 8 }} // Add spacing between columns
            contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }} // Padding for entire grid
            renderItem={({ item }) => (
              <View className="w-1/2 flex flex-row">
                <ProductItem product={item} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex items-center justify-center h-[calc(100vh-30vh)] gap-7 px-10">
            <Empty
              heading={`Sorry, we couldn't find any matching result for your search "${search}"`}
              image={images.search}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
