import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, PageHero, Section } from "@/components/ui";
import { counselling } from "@/content/site";

export const metadata: Metadata = {
  title: "Career Counselling",
  description:
    "Academic, career and employment counselling: subject and university selection, career planning, CV development, interview preparation and more.",
};

export default function CounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Career counselling"
        title="Personal guidance for your education and career"
        intro="Whether you are choosing subjects, planning a degree, changing careers or preparing for the job market, our counsellors help you decide with confidence."
      />

      <nav aria-label="Counselling services" className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {counselling.map((c) => (
            <Link
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border border-line px-4 py-2 font-heading text-sm font-medium text-navy-900 hover:border-gold-500 hover:text-gold-700"
            >
              {c.title}
            </Link>
          ))}
        </Container>
      </nav>

      {counselling.map((group, gi) => (
        <Section key={group.id} id={group.id} tone={gi % 2 ? "mist" : "white"} className="scroll-mt-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3">0{gi + 1}</p>
              <h2 className="text-3xl font-semibold">{group.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{group.intro}</p>
              <ButtonLink href="/book" className="mt-7">
                Book a session
              </ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.name} className="rounded-lg border border-line bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-gold-700">
                      <Icon name="check" className="h-5 w-5" />
                    </span>
                    <p className="font-heading font-semibold text-navy-900">{item.name}</p>
                  </div>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div className="mx-auto max-w-3xl rounded-xl border border-line bg-navy-50 p-8 text-center">
          <p className="font-heading text-lg font-semibold text-navy-900">How sessions work</p>
          <p className="mt-3 leading-relaxed text-muted">
            Session formats, durations and fees will be confirmed shortly. Send us a consultation request and our team
            will contact you with the details.
          </p>
          <p className="mt-4 text-sm text-muted">
            Counselling provides guidance to support your decisions; it does not guarantee admission, scholarships or
            employment. See our{" "}
            <Link href="/legal/counselling-disclaimer" className="text-navy-900 underline underline-offset-2">
              Counselling Disclaimer
            </Link>
            .
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
