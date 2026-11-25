import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "mist" | "navy";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    white: "bg-white",
    mist: "bg-navy-50",
    navy: "bg-navy-900 text-white",
  };
  return (
    <section id={id} className={`${tones[tone]} py-14 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-3xl sm:mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${dark ? "!text-gold-300" : ""}`}>{eyebrow}</p>}
      <h2 className={`text-3xl leading-tight font-semibold sm:text-4xl ${dark ? "!text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-navy-100" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light" | "link";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-300 shadow-sm",
  navy: "bg-navy-900 text-white hover:bg-navy-800 shadow-sm",
  outline: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-50",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  link: "text-navy-900 underline-offset-4 hover:underline !px-0",
};

export function ButtonLink({
  variant = "gold",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-heading text-sm font-semibold transition-colors ${buttonStyles[variant]} ${className}`}
    />
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 hidden opacity-[0.07] md:block">
        <CompassMark size={420} light="#FFFFFF" dark="#FFFFFF" ring="#FFFFFF" />
      </div>
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <p className="eyebrow mb-4 !text-gold-300">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold !text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{intro}</p>
      </Container>
      <div className="h-1 bg-gold-500" />
    </section>
  );
}

export function ComingSoon({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-navy-900/20 bg-navy-50 p-8 text-center">
      <p className="font-heading font-semibold text-navy-900">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-xl text-muted">{children}</div>}
    </div>
  );
}

/** The compass star from the Mentorium emblem, as a decorative mark. */
export function CompassMark({
  size = 200,
  light = "#C29A50",
  dark = "#142B49",
  ring = "#C29A50",
  className = "",
}: {
  size?: number;
  light?: string;
  dark?: string;
  ring?: string;
  className?: string;
}) {
  const c = 100;
  const rays: [number, number, number][] = [
    [45, 44, 7],
    [135, 44, 7],
    [225, 44, 7],
    [315, 44, 7],
    [270, 96, 16],
    [0, 96, 16],
    [90, 96, 16],
    [180, 96, 16],
  ];
  const faces = rays.map(([deg, len, w]) => {
    const r = (deg * Math.PI) / 180;
    const dx = Math.cos(r),
      dy = Math.sin(r);
    const tip = `${c + dx * len},${c + dy * len}`;
    const s1 = `${c - dy * w},${c + dx * w}`;
    const s2 = `${c + dy * w},${c - dx * w}`;
    return { key: deg, a: `${c},${c} ${tip} ${s1}`, b: `${c},${c} ${tip} ${s2}` };
  });
  const arcs = [0, 1, 2, 3]
    .map((q) => {
      const a0 = ((q * 90 + 12) * Math.PI) / 180;
      const a1 = ((q * 90 + 78) * Math.PI) / 180;
      const R = 56;
      return `M${c + R * Math.cos(a0)},${c + R * Math.sin(a0)} A${R},${R} 0 0 1 ${c + R * Math.cos(a1)},${c + R * Math.sin(a1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <path d={arcs} fill="none" stroke={ring} strokeWidth="5" />
      {faces.map((f) => (
        <g key={f.key}>
          <polygon points={f.a} fill={light} />
          <polygon points={f.b} fill={dark} />
        </g>
      ))}
    </svg>
  );
}
