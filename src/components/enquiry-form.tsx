"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { services } from "@/content/site";

const initialState: EnquiryState = { status: "idle" };

const field =
  "mt-1.5 block w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-ink shadow-xs outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-gold-500/40";
const label = "block text-sm font-medium text-navy-900";

export function EnquiryForm({ kind }: { kind: "consultation" | "contact" }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-teal-700/30 bg-teal-50 p-8">
        <p className="font-heading text-lg font-semibold text-teal-700">Thank you — your message has been sent.</p>
        <p className="mt-2 text-muted">Our team will contact you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot: real visitors never see or fill this field. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full name <span className="text-gold-700">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
          {state.errors?.name && <p className="mt-1 text-sm text-burgundy-800">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-gold-700">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
          {state.errors?.email && <p className="mt-1 text-sm text-burgundy-800">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="stage" className={label}>
            I am a…
          </label>
          <select id="stage" name="stage" className={field} defaultValue="">
            <option value="">Select one</option>
            <option>School or college student</option>
            <option>University student or graduate</option>
            <option>Job seeker</option>
            <option>Working professional</option>
            <option>Parent or guardian</option>
            <option>Employer or organisation</option>
          </select>
        </div>
      </div>

      {kind === "consultation" && (
        <div>
          <label htmlFor="service" className={label}>
            What would you like help with?
          </label>
          <select id="service" name="service" className={field} defaultValue="">
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className={label}>
          {kind === "consultation" ? "Tell us a little about your goals" : "Your message"}{" "}
          <span className="text-gold-700">*</span>
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
        {state.errors?.message && <p className="mt-1 text-sm text-burgundy-800">{state.errors.message}</p>}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-navy-900" />
        <span>
          I agree that The Mentorium may use these details to respond to my enquiry, as described in the{" "}
          <Link href="/legal/privacy-policy" className="text-navy-900 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {state.errors?.consent && <p className="-mt-3 text-sm text-burgundy-800">{state.errors.consent}</p>}

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-burgundy-800/20 bg-burgundy-800/5 p-4 text-sm text-burgundy-800">
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-gold-500 px-6 py-3 font-heading text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {pending ? "Sending…" : kind === "consultation" ? "Request a consultation" : "Send message"}
        </button>
      </div>
    </form>
  );
}
