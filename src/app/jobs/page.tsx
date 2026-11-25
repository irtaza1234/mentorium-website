import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { CheckList } from "@/components/faq";
import { Icon } from "@/components/icons";
import { ButtonLink, ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui";
import { jobs } from "@/content/site";

export const metadata: Metadata = {
  title: "Jobs & Internships",
  description:
    "Reviewed job vacancies and internships from verified employers and public sources, with search by location, qualification and industry.",
};

const seekerFeatures = [
  "Browse government and private-sector jobs",
  "Search by location, qualification and industry",
  "Find paid internships",
  "Upload your CV once and apply easily",
  "Save opportunities to review later",
];

const employerFeatures = [
  "Register your organisation",
  "Publish vacancies and internships",
  "Receive and manage candidate applications",
  "Display a verified employer badge",
];

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs & internships"
        title="Opportunities you can trust"
        intro="Every vacancy and internship is reviewed before publication, and verified employers are clearly distinguished from opportunities shared for information."
      />

      <Section>
        <SectionHeading eyebrow="Latest opportunities" title="Current listings" />
        {jobs.length > 0 ? (
          <ul className="grid gap-4">
            {jobs.map((j) => (
              <li key={j.id} className="flex flex-col justify-between gap-4 rounded-lg border border-line p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="font-heading text-lg font-semibold text-navy-900">{j.title}</p>
                  <p className="text-muted">
                    {j.organisation} · {j.location} · {j.type}
                  </p>
                </div>
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-center ${
                    j.verified ? "bg-teal-50 text-teal-700" : "bg-navy-50 text-navy-700"
                  }`}
                >
                  {j.verified ? "Verified employer" : "Shared for information"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ComingSoon title="The jobs and internships portal is opening soon">
            Listings will appear here once our review process is in place. Book a consultation for help with your job
            search in the meantime.
          </ComingSoon>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="flex gap-4 rounded-lg border border-line p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Icon name="shield" />
            </span>
            <div>
              <p className="font-heading font-semibold text-navy-900">Verified employer</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                We have checked the employer&apos;s identity, and you apply through The Mentorium.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg border border-line p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
              <Icon name="book" />
            </span>
            <div>
              <p className="font-heading font-semibold text-navy-900">Shared for information</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                A public opportunity we have reviewed and shared. You apply directly with the organisation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-8 ring-1 ring-line">
            <p className="eyebrow mb-3">For job seekers</p>
            <h2 className="text-2xl font-semibold">Find your next step</h2>
            <div className="mt-6">
              <CheckList items={seekerFeatures} />
            </div>
          </div>
          <div id="employers" className="scroll-mt-28 rounded-xl bg-navy-900 p-8 text-white">
            <p className="eyebrow mb-3 !text-gold-300">For employers</p>
            <h2 className="text-2xl font-semibold !text-white">Reach motivated candidates</h2>
            <div className="mt-6">
              <CheckList items={employerFeatures} dark />
            </div>
            <ButtonLink href="/contact" className="mt-8">
              Register your interest
            </ButtonLink>
            <p className="mt-4 text-sm text-navy-100">
              Read our{" "}
              <Link href="/legal/job-posting-guidelines" className="underline underline-offset-2">
                Job Posting Guidelines
              </Link>{" "}
              and{" "}
              <Link href="/legal/employer-verification" className="underline underline-offset-2">
                Employer Verification Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          The Mentorium helps you prepare for and connect with opportunities. We do not promise or guarantee
          employment.
        </p>
      </Section>

      <CtaBand title="Want help with your job search?" text="Get CV support, interview preparation and personal job search guidance." />
    </>
  );
}
