import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { CheckList, Faq } from "@/components/faq";
import { Icon } from "@/components/icons";
import { LeaderFeature } from "@/components/leader-feature";
import khattakPhoto from "@/assets/team/amjad-iqbal-khattak.webp";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import {
  audiences,
  faqs,
  heroCard,
  heroServices,
  leadership,
  jobs,
  journey,
  mentorCategories,
  mentors,
  services,
  testimonials,
  trainingAreas,
  whyChoose,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Journey />
      <CoreServices />
      <Welcome />
      <Section id="our-leadership" tone="mist" className="scroll-mt-20">
        <LeaderFeature slug="amjad-iqbal-khattak" />
      </Section>
      <WhyChoose />
      <Mentors />
      <Opportunities />
      <Training />
      {testimonials.length > 0 && <Testimonials />}
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            intro="Can't find your answer here? Get in touch and our team will help."
          />
          <Faq items={faqs} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

function Hero() {
  const leader = leadership[0];
  return (
    <section className="relative overflow-hidden bg-navy-50">
      <Container className="relative grid items-start gap-12 pt-8 pb-14 sm:pt-10 sm:pb-16 lg:grid-cols-[1.2fr_1fr] lg:pt-12 lg:pb-20">
        <div className="animate-rise">
          <p className="eyebrow mb-4">Career Counselling · Mentorship · Employment Support</p>
          <h1 className="text-3xl leading-[1.15] font-semibold sm:text-4xl lg:text-[2.6rem]">
            Submit the form to avail any of the following services
          </h1>
          <ol className="mt-8 grid gap-3">
            {heroServices.map((s, i) => (
              <li key={s} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 font-heading text-xs font-semibold text-gold-300">
                  {i + 1}
                </span>
                <span className="text-[17px] leading-snug text-ink">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book" className="!px-7 !py-3.5">
              Submit Form <Icon name="arrow" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/jobs" variant="outline" className="!px-6 !py-3.5">
              Explore Career Opportunities
            </ButtonLink>
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:150ms]">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-navy-900 p-6 shadow-2xl ring-1 ring-gold-500/40">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/brand/mentorium-emblem-reversed.svg"
                alt=""
                width={320}
                height={320}
                unoptimized
                priority
                className="h-12 w-12"
              />
              <p className="font-heading text-2xl font-semibold tracking-wide text-gold-300 uppercase">
                {heroCard.name}
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-gold-500/30">
              <Image
                src={khattakPhoto}
                alt={`Portrait of ${leader.name}`}
                priority
                sizes="(min-width: 1024px) 384px, 90vw"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-5 text-center">
              <p className="font-heading text-lg font-semibold text-white">{leader.name}</p>
              <p className="mt-0.5 font-heading text-sm font-medium text-gold-300">{leader.role}</p>
              <p className="mt-2 text-[13px] leading-snug text-navy-100">{leader.formerly}</p>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative bg-navy-900">
        <Container>
          <ul className="flex items-center justify-start gap-x-4 overflow-x-auto py-4 font-heading text-sm font-medium whitespace-nowrap text-navy-50 sm:justify-center sm:gap-x-5">
            {heroCard.offerings.map((o, i) => (
              <li key={o} className="flex items-center gap-x-4 sm:gap-x-5">
                {i > 0 && (
                  <span className="text-gold-500" aria-hidden="true">
                    |
                  </span>
                )}
                {o}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Your journey starts here"
        title="Three steps from uncertainty to opportunity"
        align="center"
      />
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        <div className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gold-500/60 md:block" aria-hidden="true" />
        {journey.map((j) => (
          <li key={j.step} className="relative text-center">
            <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500 bg-white font-heading text-lg font-semibold text-navy-900">
              {j.step}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{j.title}</h3>
            <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted">{j.text}</p>
            <Link href={j.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
              Learn more <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function CoreServices() {
  return (
    <Section tone="mist">
      <SectionHeading
        eyebrow="Our core services"
        title="Guidance for every stage of your education and career"
        intro="Academic and professional counselling, assessment, training and employment support — under one roof."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex flex-col rounded-lg border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-lg"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
              <Icon name={s.icon} />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">{s.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
              Explore <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Welcome() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Welcome to The Mentorium</p>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
            A professional institute for meaningful academic and professional journeys
          </h2>
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
          <ButtonLink href="/about" variant="outline" className="mt-8">
            About The Mentorium
          </ButtonLink>
        </div>
        <div className="rounded-xl border border-line bg-navy-50 p-8">
          <p className="font-heading font-semibold text-navy-900">Who we serve</p>
          <ul className="mt-5 space-y-4">
            {audiences.map((a) => (
              <li key={a} className="flex items-center gap-3 text-ink">
                <span className="h-2 w-2 rotate-45 bg-gold-500" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function WhyChoose() {
  return (
    <Section tone="navy">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="Why choose us"
          title="Why choose The Mentorium?"
          intro="We help individuals make informed career decisions, develop professional competencies and connect with opportunities that shape their future."
          dark
        />
        <div className="grid gap-x-10 sm:grid-cols-2">
          <CheckList items={whyChoose.slice(0, 4)} dark />
          <div className="mt-4 sm:mt-0">
            <CheckList items={whyChoose.slice(4)} dark />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Mentors() {
  return (
    <Section>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Meet our expert mentors"
          title="Learn from experienced professionals"
          intro="Our mentor network spans education, business, technology, law, finance, public administration and more."
        />
        <ButtonLink href="/mentorship" variant="outline" className="mb-10 shrink-0 sm:mb-12">
          View mentorship network
        </ButtonLink>
      </div>
      {mentors.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.slice(0, 4).map((m) => (
            <div key={m.slug} className="rounded-lg border border-line p-6">
              <p className="font-heading font-semibold text-navy-900">{m.name}</p>
              <p className="text-sm text-muted">{m.designation}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentorCategories.slice(0, 4).map((c) => (
            <div key={c} className="rounded-lg border border-line bg-white p-6">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-50 text-navy-700/40">
                <Icon name="user" className="h-10 w-10" />
              </span>
              <p className="mt-5 font-heading font-semibold text-navy-900">Mentor profile coming soon</p>
              <p className="mt-1 text-sm text-muted">{c}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function Opportunities() {
  return (
    <Section tone="mist">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Jobs & internship opportunities</p>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">Connect with reviewed opportunities</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Every vacancy and internship is reviewed before it is published, and listings from verified employers are
            clearly marked — so you always know what you are applying to.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/jobs">Explore opportunities</ButtonLink>
            <ButtonLink href="/jobs#employers" variant="outline">
              I&apos;m an employer
            </ButtonLink>
          </div>
        </div>
        {jobs.length > 0 ? (
          <ul className="grid gap-3">
            {jobs.slice(0, 3).map((j) => (
              <li key={j.id} className="rounded-lg border border-line bg-white p-5">
                <p className="font-heading font-semibold text-navy-900">{j.title}</p>
                <p className="text-sm text-muted">
                  {j.organisation} · {j.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-line bg-white p-8">
            <div className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Icon name="shield" />
              </span>
              <div>
                <p className="font-heading font-semibold text-navy-900">Verified employer</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  The employer&apos;s identity has been checked by our team, and you can apply through The Mentorium.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
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
            <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
              The first opportunities will appear here once the portal opens.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

function Training() {
  const featured = trainingAreas.slice(0, 3);
  return (
    <Section>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Training & development"
          title="Build the skills employers value"
          intro="Practical programmes in communication, leadership, digital skills, AI tools, entrepreneurship and more."
        />
        <ButtonLink href="/training" variant="outline" className="mb-10 shrink-0 sm:mb-12">
          See all programmes
        </ButtonLink>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((t, i) => (
          <Link
            key={t.name}
            href="/training"
            className="group relative overflow-hidden rounded-lg border border-line bg-white p-7 transition-shadow hover:shadow-lg"
          >
            <span className="font-heading text-sm font-semibold text-gold-700">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold">{t.name}</h3>
            <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
              Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-500 transition-transform group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Testimonials" title="In their words" align="center" />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-lg border border-line bg-white p-7">
            <blockquote className="leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-heading font-semibold text-navy-900">{t.name}</span>
              <span className="block text-muted">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
