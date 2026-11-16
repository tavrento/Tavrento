import { site } from "@/config/site";
export default function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 rounded-md border border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-700">
        TEMPLATE — placeholder text for {site.name}. Replace with content reviewed by a qualified attorney. This template does not constitute legal compliance.
      </p>
      {sections.map(([h, t]) => <section key={h} className="mt-8"><h2 className="text-lg font-semibold">{h}</h2><p className="mt-2 leading-relaxed text-neutral-700">{t}</p></section>)}
    </article>
  );
}
