import images from "@/constants/images";

interface Categories {
  id: number;
  image: string;
  name: string;
}
export const categories: Categories[] = [
  {
    id: 1,
    image: images.hoodie,
    name: "Hoodies",
  },
  {
    id: 2,
    image: images.short,
    name: "Shorts",
  },
  {
    id: 3,
    image: images.shoe,
    name: "Shoes",
  },
  {
    id: 4,
    image: images.bag,
    name: "Bag",
  },
  {
    id: 5,
    image: images.accessories,
    name: "Accessories",
  },
];
