import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { categories } from "@/config/categories";
import { products } from "@/config/products";
import ProductCard from "@/components/ProductCard";
import { meta } from "@/lib/meta";
export const metadata = meta(`${site.name} — ${site.tagline}`, site.description, "/");
const why = [["Thoughtfully selected", "Every product earns its place through function and design."], ["Practical design", "Made to fit naturally into daily routines."], ["Customer first", "Clear information and responsive support."]];
export default function Home() {
  const cats = categories.filter((c) => products.some((p) => p.category === c.slug));
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (<>
    <section className="mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{site.tagline}</p>
      <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Everyday Essentials. Thoughtfully Selected.</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">Discover modern products designed to make everyday living simpler, smarter, and better.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/shop" className="rounded-md bg-black px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">Explore Collection</Link>
        <Link href="/about" className="rounded-md border border-black px-7 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white">Discover Tavrento</Link>
      </div>
    </section>
    <section aria-label="Tavrento brand" className="mx-auto max-w-6xl px-5">
      <Image src={site.banner} alt="Tavrento — tavrento.com. Shop, explore, more." width={2048} height={768} sizes="(min-width:1152px) 1112px, 100vw" className="h-auto w-full rounded-lg border border-neutral-200" />
    </section>
    {cats.length > 0 && <section className="mx-auto max-w-6xl px-5 py-12"><h2 className="text-2xl font-semibold">Categories</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">{cats.map((c) => <Link key={c.slug} href={`/shop?category=${c.slug}`} className="rounded-lg border border-neutral-200 p-6 shadow-soft transition-shadow hover:shadow-md"><h3 className="font-medium">{c.name}</h3><p className="mt-2 text-sm text-neutral-600">{c.blurb}</p></Link>)}</div></section>}
    {featured.length > 0 && <section className="mx-auto max-w-6xl px-5 py-12"><h2 className="text-2xl font-semibold">Best Sellers</h2>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">{featured.map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>}
    <section className="mx-auto max-w-3xl px-5 py-20 text-center"><h2 className="text-3xl font-semibold tracking-tight">Designed Around Everyday Living.</h2>
      <p className="mt-4 leading-relaxed text-neutral-600">Tavrento brings thoughtfully selected everyday products together under one modern brand, focused on quality, functionality, practical design, and customer satisfaction.</p></section>
    <section className="border-y border-neutral-200 bg-neutral-50"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-3">
      {why.map(([h, t]) => <div key={h}><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm text-neutral-600">{t}</p></div>)}</div></section>
    {site.newsletterAction && <section className="mx-auto max-w-xl px-5 py-20 text-center"><h2 className="text-2xl font-semibold">Stay in the loop</h2>
      <form action={site.newsletterAction} method="post" className="mt-6 flex gap-2"><label htmlFor="nl" className="sr-only">Email</label>
        <input id="nl" name="email" type="email" required placeholder="you@example.com" className="flex-1 rounded-md border border-neutral-300 px-4 py-3 text-sm" />
        <button className="rounded-md bg-black px-6 text-sm text-white">Subscribe</button></form></section>}
  </>);
}
