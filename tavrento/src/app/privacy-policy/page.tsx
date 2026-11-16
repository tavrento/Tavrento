import LegalPage from "@/components/LegalPage";
import { meta } from "@/lib/meta";
export const metadata = meta("Privacy Policy", "Privacy Policy for Tavrento.", "/privacy-policy");
export default function Page() {
  return <LegalPage title="Privacy Policy" sections={[
    ["Overview", "[Describe what data you collect, how it is used, and user rights here.]"],
    ["Details", "[Add your specific terms here — to be written and reviewed by counsel.]"],
    ["Contact", "[Add business contact information once confirmed.]"],
  ]} />;
}
