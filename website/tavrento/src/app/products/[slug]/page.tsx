import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { products, getProduct } from "@/config/products";
import { site } from "@/config/site";
import AmazonButton from "@/components/AmazonButton";
import ProductCard from "@/components/ProductCard";
import { meta } from "@/lib/meta";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.length ? products.map((p) => ({ slug: p.slug })) : [{ slug: "coming-soon" }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return slug === "coming-soon" && products.length === 0
    ? meta("Products Coming Soon", "The Tavrento collection is launching soon.", "/products/coming-soon")
    : {};
  return meta(p.name, p.description.slice(0, 155), `/products/${p.slug}`);
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) {
    if (slug === "coming-soon" && products.length === 0) {
      return (
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Products coming soon</h1>
          <p className="mt-4 text-neutral-600">The Tavrento collection is launching soon. Please check back.</p>
          <Link href="/shop" className="mt-8 inline-block rounded-md bg-black px-7 py-3 text-sm font-medium text-white hover:bg-neutral-700">Visit the shop</Link>
        </div>
      );
    }
    notFound();
  }
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const ld = p.verified && p.price ? { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, image: p.images.map((i) => site.url + i.src), brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", price: p.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", ...(p.amazonUrl ? { url: p.amazonUrl } : {}) } } : null;
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid gap-3">{p.images.length ? p.images.map((i) => <div key={i.src} className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200"><Image src={i.src} alt={i.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></div>) : <div className="aspect-square rounded-lg border border-neutral-200 bg-neutral-50" />}</div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{p.name}</h1>
          {p.price && <p className="mt-2 text-lg">{p.price}</p>}
          <p className="mt-4 leading-relaxed text-neutral-700">{p.description}</p>
          {p.variants && <p className="mt-6 text-sm"><span className="font-semibold">Variants:</span> {p.variants.join(", ")}</p>}
          {p.dimensions && <p className="mt-2 text-sm"><span className="font-semibold">Dimensions:</span> {p.dimensions}</p>}
          <AmazonButton url={p.amazonUrl} className="mt-8 w-full sm:w-auto" />
          {p.features && <ul className="mt-8 list-disc space-y-1 pl-5 text-sm text-neutral-700">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>}
          {p.specs && <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">{Object.entries(p.specs).map(([k, v]) => <div key={k} className="flex justify-between py-2"><dt className="font-medium">{k}</dt><dd className="text-neutral-600">{v}</dd></div>)}</dl>}
        </div>
      </div>
      {related.length > 0 && <section className="mt-20"><h2 className="text-2xl font-semibold">Related products</h2><div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>}
    </div>
  );
}
