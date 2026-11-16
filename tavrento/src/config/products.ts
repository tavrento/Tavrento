// CENTRAL PRODUCT DATA. Add real products here. No products = Shop shows "launching soon".
// Put images in /public/products/ and reference as "/products/file.jpg".
export type Product = {
  slug: string; name: string; category: string; // category = slug from categories.ts
  description: string; images: { src: string; alt: string }[];
  features?: string[]; specs?: Record<string, string>; dimensions?: string;
  variants?: string[]; price?: string; // only set once confirmed, e.g. "$29.99"
  amazonUrl?: string; // empty => "Coming Soon"
  featured?: boolean; verified?: boolean; // verified=true enables Product structured data (requires price)
};
export const products: Product[] = [
  /* Example (delete this comment and fill in real data):
  { slug: "example", name: "Example", category: "home-living", description: "...", images: [], amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX" }
  */
];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
