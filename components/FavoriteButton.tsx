import { TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Product } from "@/app/api/types";
import { useFavorite } from "@/app/hooks/use-favorite";

interface FavoriteButtonProps {
  product: Product;
}

const FavoriteButton = ({ product }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  const isCurrentFavorite = isFavorite(product);

  return (
    <TouchableOpacity
      onPress={() => {
        if (isCurrentFavorite) {
          removeFromFavorites.mutate(product);
        } else {
          addToFavorites.mutate(product);
        }
      }}
      className="absolute top-3 right-3"
    >
      {isCurrentFavorite ? (
        <Image source={icons.favoriteFilled} className="size-8" />
      ) : (
        <Image source={icons.favorite} className="size-8 " />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteButton;
