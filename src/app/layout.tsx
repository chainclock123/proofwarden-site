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
        url: "/og/proofwarden-og.png",
        width: 1200,
        height: 630,
        alt: "ProofWarden evidence infrastructure for AI-agent actions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofWarden - Evidence Infrastructure for AI-Agent Actions",
    description:
      "Capture bounded AI-agent actions, anchor proof metadata through DUAL, and assemble reviewer-verifiable evidence records.",
    images: ["/og/proofwarden-og.png"],
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
