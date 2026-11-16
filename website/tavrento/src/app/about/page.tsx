import { meta } from "@/lib/meta";
export const metadata = meta("About", "Tavrento's mission, vision and product philosophy.", "/about");
const blocks = [["Our Mission", "To make everyday living simpler, smarter and better through thoughtfully selected products."], ["Our Vision", "A modern, trustworthy brand people reach for in everyday moments."], ["Product Philosophy", "Quality, functionality and practical design — nothing unnecessary."], ["Customer Experience", "Clear product information, honest descriptions and responsive support."]];
export default function About() {
  return (<div className="mx-auto max-w-3xl px-5 py-20"><h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Designed Around Everyday Living.</h1>
    {blocks.map(([h, t]) => <section key={h} className="mt-10"><h2 className="text-xl font-semibold">{h}</h2><p className="mt-2 leading-relaxed text-neutral-700">{t}</p></section>)}</div>);
}
