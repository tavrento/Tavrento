# Tavrento.com

Next.js (App Router) · TypeScript · Tailwind · Lucide. Amazon-link storefront — no checkout.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Edit your business
- `src/config/site.ts` — email, social URLs, Amazon Storefront, nav, footer links
- `src/config/products.ts` — products + Amazon URLs (empty URL shows "Coming Soon"). Images go in `public/products/`
- `src/config/categories.ts` — categories (only those with products are shown)
- `src/config/faq.ts` — FAQ
- Legal pages: `src/app/<page>/page.tsx` — templates only; have an attorney review.
- Logo: replace `public/logo.png` (a transparent PNG/SVG is recommended).

## Contact form
`/api/contact` validates, has a honeypot and basic rate limiting. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` to send mail; otherwise it reports "not configured". For stronger spam protection add Cloudflare Turnstile or reCAPTCHA.

## GitHub
```bash
git init && git add . && git commit -m "Initial Tavrento site"
git branch -M main
git remote add origin https://github.com/<you>/tavrento.git
git push -u origin main
```

## Vercel
1. vercel.com → Add New → Project → import the repo (Next.js auto-detected).
2. Add env vars from `.env.example`. Deploy.
3. Settings → Domains → add `tavrento.com` and `www.tavrento.com`.
4. At your registrar, set the DNS records Vercel shows (typically `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).

## Notes
Search and cart icons are omitted until those features exist. Product structured data is emitted only when `verified: true` and a price is set.
