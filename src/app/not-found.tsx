import { ButtonLink, CompassMark, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-navy-50 py-24">
      <Container className="max-w-xl text-center">
        <CompassMark size={96} className="mx-auto" />
        <h1 className="mt-6 text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-lg text-muted">
          The page you are looking for may have moved. Let us point you in the right direction.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Go to homepage</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
