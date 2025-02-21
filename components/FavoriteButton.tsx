import { TouchableOpacity, Image } from "react-native";
import React from "react";
import { ProductsPropType } from "@/data/products";
import { useFavorite } from "@/app/context/FavoriteContext";
import icons from "@/constants/icons";
import { Product } from "@/app/api/types";

interface FavoriteButtonProps {
  product: Product;
}

const FavoriteButton = ({ product }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites } = useFavorite();
  const { items } = useFavorite();
  const isFavorite = items.some((item) => item.id === product.id);
  return (
    <TouchableOpacity
      onPress={() => {
        if (isFavorite) {
          removeFromFavorites(product.id);
        } else {
          addToFavorites(product);
        }
      }}
      className="absolute top-3 right-3"
    >
      {isFavorite ? (
        <Image source={icons.favoriteFilled} className="size-8" />
      ) : (
        <Image source={icons.favorite} className="size-8 " />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteButton;
