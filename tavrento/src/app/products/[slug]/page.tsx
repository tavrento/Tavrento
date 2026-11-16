import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { products, getProduct } from "@/config/products";
import { site } from "@/config/site";
import AmazonButton from "@/components/AmazonButton";
import ProductCard from "@/components/ProductCard";
import { meta } from "@/lib/meta";
export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug); if (!p) return {};
  return meta(p.name, p.description.slice(0, 155), `/products/${p.slug}`);
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug); if (!p) notFound();
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
