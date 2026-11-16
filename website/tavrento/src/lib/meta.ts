import type { Metadata } from "next";
import { site } from "@/config/site";
export function meta(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path },
    openGraph: { title, description, url: site.url + path, siteName: site.name, type: "website", locale: "en_US", images: [site.banner] } };
}
