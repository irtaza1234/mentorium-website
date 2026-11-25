import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Request a career counselling, academic guidance or assessment consultation with The Mentorium.",
};

const next = [
  { title: "Send your request", text: "Tell us about yourself and the guidance you are looking for." },
  { title: "We contact you", text: "Our team reaches out to understand your needs and suggest the right counsellor." },
  { title: "Meet your counsellor", text: "Attend your session and leave with clear, practical next steps." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a consultation"
        title="Take the first step"
        intro="Share a few details and our team will contact you to arrange a session with the right counsellor."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold">What happens next</h2>
            <ol className="mt-8 grid gap-6">
              {next.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 font-heading font-semibold text-navy-900">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-navy-900">{s.title}</p>
                    <p className="mt-1 text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 rounded-lg bg-navy-50 p-5 text-sm leading-relaxed text-muted">
              Online booking with live counsellor availability is coming soon. Session fees and formats will be shared
              when our team contacts you.
            </p>
          </div>
          <div className="rounded-xl border border-line p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-semibold">Consultation request</h2>
            <p className="mt-2 mb-8 text-muted">Fields marked * are required.</p>
            <EnquiryForm kind="consultation" />
          </div>
        </div>
      </Section>
    </>
  );
}
