import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { legalOutlines } from "@/content/legal";
import { legalPages } from "@/content/site";

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  return { title: page?.title ?? "Legal", robots: { index: false } };
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  const outline = legalOutlines[slug];
  if (!page || !outline) notFound();

  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="text-4xl font-semibold">{page.title}</h1>
        <p className="mt-4 text-lg text-muted">{outline.summary}</p>

        <div className="mt-8 rounded-lg border border-gold-500/40 bg-gold-50 p-5 text-sm text-ink">
          <strong className="font-heading">Draft — under preparation.</strong> The full policy will be published here
          after legal review. The outline below shows what it will cover.
        </div>

        <div className="prose-mentorium mt-10">
          <h2>What this policy will cover</h2>
          <ul>
            {outline.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>
            Questions in the meantime? <Link href="/contact" className="text-navy-900 underline underline-offset-2">Contact us</Link>.
          </p>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="font-heading text-sm font-semibold text-navy-900">Other policies</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {legalPages
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/legal/${p.slug}`} className="text-muted hover:text-navy-900">
                    {p.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
