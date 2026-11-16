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
GitHub Pages is static hosting and cannot run the former server-side email endpoint. Set `email` in `src/config/site.ts` to enable the contact form's `mailto:` flow. Submitting the form opens the visitor's configured email app; the visitor must send the message there.

## GitHub Pages deployment
The workflow at `.github/workflows/deploy.yml` builds this project as a static export and deploys it to GitHub Pages when changes are pushed to `main` or when manually dispatched.

1. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
2. Push the site and workflow to `main`, or run **Deploy Tavrento to GitHub Pages** from the **Actions** tab.
3. GitHub Pages will read the `CNAME` file included in the exported site and serve `tavrento.com`. Configure the registrar records described in GitHub's custom-domain documentation, then enable **Enforce HTTPS** after DNS verification.

The site uses `output: "export"` and has no repository subpath because it is served from the custom-domain root. Server-side Next.js features and API routes are not available on GitHub Pages.

## Notes
Search and cart icons are omitted until those features exist. Product structured data is emitted only when `verified: true` and a price is set.
