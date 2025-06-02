import { Metadata } from "next";
import ESGPage from "@/components/pages/esg/ESGPage";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "ESG - Phát triển bền vững",
  description: "Agronexus Capital hướng đến việc kiến tạo giá trị bền vững thông qua các dự án đầu tư đáp ứng tiêu chí ESG (Môi trường, Xã hội, Quản trị).",
  keywords: ["ESG", "sustainable development", "agriculture", "environment", "social responsibility", "governance"],
  canonical: "/esg",
});

export default function ESG() {
  return <ESGPage />;
} 