import { faqs } from "@/config/faq";
import { meta } from "@/lib/meta";
export const metadata = meta("FAQ", "Answers to common questions about Tavrento.", "/faq");
export default function FAQ() {
  return (<div className="mx-auto max-w-3xl px-5 py-20"><h1 className="text-4xl font-semibold tracking-tight">FAQ</h1>
    <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map((f) => <details key={f.q} className="py-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-3 text-neutral-700">{f.a}</p></details>)}</div></div>);
}
