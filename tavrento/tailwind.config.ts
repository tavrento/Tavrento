import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { boxShadow: { soft: "0 2px 20px rgba(0,0,0,.06)" } } }, plugins: [] } satisfies Config;
