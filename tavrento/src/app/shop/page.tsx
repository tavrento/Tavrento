import Link from "next/link";
import { products } from "@/config/products";
import { categories } from "@/config/categories";
import ProductCard from "@/components/ProductCard";
import { meta } from "@/lib/meta";
export const metadata = meta("Shop", "Browse the Tavrento collection of modern everyday essentials.", "/shop");
export default async function Shop({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const { category, sort } = await searchParams;
  const cats = categories.filter((c) => products.some((p) => p.category === c.slug));
  const list = category ? products.filter((p) => p.category === category) : [...products];
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  const href = (c?: string, s?: string) => `/shop?${new URLSearchParams({ ...(c ? { category: c } : {}), ...(s ? { sort: s } : {}) })}`;
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Shop</h1>
      {products.length === 0 ? <p className="mt-10 text-neutral-600">The Tavrento collection is launching soon. Please check back.</p> : <>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-2"><Link href={href(undefined, sort)} className={`rounded-full border px-4 py-1.5 ${!category ? "bg-black text-white" : ""}`}>All</Link>
            {cats.map((c) => <Link key={c.slug} href={href(c.slug, sort)} className={`rounded-full border px-4 py-1.5 ${category === c.slug ? "bg-black text-white" : ""}`}>{c.name}</Link>)}</div>
          <div className="flex gap-3"><Link href={href(category)} className={!sort ? "font-semibold" : ""}>Featured</Link><Link href={href(category, "name")} className={sort === "name" ? "font-semibold" : ""}>Name A–Z</Link></div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div></>}
    </div>
  );
}
