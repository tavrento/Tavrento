import { site } from "@/config/site";
import { meta } from "@/lib/meta";
import ContactForm from "@/components/ContactForm";
export const metadata = meta("Contact", "Get in touch with the Tavrento team.", "/contact");
export default function Contact() {
  return (<div className="mx-auto max-w-xl px-5 py-20"><h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
    {site.email && <p className="mt-4 text-neutral-600">Email: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>}
    {!site.email && <p className="mt-4 text-sm text-neutral-600">Email contact is not configured yet.</p>}
    <ContactForm email={site.email} /></div>);
}
