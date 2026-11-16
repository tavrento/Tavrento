import { ExternalLink } from "lucide-react";
export default function AmazonButton({ url, className = "" }: { url?: string; className?: string }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium ${className}`;
  if (!url) return <span className={`${base} cursor-not-allowed border border-neutral-300 text-neutral-500`} aria-disabled="true">Coming Soon</span>;
  return <a href={url} target="_blank" rel="noopener noreferrer sponsored" className={`${base} bg-black text-white transition-colors hover:bg-neutral-700`}>Buy on Amazon <ExternalLink size={14} aria-hidden /><span className="sr-only">(opens in a new tab)</span></a>;
}
