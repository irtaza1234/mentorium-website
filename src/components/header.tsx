"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/content/site";
import { Icon } from "./icons";
import { ButtonLink, Container } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Mentorium home" onClick={() => setOpen(false)}>
          <Image
            src="/brand/mentorium-logo-horizontal-primary.svg"
            alt="Mentorium — Your Gateway to Career Excellence"
            width={630}
            height={192}
            unoptimized
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`whitespace-nowrap rounded-md px-2.5 py-2 font-heading text-[13.5px] font-medium transition-colors hover:text-gold-700 ${
                    isActive(item.href) ? "text-gold-700" : "text-navy-900"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden min-[1380px]:block">
            <ButtonLink href="/login" variant="link" className="!py-2 text-[13px] whitespace-nowrap">
              Register / Login
            </ButtonLink>
          </div>
          <div className="hidden sm:block">
            <ButtonLink href="/book" className="!py-2.5 whitespace-nowrap">
              Book a Consultation
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-73px)] overflow-y-auto border-t border-line bg-white xl:hidden">
          <Container className="py-6">
            <ul className="divide-y divide-line">
              <li>
                <Link href="/" className="block py-4 font-heading text-lg font-medium text-navy-900" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-4 font-heading text-lg font-medium ${isActive(item.href) ? "text-gold-700" : "text-navy-900"}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/book" onClick={() => setOpen(false)}>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/login" variant="outline" onClick={() => setOpen(false)}>
                Register / Login
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
