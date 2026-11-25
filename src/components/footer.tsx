import Image from "next/image";
import Link from "next/link";
import { contact, legalPages, site } from "@/content/site";
import { Icon } from "./icons";
import { Container } from "./ui";

const columns = [
  {
    title: "Institute",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Approach", href: "/about#approach" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Career Counselling", href: "/career-counselling" },
      { label: "Career Assessment", href: "/career-assessment" },
      { label: "Training & Development", href: "/training" },
      { label: "Jobs & Internships", href: "/jobs" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Book a Consultation", href: "/book" },
      { label: "Resources", href: "/resources" },
      { label: "For Employers", href: "/jobs#employers" },
      { label: "Register / Login", href: "/login" },
    ],
  },
];

function ContactLine({ icon, value, fallback }: { icon: string; value: string | null; fallback: string }) {
  return (
    <li className="flex items-start gap-3">
      <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
      <span className={value ? "text-navy-100" : "text-navy-100/60 italic"}>{value ?? fallback}</span>
    </li>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="bg-navy-950 text-sm text-navy-100">
      <div className="h-1 bg-gold-500" />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Image
            src="/brand/mentorium-logo-horizontal-reversed.svg"
            alt="Mentorium — Your Gateway to Career Excellence"
            width={630}
            height={192}
            unoptimized
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm leading-relaxed text-navy-100/80">
            {site.philosophy.join(" ")}
          </p>
          <ul className="mt-6 space-y-3">
            <ContactLine icon="mail" value={contact.email} fallback="Official email coming soon" />
            <ContactLine icon="phone" value={contact.phone} fallback="Phone number coming soon" />
            <ContactLine icon="pin" value={contact.address} fallback="Institute address coming soon" />
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-heading text-xs font-semibold tracking-[0.16em] text-gold-300 uppercase">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-navy-100/70">
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-navy-100/70">
            {legalPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/legal/${p.slug}`} className="hover:text-white">
                  {p.title.replace(" Policy", "")}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
