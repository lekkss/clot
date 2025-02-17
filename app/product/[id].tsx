import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { topSelling } from "@/data/products";
import ColorFilterModal from "@/components/ColorFIlterModal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import SizeFilterModal from "@/components/SizeModal";
import { useCart } from "@/app/context/CartContext";
const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const product = topSelling.find((product) => product.id === Number(id));
  console.log(product);

  const [quantity, setQuantity] = useState(1);

  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(product?.sizes[0]);

  const colorModalRef = useRef<BottomSheetModalMethods>(null);
  const sizeModalRef = useRef<BottomSheetModalMethods>(null);
  const closeFilterModal = () => {
    colorModalRef.current?.dismiss();
    sizeModalRef.current?.dismiss();
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleAddToCart = () => {
    console.log("add to cart");
    if (product && size && color) {
      addToCart(product, size, color, quantity);
    }
    router.navigate("/cart");
  };
  return (
    // <SafeAreaView className="bg-white h-full">
    //   <View className="flex-1 bg-white flex-col gap-4  p-4">
    //     <View className="flex flex-row justify-between items-center">
    //       <TouchableOpacity
    //         className="size-14 bg-light-2 rounded-full flex items-center justify-center"
    //         onPress={() => router.back()}
    //       >
    //         <Image source={icons.arrow} resizeMode="cover" />
    //       </TouchableOpacity>
    //       <TouchableOpacity className="size-14 bg-light-2 rounded-full flex items-center justify-center">
    //         <Image source={icons.favorite} resizeMode="cover" />
    //       </TouchableOpacity>
    //     </View>
    //     <FlatList
    //       data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    //       renderItem={({ item }) => (
    //         <Image source={product?.image} resizeMode="cover" />
    //       )}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       contentContainerStyle={{ gap: 10 }}
    //       className="bg-red"
    //     />
    //     <View className="flex flex-col gap-2 flex-1 bg-red">
    //       <Text className="text-2xl font-semibold">{product?.name}</Text>
    //       <Text className="text-lg font-semibold">${product?.price}</Text>
    //       <Text className="text-sm font-semibold">{product?.description}</Text>
    //     </View>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView className="bg-white h-full px-4">
      <View className="flex flex-row justify-between items-center mb-4">
        <TouchableOpacity
          className="size-14 bg-light-2 rounded-full flex items-center justify-center"
          onPress={() => router.back()}
        >
          <Image source={icons.arrow} resizeMode="cover" />
        </TouchableOpacity>
        <TouchableOpacity
          className="size-14 bg-light-2 rounded-full flex items-center justify-center"
          onPress={toggleFavorite}
        >
          <Image
            source={isFavorite ? icons.favoriteFilled : icons.favorite}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[]}
        renderItem={null}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={({ item }) => (
              <Image source={product?.image} resizeMode="cover" />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          />
        }
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <View className="flex flex-col gap-2 flex-1">
            <Text className="text-2xl font-semibold">{product?.name}</Text>
            <Text className="text-lg font-semibold">${product?.price}</Text>

            <View className="flex-col gap-2 py-4">
              <TouchableOpacity
                className="flex flex-row justify-between items-center rounded-full bg-light-2 p-4"
                onPress={() => sizeModalRef.current?.present()}
              >
                <Text className="text-lg font-semibold">Size</Text>
                <View className="flex flex-row items-center gap-4">
                  <Text className="text-lg font-semibold">{size}</Text>
                  <Image
                    source={icons.arrow}
                    resizeMode="cover"
                    className="size-4 rotate-[270deg]"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row justify-between items-center rounded-full bg-light-2 p-4"
                onPress={() => colorModalRef.current?.present()}
              >
                <Text className="text-lg font-semibold">Color</Text>
                <View className="flex flex-row items-center gap-4">
                  <View
                    className="size-4 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <Image
                    source={icons.arrow}
                    resizeMode="cover"
                    className="size-4 rotate-[270deg]"
                  />
                </View>
              </TouchableOpacity>
              <View className="flex flex-row justify-between items-center rounded-full bg-light-2 p-3">
                <Text className="text-lg">Quantity</Text>
                <View className="flex flex-row items-center gap-4">
                  <TouchableOpacity
                    className="rounded-full size-10 flex items-center justify-center bg-primary-100"
                    onPress={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <Text className="text-white text-lg font-semibold">-</Text>
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold">{quantity}</Text>
                  <TouchableOpacity
                    className="rounded-full size-10 flex items-center justify-center bg-primary-100"
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Text className="text-white text-lg font-semibold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text className="text-sm text-gray-500">
              {product?.description}
            </Text>
            <Text className="text-lg font-semibold mt-4">
              Shipping & Returns
            </Text>
            <Text className="text-sm text-gray-500">
              Free standard shipping and free 60-day returns
            </Text>
          </View>
        }
      />
      <TouchableOpacity
        className="bg-primary-100 flex-row items-center justify-between rounded-full p-4"
        onPress={handleAddToCart}
      >
        <Text className="text-white text-lg font-semibold">
          ${(product?.price || 0) * quantity}
        </Text>
        <Text className="text-white text-lg font">Add to Bag</Text>
      </TouchableOpacity>
      <ColorFilterModal
        title="Color"
        modalRef={colorModalRef}
        closeFilterModal={closeFilterModal}
        filters={product?.colors}
        selectedFilter={color}
        setSelectedFilter={setColor}
      />
      <SizeFilterModal
        title="Size"
        modalRef={sizeModalRef}
        closeFilterModal={closeFilterModal}
        filters={product?.sizes}
        selectedFilter={size}
        setSelectedFilter={setSize}
      />
    </SafeAreaView>
  );
};

export default ProductDetails;
