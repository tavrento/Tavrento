import LegalPage from "@/components/LegalPage";
import { meta } from "@/lib/meta";
export const metadata = meta("Terms of Service", "Terms of Service for Tavrento.", "/terms-of-service");
export default function Page() {
  return <LegalPage title="Terms of Service" sections={[
    ["Overview", "[Describe the terms for using this website here.]"],
    ["Details", "[Add your specific terms here — to be written and reviewed by counsel.]"],
    ["Contact", "[Add business contact information once confirmed.]"],
  ]} />;
}
