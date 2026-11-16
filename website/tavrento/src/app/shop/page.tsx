import { meta } from "@/lib/meta";
import ShopContent from "@/components/ShopContent";

export const metadata = meta("Shop", "Browse the Tavrento collection of modern everyday essentials.", "/shop");
export default function Shop() {
  return <ShopContent />;
}
