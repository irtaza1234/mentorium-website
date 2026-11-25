import { contact } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button. Hidden until an official number is set in content/site.ts. */
export function WhatsAppButton() {
  if (!contact.whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
