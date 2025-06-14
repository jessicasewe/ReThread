import { Article } from "@/types/article";
import second from "@/app/assets/second.png";

export const articles: Article[] = [
  {
    id: "1",
    title: "The Impact of Second-Hand Clothing on Local Economies",
    description:
      "Exploring how the global trade of second-hand clothing affects local textile industries in receiving countries.",
    image: second,
    category: "Economy",
    date: "2023-05-15",
    author: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    title: "Sustainable Fashion: Beyond the Buzzword",
    description:
      "What does sustainable fashion really mean, and how can consumers make more environmentally conscious choices?",
    image: "/placeholder.svg?height=300&width=600",
    category: "Sustainability",
    date: "2023-06-22",
    author: "Michael Chen",
  },
  {
    id: "3",
    title: "The Journey of a T-Shirt: From Donation to New Owner",
    description:
      "Following the path of donated clothing items across continents and the complex supply chain behind it.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Supply Chain",
    date: "2023-07-10",
    author: "Amara Okafor",
  },
  {
    id: "4",
    title: "Fast Fashion's Environmental Cost",
    description:
      "Analyzing the environmental impact of the fast fashion industry and its contribution to global waste.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Environment",
    date: "2023-08-05",
    author: "Dr. James Wilson",
  },
  {
    id: "5",
    title: "Textile Recycling Technologies: Innovations and Challenges",
    description:
      "New technologies are emerging to address textile waste, but challenges remain in scaling these solutions.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Technology",
    date: "2023-09-18",
    author: "Elena Rodriguez",
  },
];
