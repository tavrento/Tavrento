import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/config/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = products.length ? products.map((p) => `/products/${p.slug}`) : ["/products/coming-soon"];
  const paths = ["/", "/shop", "/about", "/faq", "/contact", ...site.policies.map((p) => p.href), ...productPaths];
  return paths.map((p) => ({ url: site.url + p, lastModified: new Date() }));
}
