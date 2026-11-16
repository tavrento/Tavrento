"use client";

import { useEffect, useState } from "react";
import { products } from "@/config/products";
import { categories } from "@/config/categories";
import ProductCard from "@/components/ProductCard";

export default function ShopContent() {
  const [category, setCategory] = useState<string>();
  const [sort, setSort] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("category") ?? undefined);
    setSort(params.get("sort") ?? undefined);
  }, []);

  const cats = categories.filter((c) => products.some((p) => p.category === c.slug));
  const list = category ? products.filter((p) => p.category === category) : [...products];
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  const href = (c?: string, s?: string) => {
    const query = new URLSearchParams({ ...(c ? { category: c } : {}), ...(s ? { sort: s } : {}) });
    const search = query.toString();
    return search ? `/shop?${search}` : "/shop";
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Shop</h1>
      {products.length === 0 ? <p className="mt-10 text-neutral-600">The Tavrento collection is launching soon. Please check back.</p> : <>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-2"><a href={href(undefined, sort)} className={`rounded-full border px-4 py-1.5 ${!category ? "bg-black text-white" : ""}`}>All</a>
            {cats.map((c) => <a key={c.slug} href={href(c.slug, sort)} className={`rounded-full border px-4 py-1.5 ${category === c.slug ? "bg-black text-white" : ""}`}>{c.name}</a>)}</div>
          <div className="flex gap-3"><a href={href(category)} className={!sort ? "font-semibold" : ""}>Featured</a><a href={href(category, "name")} className={sort === "name" ? "font-semibold" : ""}>Name A–Z</a></div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div></>}
    </div>
  );
}
