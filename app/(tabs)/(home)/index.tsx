import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import CartBadge from "@/components/CartBadge";
import { useProduct } from "@/app/context/ProductContext";
import { ProductItem } from "@/components/Products";
import Loading from "@/components/Loading";
const Index = () => {
  let limit: number = 6;
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(limit, 0);
    setRefreshing(false);
  };
  const { products, loading, error, categories, fetchProducts } = useProduct();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height + 100;
    const scrollViewHeught = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeught;
    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        console.log("Reached bottom");
        //fetch more images
        ++limit;
        fetchProducts(limit, 0);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Text>Error: {error}</Text>;

  const renderHeader = () => (
    <View className="gap-7">
      <View className="flex flex-row justify-between ">
        <View className="size-14 bg-gray-300 rounded-full flex items-center justify-center">
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
          <Text className="font-semibold text-xl">Categories</Text>
          <TouchableOpacity
            onPress={() => router.navigate("/categories/categories")}
          >
            <Text className="text-lg">See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Categories id={item.name} name={item.name} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const renderProducts = () => (
    <View className="gap-2 mt-2 mb-20">
      {/* Top Selling Section */}
      {/* <Products products={products} text="Top Selling" to="top-selling" /> */}
      {/* New In Section */}
      <Products products={products} text="New In" to="new-in" />
    </View>
  );

  return (
    <SafeAreaView className="bg-white h-full px-5">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View>{renderHeader()}</View>}
        renderItem={({ item }) => (
          <View className="w-1/2 flex-row">
            <ProductItem product={item} />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }} // Add spacing between columns
        contentContainerStyle={{ gap: 16 }} // Padding for entire grid
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
      />
    </SafeAreaView>
  );
};

export default Index;
