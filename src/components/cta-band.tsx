import { contact } from "@/content/site";
import { WhatsAppIcon } from "./icons";
import { ButtonLink, CompassMark, Container } from "./ui";

export function CtaBand({
  title = "Ready to take the next step?",
  text = "Book a consultation and talk to us about your education, career or professional goals.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="pointer-events-none absolute top-1/2 -left-20 hidden -translate-y-1/2 opacity-10 md:block">
        <CompassMark size={360} light="#E3C98F" dark="#E3C98F" ring="#E3C98F" />
      </div>
      <Container className="relative py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold !text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-100">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/book">Book a Consultation</ButtonLink>
          {contact.whatsapp ? (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-5 py-3 font-heading text-sm font-semibold text-white hover:bg-white/10"
            >
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </a>
          ) : (
            <ButtonLink href="/contact" variant="outline-light">
              Contact Us
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
