import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/config/products";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop", "/about", "/faq", "/contact", ...site.policies.map((p) => p.href), ...products.map((p) => `/products/${p.slug}`)];
  return paths.map((p) => ({ url: site.url + p, lastModified: new Date() }));
}
