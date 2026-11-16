import LegalPage from "@/components/LegalPage";
import { meta } from "@/lib/meta";
export const metadata = meta("Returns & Refunds", "Returns & Refunds for Tavrento.", "/returns-refunds");
export default function Page() {
  return <LegalPage title="Returns & Refunds" sections={[
    ["Overview", "[Describe return and refund terms (Amazon purchases follow Amazon's policy) here.]"],
    ["Details", "[Add your specific terms here — to be written and reviewed by counsel.]"],
    ["Contact", "[Add business contact information once confirmed.]"],
  ]} />;
}
