// CENTRAL BUSINESS CONFIG — edit here. Empty strings = hidden / "not available".
export const site = {
  name: "Tavrento",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tavrento.com",
  logo: "/logo.png",
  logoMark: "/brand/logo-circle.png",
  banner: "/brand/banner.jpg", // also used as the social-share (Open Graph) image
  tagline: "Built for Everyday Excellence.",
  description: "Modern everyday essentials, thoughtfully selected. Quality, functionality and practical design from Tavrento.",
  email: "", // e.g. "support@tavrento.com" — shown on Contact page and used by its email form
  amazonStorefront: "", // e.g. "https://www.amazon.com/stores/Tavrento/..." — button hidden when empty
  social: { instagram: "", facebook: "", pinterest: "" }, // hidden when empty
  newsletterAction: "", // URL of your email provider's form endpoint; section hidden when empty
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Returns & Refunds", href: "/returns-refunds" },
  ],
};
