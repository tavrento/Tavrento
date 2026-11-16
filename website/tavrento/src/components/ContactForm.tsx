"use client";
import { useState } from "react";

export default function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<{ ok?: boolean; msg?: string; errors?: Record<string, string> }>({});
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const errors: Record<string, string> = {};
    if (String(data.name).trim().length < 2) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.email))) errors.email = "Enter a valid email.";
    if (String(data.subject).trim().length < 2) errors.subject = "Please add a subject.";
    if (String(data.message).trim().length < 10) errors.message = "Message must be at least 10 characters.";
    if (Object.keys(errors).length) return setState({ errors });
    if (!email) return setState({ ok: false, msg: "Email contact is not configured yet. Please contact the site owner through another channel." });
    const subject = encodeURIComponent(`[Tavrento] ${String(data.subject).trim()}`);
    const body = encodeURIComponent(`From: ${String(data.name).trim()} <${String(data.email).trim()}>\n\n${String(data.message).trim()}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setState({ ok: true, msg: "Your email app should open with this message. Review and send it there." });
  }
  const f = (id: string, label: string, area = false) => (
    <div><label htmlFor={id} className="text-sm font-medium">{label}</label>
      {area ? <textarea id={id} name={id} rows={5} className="mt-1 w-full rounded-md border border-neutral-300 p-3 text-sm" /> : <input id={id} name={id} type={id === "email" ? "email" : "text"} className="mt-1 w-full rounded-md border border-neutral-300 p-3 text-sm" />}
      {state.errors?.[id] && <p role="alert" className="mt-1 text-xs text-red-700">{state.errors[id]}</p>}</div>);
  return (
    <form onSubmit={submit} noValidate className="mt-8 space-y-5">
      {f("name", "Name")}{f("email", "Email")}{f("subject", "Subject")}{f("message", "Message", true)}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button className="rounded-md bg-black px-7 py-3 text-sm font-medium text-white hover:bg-neutral-700">Prepare email</button>
      {state.msg && <p role="status" className={`text-sm ${state.ok ? "text-green-700" : "text-red-700"}`}>{state.msg}</p>}
    </form>
  );
}
