import Products from "@/components/Products";
import images from "@/constants/images";
import { ImageSourcePropType } from "react-native";
export interface ProductsPropType {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: ImageSourcePropType;
}

export interface ProductsPropType {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: ImageSourcePropType;
  description: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  sizes: ("m" | "l" | "xl" | "xxl")[];
  colors: string[];
  gender: "men" | "women" | "kids";
  deals?: ("on sale" | "new arrival" | "best seller")[];
}
export const topSelling: ProductsPropType[] = [
  {
    id: 1,
    name: "Men's Haringgton Jacket",
    price: 148.0,
    discount: 0,
    image: images.jacket,
    description: "Classic Harrington jacket for men",
    category: "Jackets",
    brand: "Fashion Brand",
    stock: 50,
    rating: 4.5,
    reviews: 128,
    sizes: ["m", "l", "xl"],
    colors: [
      "green",
      "black",
      "navy",
      "red",
      "blue",
      "yellow",
      "purple",
      "orange",
      "pink",
      "brown",
      "grey",
      "white",
      "gold",
      "silver",
      "teal",
    ],
    gender: "men",
    deals: ["best seller"],
  },
  {
    id: 2,
    name: "Max Cirro Men's Slides",
    price: 55.0,
    discount: 50,
    image: images.slippers,
    description: "Comfortable men's slides for casual wear",
    category: "Footwear",
    brand: "Max",
    stock: 30,
    rating: 4.2,
    reviews: 85,
    sizes: ["m", "l", "xl"],
    colors: ["black", "grey"],
    gender: "men",
    deals: ["on sale"],
  },
  {
    id: 3,
    name: "Mens Fleece Jacket",
    price: 66.0,
    discount: 10,
    image: images.fleece,
    description: "Warm and cozy fleece jacket for men",
    category: "Jackets",
    brand: "Fashion Brand",
    stock: 25,
    rating: 4.0,
    reviews: 45,
    sizes: ["m", "l", "xl", "xxl"],
    colors: ["navy", "grey", "black"],
    gender: "men",
    deals: ["new arrival"],
  },
];
