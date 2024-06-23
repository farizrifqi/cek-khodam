import PartnerPage from "@/components/Page/Partner";
import { Metadata } from "next";

export default async function PartnerHome() {
  return <PartnerPage />;
}
export const metadata: Metadata = {
  title: "Find Partner",
  description: "Cari pasangan atau teman yok",
};
