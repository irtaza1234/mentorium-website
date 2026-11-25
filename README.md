# The Mentorium — website

Website and future career platform for **The Mentorium** — *Your Gateway to Career Excellence*.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript
- Tailwind CSS 4 with Mentorium design tokens (`src/app/globals.css`)
- Fonts: Montserrat (headings), Inter (body), self-hosted via Fontsource
- Hosting: Vercel · Domain: Hostinger
- Email for enquiry forms: Resend (optional until configured)

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — must pass before every merge
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | **All site text and data**: contact details, services, mentors, courses, jobs, FAQs. Edit here first. |
| `src/content/legal.ts` | Draft outlines of the legal pages (replace with lawyer-approved text before launch). |
| `src/app/` | Pages. One folder per route (`about`, `career-counselling`, `jobs`, …). |
| `src/components/` | Shared UI: header, footer, buttons, forms, icons. |
| `src/app/actions.ts` | Server action that emails enquiry and consultation forms. |
| `public/brand/` | Logo set: SVG masters and PNG exports. |
| `scripts/brand/generate_logo.py` | Regenerates every logo file from code. |
| `docs/` | Brand guidelines and project notes. |

## Content rules

Never invent names, qualifications, testimonials, statistics, prices or contact details.
Unconfirmed values are `null` or empty lists in `src/content/site.ts`; the site then shows a
"coming soon" state or hides the section automatically.

## Environment variables

Copy `.env.example` to `.env.local` for local work. On Vercel, add them under
**Project → Settings → Environment Variables**.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://www.yourdomain.com` (used for SEO links). |
| `NEXT_PUBLIC_SITE_LIVE` | Set to `true` only at launch, to allow search engines. |
| `RESEND_API_KEY` | Enables the enquiry and booking forms. |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries. |
| `ENQUIRY_FROM_EMAIL` | Sender address on a domain verified in Resend. |

## Workflow

1. Each change is made on a branch and pushed to GitHub.
2. Vercel builds a **preview link** for the branch.
3. The preview is reviewed and approved.
4. The branch is merged into `main`, and Vercel deploys it to production.

Nothing goes live without being previewed, approved and tested first.
