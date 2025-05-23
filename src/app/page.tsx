import { Metadata } from "next";
import HomePage from "@/components/pages/home/HomePage";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Agronexus Capital",
  description: "We provide comprehensive business solutions tailored to your specific needs, from financial consulting to digital transformation.",
  keywords: ["business solutions", "professional services", "tantai", "vietnam business"],
  canonical: "/",
});

export default function Home() {
  return <HomePage />;
} 