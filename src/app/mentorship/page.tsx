import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui";
import { mentorCategories, mentors } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentorship Network",
  description:
    "Connect with experienced mentors in education, public administration, business, finance, IT and AI, law, marketing, HR and engineering.",
};

const profileIncludes = [
  "Professional photograph",
  "Name and designation",
  "Academic qualifications",
  "Professional experience",
  "Area of expertise",
  "Short biography",
  "Consultation availability",
  "Booking option",
];

export default function MentorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Mentorship network"
        title="Learn from people who have walked the path"
        intro="Our mentors are experienced educators and professionals who share practical insight from their fields."
      />

      <Section>
        <SectionHeading eyebrow="Mentor categories" title="Find guidance in your field" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentorCategories.map((c) => {
            const count = mentors.filter((m) => m.category === c).length;
            return (
              <div key={c} className="flex items-center gap-4 rounded-lg border border-line p-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                  <Icon name="people" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-navy-900">{c}</p>
                  <p className="text-sm text-muted">{count > 0 ? `${count} mentor${count > 1 ? "s" : ""}` : "Profiles coming soon"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Mentor directory"
              title="Our mentors"
              intro="Every mentor profile is reviewed and approved before it is published."
            />
            {mentors.length === 0 && (
              <ComingSoon title="The mentor directory is being prepared">
                Mentor profiles will be published here once they are confirmed and approved.
              </ComingSoon>
            )}
          </div>
          <div className="rounded-xl border border-line bg-white p-8">
            <p className="font-heading font-semibold text-navy-900">Each mentor profile will include</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {profileIncludes.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-ink">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Are you an experienced professional?"
        text="If you would like to mentor students and graduates, we would like to hear from you."
      />
    </>
  );
}
