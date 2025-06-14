import { Product } from "@/types/product";
import denimImg from "@/app/assets/denim.jpg";
import shirtImg from "@/app/assets/shirts.jpg";

export const products: Product[] = [
  {
    id: "1",
    title: "Upcycled Denim Collection",
    description: "Sustainable fashion made from recycled denim materials.",
    image: denimImg,
    category: "Clothing",
    price: "$45.00",
  },
  {
    id: "2",
    title: "Eco-Friendly T-Shirt",
    description: "Made from 100% organic cotton with natural dyes.",
    image: shirtImg,
    category: "Clothing",
    price: "$25.00",
  },
  {
    id: "3",
    title: "Recycled Fabric Tote Bag",
    description: "Durable tote bag created from reclaimed textile waste.",
    image: "",
    category: "Accessories",
    price: "$18.00",
  },
  {
    id: "4",
    title: "Sustainable Footwear",
    description: "Shoes made from recycled plastic bottles and natural rubber.",
    image: "",
    category: "Footwear",
    price: "$65.00",
  },
  {
    id: "5",
    title: "Rethread Starter Kit",
    description:
      "Everything you need to start your own clothing recycling project.",
    image: "",
    category: "DIY",
    price: "$35.00",
  },
  {
    id: "6",
    title: "Textile Recycling Guide",
    description:
      "Comprehensive guide on textile recycling and sustainable fashion.",
    image: "",
    category: "Books",
    price: "$15.00",
  },
];
