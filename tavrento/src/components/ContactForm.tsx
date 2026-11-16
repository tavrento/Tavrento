"use client";
import { useState } from "react";
export default function ContactForm() {
  const [state, setState] = useState<{ ok?: boolean; msg?: string; errors?: Record<string, string>; busy?: boolean }>({});
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const errors: Record<string, string> = {};
    if (String(data.name).trim().length < 2) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.email))) errors.email = "Enter a valid email.";
    if (String(data.subject).trim().length < 2) errors.subject = "Please add a subject.";
    if (String(data.message).trim().length < 10) errors.message = "Message must be at least 10 characters.";
    if (Object.keys(errors).length) return setState({ errors });
    setState({ busy: true });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json(); setState({ ok: r.ok, msg: j.message });
    } catch { setState({ ok: false, msg: "Network error. Please try again." }); }
  }
  const f = (id: string, label: string, area = false) => (
    <div><label htmlFor={id} className="text-sm font-medium">{label}</label>
      {area ? <textarea id={id} name={id} rows={5} className="mt-1 w-full rounded-md border border-neutral-300 p-3 text-sm" /> : <input id={id} name={id} type={id === "email" ? "email" : "text"} className="mt-1 w-full rounded-md border border-neutral-300 p-3 text-sm" />}
      {state.errors?.[id] && <p role="alert" className="mt-1 text-xs text-red-700">{state.errors[id]}</p>}</div>);
  return (
    <form onSubmit={submit} noValidate className="mt-8 space-y-5">
      {f("name", "Name")}{f("email", "Email")}{f("subject", "Subject")}{f("message", "Message", true)}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button disabled={state.busy} className="rounded-md bg-black px-7 py-3 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50">{state.busy ? "Sending…" : "Send message"}</button>
      {state.msg && <p role="status" className={`text-sm ${state.ok ? "text-green-700" : "text-red-700"}`}>{state.msg}</p>}
    </form>
  );
}
