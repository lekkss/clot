import { View, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "@/components/Back";
import { ProductItem } from "@/components/Products";
import icons from "@/constants/icons";
import Empty from "@/components/Empty";
import { useFavorite } from "../hooks/use-favorite";
const Wishlist = () => {
  const { favorites: items } = useFavorite();

  console.log(items, "items");

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 bg-white flex-col gap-4  p-4">
        <Back name={`My Favorite (${items.length})`} />
        <View className="flex-1 bg-white flex flex-col gap-4 mt-5">
          {items.length > 0 ? (
            <FlatList
              data={items}
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
            <View className="flex-1 bg-white flex flex-col items-center justify-center gap-4 mt-5">
              <Empty heading="No items in wishlist" image={icons.favorite} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wishlist;
