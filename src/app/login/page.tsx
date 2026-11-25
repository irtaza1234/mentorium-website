import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Register / Login",
  robots: { index: false },
};

const accounts = [
  { icon: "cap", title: "Students & job seekers", text: "Assessments, appointments, courses, applications and saved vacancies." },
  { icon: "people", title: "Mentors & counsellors", text: "Profile, availability, appointments and session records." },
  { icon: "briefcase", title: "Employers", text: "Organisation profile, vacancies, internships and applications." },
];

export default function LoginPage() {
  return (
    <section className="bg-navy-50 py-16 sm:py-24">
      <Container className="max-w-4xl text-center">
        <p className="eyebrow mb-3">Accounts</p>
        <h1 className="text-4xl font-semibold">Your Mentorium account is coming soon</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          We are building personal dashboards for students, mentors and employers. Until then, our team is happy to help
          you directly.
        </p>
        <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
          {accounts.map((a) => (
            <div key={a.title} className="rounded-lg border border-line bg-white p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                <Icon name={a.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-heading font-semibold text-navy-900">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/book">Book a Consultation</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
