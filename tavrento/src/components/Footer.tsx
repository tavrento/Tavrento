import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
export default function Footer() {
  const social = Object.entries(site.social).filter(([, v]) => v);
  const nav = site.nav;
  return (
    <footer className="mt-24 border-t border-neutral-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div><Image src={site.logoMark} alt="" width={56} height={56} className="mb-3 h-14 w-14" /><p className="text-xl font-bold">TAVRENTO</p><p className="mt-2 text-sm text-neutral-600">{site.tagline}</p></div>
        <nav aria-label="Footer navigation"><p className="mb-3 text-xs font-semibold uppercase tracking-widest">Navigate</p>
          <ul className="space-y-2 text-sm text-neutral-600">{nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-black">{n.label}</Link></li>)}</ul></nav>
        <nav aria-label="Policies"><p className="mb-3 text-xs font-semibold uppercase tracking-widest">Policies</p>
          <ul className="space-y-2 text-sm text-neutral-600">{site.policies.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-black">{n.label}</Link></li>)}</ul></nav>
        {social.length > 0 && <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest">Follow</p>
          <ul className="space-y-2 text-sm text-neutral-600">{social.map(([k, v]) => <li key={k}><a href={v} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-black">{k}</a></li>)}</ul></div>}
      </div>
      <p className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Tavrento. All rights reserved.</p>
    </footer>
  );
}
