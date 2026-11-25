import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { CheckList } from "@/components/faq";
import { Icon } from "@/components/icons";
import { ButtonLink, PageHero, Section, SectionHeading } from "@/components/ui";
import { assessments, reportContents } from "@/content/site";

export const metadata: Metadata = {
  title: "Career Assessment Centre",
  description:
    "Aptitude, career interest, personality, academic strength and career readiness assessments to guide your education and career choices.",
};

const steps = [
  { title: "Take an assessment", text: "Complete one or more assessments at your own pace." },
  { title: "Receive your report", text: "Get a preliminary report summarising your results." },
  { title: "Discuss with a counsellor", text: "Talk through what the results mean for your options." },
  { title: "Plan your next steps", text: "Leave with a clear plan for education, training or work." },
];

export default function AssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Career assessment centre"
        title="Understand your strengths before you choose"
        intro="Structured assessments that help you and your counsellor explore the directions that suit you best."
      />

      <Section>
        <SectionHeading
          eyebrow="Our assessments"
          title="Five assessments, one clearer picture"
          intro="Each assessment looks at a different part of your profile. Together, they give your counsellor a well-rounded view."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((a, i) => (
            <div key={a.name} className="rounded-lg border border-line p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 font-heading text-sm font-semibold text-gold-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{a.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-lg bg-gold-50 p-7">
            <div>
              <p className="font-heading text-lg font-semibold text-navy-900">Online assessments are coming</p>
              <p className="mt-2 leading-relaxed text-muted">
                Soon you will be able to take assessments online and receive a preliminary report instantly.
              </p>
            </div>
            <ButtonLink href="/book" variant="navy" className="mt-6 self-start">
              Ask about an assessment
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Your report"
              title="What your preliminary report covers"
              intro="Reports are written in plain language and designed to be discussed with a counsellor."
            />
            <CheckList items={reportContents} />
          </div>
          <div>
            <SectionHeading eyebrow="How it works" title="From assessment to action" />
            <ol className="grid gap-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-lg border border-line bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 font-heading text-sm font-semibold text-navy-900">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-navy-900">{s.title}</p>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl gap-5 rounded-xl border border-gold-500/40 bg-gold-50 p-7">
          <span className="text-gold-700">
            <Icon name="shield" className="h-7 w-7" />
          </span>
          <div>
            <p className="font-heading font-semibold text-navy-900">Assessments guide — they don&apos;t decide</p>
            <p className="mt-2 leading-relaxed text-muted">
              Our assessments are guidance tools. They are not definitive career decisions or clinical diagnoses, and
              they work best alongside a conversation with a qualified counsellor. Read our{" "}
              <Link href="/legal/assessment-disclaimer" className="text-navy-900 underline underline-offset-2">
                Assessment Disclaimer
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <CtaBand title="Not sure where to start?" text="Book a consultation and we'll recommend the right assessment for you." />
    </>
  );
}
