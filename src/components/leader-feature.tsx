import Image from "next/image";
import khattakPhoto from "@/assets/team/amjad-iqbal-khattak.webp";
import { leadership } from "@/content/site";
import { Icon } from "./icons";
import { ButtonLink } from "./ui";

const photos: Record<string, typeof khattakPhoto> = {
  "amjad-iqbal-khattak": khattakPhoto,
};

/** Featured leadership profile: framed portrait, name and credentials beside it. */
export function LeaderFeature({ slug, cta = true }: { slug: string; cta?: boolean }) {
  const person = leadership.find((p) => p.slug === slug);
  if (!person) return null;
  const photo = photos[person.slug];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-gold-500/60" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-2xl bg-navy-50 shadow-xl ring-1 ring-black/5">
          {photo && (
            <Image
              src={photo}
              alt={`Portrait of ${person.name}`}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="h-auto w-full"
            />
          )}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Leadership</p>
        <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">Guided by experience in education</h2>
        <div className="mt-8 border-l-2 border-gold-500 pl-6">
          <p className="font-heading text-2xl font-semibold text-navy-900">{person.name}</p>
          <p className="mt-1 font-heading text-base font-medium text-gold-700">{person.role}</p>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-line bg-white p-5">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
            <Icon name="cap" className="h-5 w-5" />
          </span>
          <p className="leading-relaxed text-ink">{person.formerly}</p>
        </div>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Our counselling and assessment services are led by {person.name}, bringing senior leadership experience
          from Punjab&apos;s higher education system to every student, graduate and family we guide.
        </p>
        {cta && (
          <ButtonLink href="/book" className="mt-8">
            Submit Form <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
