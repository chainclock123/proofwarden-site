import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EvidenceReadinessIntakeForm } from "@/components/EvidenceReadinessIntakeForm";

export const metadata: Metadata = {
  title: "Evidence Readiness Review Intake - ProofWarden",
  description:
    "Submit ProofWarden's Evidence Readiness Review intake for one AI-agent workflow and one bounded action.",
  openGraph: {
    title: "Evidence Readiness Review Intake - ProofWarden",
    description:
      "A structured intake for reviewer-verifiable evidence around one AI-agent workflow and one bounded action.",
    url: "https://proofwarden.com/intake",
  },
};

export default function IntakePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_84%_2%,rgba(129,140,248,0.14),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_45%,#020617_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="brand-lockup" aria-label="ProofWarden home">
            <Image
              src="/brand/proofwarden-mark.png"
              alt=""
              width={811}
              height={1046}
              priority
              className="h-12 w-auto"
            />
            <span className="brand-wordmark" aria-hidden="true">
              <span className="text-white">Proof</span>
              <span className="text-cyan-300">Warden</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex" aria-label="Intake navigation">
            <Link href="/" className="transition hover:text-cyan-200">
              Main site
            </Link>
            <Link href="/privacy" className="transition hover:text-cyan-200">
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <section className="section-padding pt-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="pill mb-7">Evidence Readiness Review</div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Intake for one workflow, one bounded action.
              </h1>
              <p className="mt-6 text-base leading-7 text-slate-300">
                This form turns the intake questionnaire into a structured submission for ProofWarden&apos;s paid
                Evidence Readiness Review.
              </p>
              <div className="mt-8 space-y-4 rounded-[2rem] border border-cyan-300/20 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-950/25">
                <p className="text-sm font-semibold text-white">Scope guardrails</p>
                <ul className="space-y-3 text-sm leading-6 text-slate-300">
                  <li>Answer for one AI-agent workflow.</li>
                  <li>Choose one bounded action the agent can take or recommend.</li>
                  <li>Write unknown where the source fact is not verified.</li>
                  <li>Use sanitized links, not raw sensitive evidence.</li>
                </ul>
              </div>
              <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
                ProofWarden assesses evidence-readiness. It does not certify the system, determine compliance,
                decide coverage, provide legal advice, or replace reviewer judgment.
              </div>
            </aside>

            <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/30 md:p-8">
              <EvidenceReadinessIntakeForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
