import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Icon, WhatsAppIcon } from "@/components/icons";
import { PageHero, Section } from "@/components/ui";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The Mentorium for career counselling, assessments, training or employer enquiries.",
};

function Detail({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string | null; href?: string }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">{icon}</span>
      <div>
        <p className="font-heading text-sm font-semibold text-navy-900">{label}</p>
        {value ? (
          href ? (
            <a href={href} className="text-ink hover:text-gold-700">
              {value}
            </a>
          ) : (
            <p className="text-ink">{value}</p>
          )
        ) : (
          <p className="text-muted italic">Coming soon</p>
        )}
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here to help"
        intro="Questions about counselling, assessments, training or partnerships? Send us a message and our team will respond."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold">Contact details</h2>
            <ul className="mt-8 grid gap-6">
              <Detail icon={<Icon name="mail" className="h-5 w-5" />} label="Email" value={contact.email} href={contact.email ? `mailto:${contact.email}` : undefined} />
              <Detail icon={<Icon name="phone" className="h-5 w-5" />} label="Phone" value={contact.phone} href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined} />
              <Detail
                icon={<WhatsAppIcon className="h-5 w-5" />}
                label="WhatsApp"
                value={contact.whatsapp ? `+${contact.whatsapp}` : null}
                href={contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : undefined}
              />
              <Detail icon={<Icon name="pin" className="h-5 w-5" />} label="Institute address" value={contact.address} />
              <Detail icon={<Icon name="clock" className="h-5 w-5" />} label="Office hours" value={contact.hours} />
            </ul>
            <div className="mt-10 overflow-hidden rounded-lg border border-line">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Map showing The Mentorium's location"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-navy-50 text-sm text-muted">Map will appear here</div>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-line p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 mb-8 text-muted">Fields marked * are required.</p>
            <EnquiryForm kind="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
