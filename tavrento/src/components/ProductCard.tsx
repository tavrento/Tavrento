import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/config/products";
export default function ProductCard({ p }: { p: Product }) {
  const img = p.images[0];
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
      </div>
      <h3 className="mt-3 text-sm font-medium">{p.name}</h3>
      {p.price && <p className="text-sm text-neutral-600">{p.price}</p>}
    </Link>
  );
}
