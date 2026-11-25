import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui";
import { courses, trainingAreas } from "@/content/site";

export const metadata: Metadata = {
  title: "Training & Development",
  description:
    "Training in communication, presentation, leadership, digital skills, AI tools, entrepreneurship, professional development and competitive exam preparation.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training & development"
        title="Practical skills for study, work and leadership"
        intro="Programmes designed to build the competencies that help you succeed in your studies, your job search and your career."
      />

      <Section>
        <SectionHeading eyebrow="Programme areas" title="What you can learn with us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainingAreas.map((t, i) => (
            <div key={t.name} className="flex flex-col rounded-lg border border-line p-6">
              <span className="font-heading text-sm font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" id="catalogue">
        <SectionHeading
          eyebrow="Course catalogue"
          title="Upcoming courses"
          intro="Each course will list its description, duration, trainer and how to enrol."
        />
        {courses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <div key={c.slug} className="rounded-lg border border-line bg-white p-6">
                <p className="eyebrow">{c.area}</p>
                <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.summary}</p>
                <p className="mt-4 text-sm text-navy-900">
                  {c.duration} · {c.mode}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoon title="The first course schedule will be announced soon">
            Register your interest through a consultation request and we will let you know when enrolment opens.
          </ComingSoon>
        )}
      </Section>

      <CtaBand title="Interested in a programme?" text="Tell us what you want to learn and we'll guide you to the right course." />
    </>
  );
}
