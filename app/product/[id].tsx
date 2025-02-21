import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import ColorFilterModal from "@/components/ColorFIlterModal";
import SizeFilterModal from "@/components/SizeModal";
import { useCart } from "@/app/context/CartContext";
import { useSheetRef } from "@/components/Sheet";
import FavoriteButton from "@/components/FavoriteButton";
import { useProduct } from "@/app/context/ProductContext";
const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const { products } = useProduct();
  const product = products.find((product) => product.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  //   const [color, setColor] = useState(product?.colors[0]);
  //   const [size, setSize] = useState(product?.sizes[0]);

  const colorModalRef = useSheetRef();
  const sizeModalRef = useSheetRef();
  const closeFilterModal = () => {
    colorModalRef.current?.dismiss();
    sizeModalRef.current?.dismiss();
  };
  const handleAddToCart = () => {
    console.log("add to cart");
    if (product) {
      addToCart(product, quantity);
    }
    router.navigate("/cart");
  };
  const getMainPrice = (price: number, discountPercentage: number) => {
    return (price + (discountPercentage / 100) * price).toFixed(2);
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
        <View className="size-14 bg-light-2 rounded-full flex items-center justify-center">
          <FavoriteButton product={product!} />
        </View>
      </View>
      <FlatList
        data={[]}
        renderItem={null}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={product?.images}
            renderItem={({ item }) => (
              <View className="bg-gray-100 w-52 h-52">
                <Image
                  source={{ uri: item }}
                  resizeMode="cover"
                  className="size-full rounded-lg"
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          />
        }
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <View className="flex flex-col gap-2 flex-1 pb-8">
            <Text className="text-xl font-semibold">{product?.title}</Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-lg font-semibold text-primary-100">
                ${product?.price}
              </Text>
              {product?.discountPercentage && (
                <Text className="text-sm text-gray-500 line-through">
                  ${getMainPrice(product!.price, product!.discountPercentage)}
                </Text>
              )}
            </View>
            {/* buttons */}
            <View className="flex-col gap-4 py-4">
              {/* <TouchableOpacity
                className="flex flex-row justify-between items-center rounded-full bg-light-2 p-5"
                onPress={() => sizeModalRef.current?.present()}
              >
                <Text className="text-lg">Size</Text>
                <View className="flex flex-row items-center gap-4">
                  <Text className="text-lg font-semibold uppercase">
                    {size}
                  </Text>
                  <Image
                    source={icons.arrow}
                    resizeMode="cover"
                    className="size-4 rotate-[270deg]"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row justify-between items-center rounded-full bg-light-2 p-5"
                onPress={() => colorModalRef.current?.present()}
              >
                <Text className="text-lg">Color</Text>
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
              </TouchableOpacity> */}
              <View className="flex flex-row justify-between items-center rounded-full bg-light-2 p-4">
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
      {/* <ColorFilterModal
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
      /> */}
    </SafeAreaView>
  );
};

export default ProductDetails;
