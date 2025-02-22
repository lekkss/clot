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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Categories from "@/components/Categories";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import CartBadge from "@/components/CartBadge";
import { ProductItem } from "@/components/Products";
import Loading from "@/components/Loading";
import { useProductQuery, useCategoriesQuery } from "@/hooks/use-product";
const Index = () => {
  const [limit, setLimit] = useState(6);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const productsQuery = useProductQuery(limit, 0);
  const categoriesQuery = useCategoriesQuery();
  const onRefresh = () => {
    setRefreshing(true);
    productsQuery.refetch();
    setRefreshing(false);
  };

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
        setLimit((prev) => prev + 6);
        productsQuery.refetch();
        console.log("limit", limit);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  if (productsQuery.isLoading) return <Loading />;
  if (productsQuery.error)
    return <Text>Error: {productsQuery.error.message}</Text>;

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
          <TouchableOpacity onPress={() => router.navigate("/(categories)")}>
            <Text className="text-lg">See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categoriesQuery.data}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeIn.delay(index * 100 + 100).springify()}
            >
              <Categories id={item.name} name={item.name} />
            </Animated.View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-white h-full px-5 pb-20">
      <FlatList
        data={productsQuery.data?.products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View>{renderHeader()}</View>}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100 + 100)
              .springify()
              .damping(11)}
          >
            <View className="w-1/2 flex-row">
              <ProductItem product={item} />
            </View>
          </Animated.View>
        )}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }} // Add spacing between columns
        contentContainerStyle={{
          gap: 16,
          marginBottom: 100,
        }} // Padding for entire grid
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
