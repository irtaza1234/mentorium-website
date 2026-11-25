import { Icon } from "./icons";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading font-semibold text-navy-900">
            {item.q}
            <span className="shrink-0 rounded-full border border-line p-1 text-gold-700 transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-4">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className={`mt-0.5 rounded-full p-1 ${dark ? "bg-gold-500/15 text-gold-300" : "bg-gold-50 text-gold-700"}`}>
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span className={dark ? "text-navy-50" : "text-ink"}>{t}</span>
        </li>
      ))}
    </ul>
  );
}
