import LegalPage from "@/components/LegalPage";
import { meta } from "@/lib/meta";
export const metadata = meta("Shipping Policy", "Shipping Policy for Tavrento.", "/shipping-policy");
export default function Page() {
  return <LegalPage title="Shipping Policy" sections={[
    ["Overview", "[Describe how orders are shipped (Amazon fulfilled orders follow Amazon's shipping terms) here.]"],
    ["Details", "[Add your specific terms here — to be written and reviewed by counsel.]"],
    ["Contact", "[Add business contact information once confirmed.]"],
  ]} />;
}
