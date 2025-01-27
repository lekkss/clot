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
export const topSelling: ProductsPropType[] = [
  {
    id: 1,
    name: "Men's Haringgton Jacket",
    price: 148.0,
    discount: 0,
    image: images.jacket,
  },
  {
    id: 2,
    name: "Max Cirro Men's Slides",
    price: 55.0,
    discount: 50,
    image: images.slippers,
  },
  {
    id: 1,
    name: "Mens Cloth",
    price: 66.0,
    discount: 10,
    image: images.fleece,
  },
];
