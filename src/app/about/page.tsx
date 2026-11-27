import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { CheckList } from "@/components/faq";
import { Icon } from "@/components/icons";
import { LeaderFeature } from "@/components/leader-feature";
import { ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui";
import { journey } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Mentorium is a career counselling and employment support institute guiding students, graduates, job seekers and professionals.",
};

const mission = [
  "Provide reliable academic and career counselling.",
  "Identify individual aptitude, interests and professional potential.",
  "Facilitate access to education, training and employment.",
  "Connect students and professionals with experienced mentors.",
  "Promote employability, entrepreneurship and lifelong learning.",
];

const objectives = [
  { title: "Informed choices", text: "Help individuals make education and career decisions based on evidence and self-understanding." },
  { title: "Employability", text: "Develop the professional competencies that employers look for." },
  { title: "Access", text: "Open pathways to education, training, internships and employment." },
  { title: "Mentorship", text: "Build a trusted network of experienced educators and professionals." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Guiding individuals towards professional excellence"
        intro="A professional institute bringing together educators, career counsellors, industry professionals and mentors under one roof."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Who we are</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">An institute built around guidance</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                The Mentorium is a professional career counselling and employment support institute committed to
                guiding students, graduates, job seekers and working professionals towards meaningful academic and
                professional journeys.
              </p>
              <p>
                We bring together experienced educators, career counsellors, industry professionals and mentors to help
                individuals discover their potential, make informed decisions and access opportunities for growth.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-xl bg-navy-900 p-8 text-white">
              <p className="eyebrow !text-gold-300">Our vision</p>
              <p className="mt-3 font-heading text-xl leading-snug font-medium">
                To become a trusted career development and employment support institution that empowers individuals to
                make informed choices and achieve professional excellence.
              </p>
            </div>
            <div className="rounded-xl border border-line p-8">
              <p className="eyebrow">Our brand promise</p>
              <p className="mt-3 leading-relaxed text-ink">
                We help individuals make informed career decisions, develop professional competencies and connect with
                opportunities that shape their future.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our mission" title="What we set out to do" />
            <CheckList items={mission} />
          </div>
          <div>
            <SectionHeading eyebrow="Institutional objectives" title="What we work towards" />
            <div className="grid gap-4 sm:grid-cols-2">
              {objectives.map((o) => (
                <div key={o.title} className="rounded-lg border border-line bg-white p-6">
                  <p className="font-heading font-semibold text-navy-900">{o.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="leadership">
        <LeaderFeature slug="amjad-iqbal-khattak" cta={false} />
        <div className="mt-20">
          <SectionHeading
            eyebrow="Our team"
            title="The people behind The Mentorium"
            intro="Further profiles of our leadership, faculty and advisers will be published here once confirmed."
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {["Founder / Director", "Faculty and Professional Team", "Advisory Board"].map((role) => (
            <div key={role} className="rounded-lg border border-line p-7">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-navy-700/40">
                <Icon name="user" className="h-8 w-8" />
              </span>
              <p className="mt-5 font-heading text-lg font-semibold text-navy-900">{role}</p>
              <p className="mt-1 text-sm text-muted">Profiles coming soon</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="approach" tone="navy">
        <SectionHeading
          eyebrow="Our approach"
          title="Discover. Develop. Connect."
          intro="Every engagement follows the same three-part philosophy."
          dark
        />
        <div className="grid gap-5 md:grid-cols-3">
          {journey.map((j) => (
            <div key={j.step} className="rounded-lg border border-white/10 bg-white/5 p-7">
              <p className="font-heading text-sm font-semibold text-gold-300">{j.step}</p>
              <p className="mt-3 font-heading text-xl font-semibold text-white">{j.title}</p>
              <p className="mt-2 leading-relaxed text-navy-100">{j.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">Our commitment</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Honest guidance, responsibly given</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            We treat assessments as guidance tools rather than final verdicts, review every opportunity before we share
            it, never promise guaranteed employment, and protect the personal information you trust us with.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <ComingSoon title="Accreditations and partnerships">
            Details of affiliations and partner institutions will appear here once confirmed.
          </ComingSoon>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
