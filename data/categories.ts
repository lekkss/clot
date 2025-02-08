import images from "@/constants/images";
import { ImageSourcePropType } from "react-native";

interface Categories {
  id: number;
  image: ImageSourcePropType;
  name: string;
}
export const categories: Categories[] = [
  {
    id: 1,
    image: images.hoodie,
    name: "hoodies",
  },
  {
    id: 2,
    image: images.short,
    name: "shorts",
  },
  {
    id: 3,
    image: images.shoe,
    name: "shoes",
  },
  {
    id: 4,
    image: images.bag,
    name: "bag",
  },
  {
    id: 5,
    image: images.accessories,
    name: "accessories",
  },
];
