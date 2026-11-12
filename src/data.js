export const coffeeItems = [
  { name: "House Espresso", note: "Chocolate · toasted almond · orange", category: "espresso", price: "$4", image: "photo-1510591509098-f4fdc6d0ff04" },
  { name: "Oat Flat White", note: "Velvety oat · double ristretto · honey", category: "espresso", price: "$6", image: "photo-1461023058943-07fcbe16d735" },
  { name: "Brown Butter Latte", note: "Espresso · brown butter · soft milk", category: "espresso", price: "$7", image: "photo-1570968915860-54d5c301fa9f" },
  { name: "Cold Brew Tonic", note: "18-hour steep · citrus · sparkling", category: "cold", price: "$7", image: "photo-1517701604599-bb29b565090c" },
  { name: "Maple Cloud Cold Brew", note: "Single origin · maple cream · sea salt", category: "cold", price: "$8", image: "photo-1517701550927-30cf4ba1dba5" },
  { name: "Cascara Spritz", note: "Coffee cherry · lemon · rosemary", category: "cold", price: "$7", image: "photo-1517701550927-30cf4ba1dba5" },
  { name: "Cardamom Morning Bun", note: "Laminated by hand · warm spice", category: "bakery", price: "$6", image: "photo-1509440159596-0249088772ff" },
  { name: "Olive Oil Cake", note: "Meyer lemon · cultured cream", category: "bakery", price: "$7", image: "photo-1486427944299-d1955d23e34d" },
  { name: "Seasonal Toast", note: "Country sourdough · market things", category: "bakery", price: "$12", image: "photo-1525351484163-7529414344d8" },
];

export const galleryImages = [
  { src: "photo-1442512595331-e89e73853f31", alt: "Fresh coffee being prepared in a cafe", shape: "gallery-tall" },
  { src: "photo-1495474472287-4d71bcdd2085", alt: "Coffee beans and a warm morning brew", shape: "" },
  { src: "photo-1445116572660-236099ec97a0", alt: "A welcoming neighborhood coffee shop", shape: "gallery-wide" },
  { src: "photo-1559056199-641a0ac8b55e", alt: "Carefully roasted coffee beans", shape: "" },
  { src: "photo-1501339847302-ac426a4a7cbb", alt: "The sunlit interior of a neighborhood cafe", shape: "gallery-tall" },
  { src: "photo-1511920170033-f8396924c348", alt: "A beautifully finished latte", shape: "" },
  { src: "photo-1509042239860-f550ce710b93", alt: "A takeaway coffee made for the walk", shape: "gallery-wide" },
  { src: "photo-1501747315-124a0eaca060", alt: "Freshly ground coffee ready to brew", shape: "" },
];

export function unsplash(id, width = 900) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
}
