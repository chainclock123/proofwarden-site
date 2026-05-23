import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://proofwarden.com"),
  title: "ProofWarden - Evidence Infrastructure for AI-Agent Actions",
  description:
    "ProofWarden helps enterprise AI deployers and risk teams capture bounded AI-agent actions, anchor proof metadata through DUAL, and assemble reviewer-verifiable evidence records.",
  openGraph: {
    title: "ProofWarden - Evidence Infrastructure for AI-Agent Actions",
    description:
      "Capture bounded AI-agent actions, anchor proof metadata through DUAL, and assemble reviewer-verifiable evidence records.",
    url: "https://proofwarden.com",
    siteName: "ProofWarden",
    images: [
      {
        url: "/downloads/proofwarden-infographic.png",
        width: 1024,
        height: 1536,
        alt: "ProofWarden futuristic AI action evidence infrastructure infographic",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofWarden - Evidence Infrastructure for AI-Agent Actions",
    description:
      "Capture bounded AI-agent actions, anchor proof metadata through DUAL, and assemble reviewer-verifiable evidence records.",
    images: ["/downloads/proofwarden-infographic.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
