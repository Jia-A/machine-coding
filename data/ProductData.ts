export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://picsum.photos/seed/headphones/300/300",
    description: "Over-ear wireless headphones with noise cancellation.",
    category: "Electronics",
    rating: 4.5,
    stock: 24,
    quantity : 0
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 119.0,
    image: "https://picsum.photos/seed/shoes/300/300",
    description: "Lightweight running shoes with breathable mesh.",
    category: "Footwear",
    rating: 4.3,
    stock: 50,
    quantity : 0
  },
  {
    id: 3,
    name: "Coffee Mug",
    price: 14.5,
    image: "https://picsum.photos/seed/mug/300/300",
    description: "Ceramic mug, 350ml, microwave safe.",
    category: "Kitchen",
    rating: 4.7,
    stock: 120,
    quantity : 0
  },
  {
    id: 4,
    name: "Backpack",
    price: 49.99,
    image: "https://picsum.photos/seed/backpack/300/300",
    description: "Water-resistant backpack with laptop sleeve.",
    category: "Accessories",
    rating: 4.4,
    stock: 35,
    quantity : 0
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 199.0,
    image: "https://picsum.photos/seed/watch/300/300",
    description: "Fitness tracking smartwatch with heart-rate monitor.",
    category: "Electronics",
    rating: 4.2,
    stock: 18,
    quantity : 0
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 29.99,
    image: "https://picsum.photos/seed/sunglasses/300/300",
    description: "Polarized UV400 sunglasses.",
    category: "Accessories",
    rating: 4.1,
    stock: 60,
    quantity : 0
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: 39.5,
    image: "https://picsum.photos/seed/lamp/300/300",
    description: "LED desk lamp with adjustable brightness.",
    category: "Home",
    rating: 4.6,
    stock: 42,
    quantity : 0
  },
  {
    id: 8,
    name: "Notebook",
    price: 8.99,
    image: "https://picsum.photos/seed/notebook/300/300",
    description: "A5 hardcover notebook, 200 ruled pages.",
    category: "Stationery",
    rating: 4.8,
    stock: 200,
    quantity : 0
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 59.0,
    image: "https://picsum.photos/seed/speaker/300/300",
    description: "Portable speaker with 12-hour battery life.",
    category: "Electronics",
    rating: 4.3,
    stock: 27,
    quantity : 0
  },
  {
    id: 10,
    name: "Yoga Mat",
    price: 24.99,
    image: "https://picsum.photos/seed/yogamat/300/300",
    description: "Non-slip yoga mat, 6mm thick.",
    category: "Fitness",
    rating: 4.5,
    stock: 75,
    quantity : 0
  },
];

export type Product = (typeof products)[number];
