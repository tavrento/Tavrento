"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label={`${site.name} home`}><Image src={site.logo} alt={site.name} width={140} height={48} className="h-10 w-auto" priority /></Link>
        <nav aria-label="Primary" className="hidden gap-8 text-sm md:flex">
          {site.nav.map((n) => <Link key={n.href} href={n.href} className="transition-opacity hover:opacity-60">{n.label}</Link>)}
        </nav>
        <button className="md:hidden p-2" aria-label="Open menu" aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(true)}><Menu /></button>
      </div>
      {open && (
        <div id="drawer" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 bg-white px-5 py-4 md:hidden">
          <div className="flex items-center justify-between"><span className="text-lg font-bold">{site.name}</span>
            <button className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}><X /></button></div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-6 text-2xl">
            {site.nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
          </nav>
        </div>
      )}
    </header>
  );
}
