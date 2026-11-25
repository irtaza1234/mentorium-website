import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { Icon } from "@/components/icons";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { faqs, resourceCategories } from "@/content/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Career guidance articles, educational resources, job and interview preparation guides, CV writing help, videos and webinars.",
};

const icons = ["compass", "cap", "briefcase", "people", "book", "play", "spark"];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge centre"
        title="Resources for your education and career"
        intro="Guides, articles, videos and events to help you plan, prepare and progress."
      />

      <Section>
        <SectionHeading
          eyebrow="Browse by topic"
          title="Our knowledge centre"
          intro="New articles, guides and events will be published here regularly."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCategories.map((r, i) => (
            <div key={r.name} className="rounded-lg border border-line p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-900">
                <Icon name={icons[i] ?? "book"} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{r.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-gold-700 uppercase">Coming soon</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" id="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
