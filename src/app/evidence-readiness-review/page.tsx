import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EvidenceReadinessBookingForm } from "@/components/EvidenceReadinessBookingForm";

export const metadata: Metadata = {
  title: "Evidence Readiness Review - ProofWarden",
  description:
    "Book a focused Evidence Readiness Review for one AI-agent workflow, one bounded action, and one review boundary.",
  openGraph: {
    title: "Evidence Readiness Review - ProofWarden",
    description:
      "A focused diagnostic for reviewer-verifiable evidence around one AI-agent workflow and one bounded action.",
    url: "https://proofwarden.com/evidence-readiness-review",
  },
};

const reviewerQuestions = [
  "What did the agent do?",
  "Who allowed it?",
  "What boundary applied?",
  "What source system captured the event?",
  "Where does the raw evidence live?",
  "What would an evidence reviewer ask first?",
];

const evidenceFamilies = [
  {
    title: "Action boundary",
    questions: ["Can the action be described in one sentence?", "Where is the line between recommendation, approval, execution, and escalation?"],
  },
  {
    title: "Authority and approval",
    questions: ["Who had authority at the time?", "Was approval required, optional, missing, or bypassed?"],
  },
  {
    title: "Control proof mapping",
    questions: ["Which control, contract, audit requirement, or customer assurance promise applied?", "Can that wording be mapped to event fields?"],
  },
  {
    title: "Source capture",
    questions: ["Was the event captured close to the system of action?", "Are timestamp, actor, source system, approval state, and result recorded?"],
  },
  {
    title: "Evidence vault",
    questions: ["Where are prompts, logs, approvals, documents, and payloads stored?", "Can sensitive evidence stay in customer custody while still being reviewable?"],
  },
  {
    title: "Reviewer readiness",
    questions: ["Could a reviewer understand the event without a long internal explanation?", "Are exceptions visible and shareable without exposing the whole system?"],
  },
];

const driftExamples = [
  {
    title: "Sales renewal drafting becomes customer commitment",
    original: "The agent drafts renewal-response text for accounts below a defined value, with a human owner sending the final message.",
    drift: "Discount language, CRM follow-ups, and minimal review can blur the line between draft and customer-facing commitment.",
  },
  {
    title: "Insurance submission triage becomes workflow disposition",
    original: "The agent extracts submission facts and suggests a routing category for human review.",
    drift: "Queue priority, delayed handling, and chat-only exceptions can make the routing result more consequential than the original boundary implied.",
  },
  {
    title: "Procurement assistant becomes approval proxy",
    original: "The agent prepares vendor-risk summaries for a procurement manager.",
    drift: "Pre-filled approval fields and missing-objection rules can weaken proof of source review and human approval.",
  },
  {
    title: "Support refund agent expands beyond limit",
    original: "The agent recommends refunds below a fixed threshold for routine support cases.",
    drift: "Prompt-level threshold changes, regulated edge cases, or post-action review can leave the active boundary unclear.",
  },
];

const deliverables = [
  "workflow reviewed",
  "agent action reviewed",
  "review boundary",
  "current evidence available",
  "missing or weak evidence",
  "key reviewer questions",
  "source-capture recommendations",
  "raw evidence custody recommendations",
  "exception and dispute risks",
  "AGER Evidence Pack readiness",
  "one recommended next step",
];

const boundaries = [
  "Does not certify the system",
  "Does not decide compliance",
  "Does not decide coverage",
  "Does not determine audit readiness",
  "Does not provide legal advice",
  "Does not replace reviewer judgment",
];

export default function EvidenceReadinessReviewPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(124,58,237,0.14),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_45%,#020617_100%)]" />
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

          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex" aria-label="Evidence Readiness navigation">
            <a href="#problem" className="transition hover:text-cyan-200">Problem</a>
            <a href="#review" className="transition hover:text-cyan-200">Review</a>
            <a href="#examples" className="transition hover:text-cyan-200">Drift</a>
            <a href="#book" className="transition hover:text-cyan-200">Book a call</a>
            <Link href="/" className="transition hover:text-cyan-200">Main site</Link>
          </nav>

          <a href="#book" className="button-primary hidden min-h-10 px-4 py-2 text-sm lg:inline-flex">
            Book a call
          </a>
        </div>
      </header>

      <section className="section-padding relative pt-16 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <div className="pill mb-7">Evidence Readiness Review</div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              Your AI agent may be acting inside a workflow no one can prove.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              ProofWarden reviews one bounded AI-agent workflow and maps whether it can produce reviewer-verifiable evidence.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Start with one workflow, one action, one boundary, and one practical evidence outcome.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#book" className="button-primary">Book a call</a>
              <a href="#review" className="button-ghost">See the review scope</a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-cyan-300/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Core reviewer question</p>
              <h2 className="mt-4 text-balance text-2xl font-semibold text-white md:text-3xl">
                Can we prove the action stayed inside the boundary we thought we set?
              </h2>
              <div className="mt-8 grid gap-3">
                {reviewerQuestions.map((question, index) => (
                  <div key={question} className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-[1rem] border border-white/10 bg-slate-950/45 p-4">
                    <span className="font-mono text-sm text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-6 text-slate-200">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="section-padding scroll-mt-28 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionIntro
            eyebrow="The buyer problem"
            title="The evidence gap usually hides in the handoff."
            body="AI-agent teams often know what the agent was supposed to do. They may not know whether they can prove what actually happened when the agent recommended, prepared, approved, escalated, executed, or recorded an action."
          />
          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-900/75 p-6">
            <div className="grid gap-4 font-mono text-sm text-slate-200 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
              <EvidenceNode label="AI-agent action" />
              <Arrow />
              <EvidenceNode label="Source capture" />
              <Arrow />
              <EvidenceNode label="Evidence vault" />
              <Arrow />
              <EvidenceNode label="Evidence reviewer" />
            </div>
          </div>
        </div>
      </section>

      <section id="review" className="section-padding scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="What the review inspects"
            title="Six evidence families, one bounded action."
            body="The review turns uncertainty into a practical evidence gap map by asking where proof exists, where it is weak, and what an evidence reviewer would need next."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {evidenceFamilies.map((family, index) => (
              <div key={family.title} className="feature-card min-h-0">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-sm text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
                </div>
                <h3 className="text-xl font-semibold text-white">{family.title}</h3>
                <ul className="mt-4 space-y-3">
                  {family.questions.map((question) => (
                    <li key={question} className="text-sm leading-6 text-slate-300">{question}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="examples" className="section-padding scroll-mt-28 bg-slate-900/35">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="How bounded actions drift"
            title="Actions can drift without anyone changing the formal policy."
            body="Teams improve prompts, add tools, change queues, relax approvals, or connect new systems. The original boundary still looks stable on paper, but the actual action may have moved."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {driftExamples.map((example) => (
              <div key={example.title} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1rem] border border-cyan-300/15 bg-cyan-300/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Original boundary</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{example.original}</p>
                  </div>
                  <div className="rounded-[1rem] border border-amber-300/15 bg-amber-300/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Drift pressure</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{example.drift}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionIntro
            eyebrow="The Evidence Readiness Memo"
            title="A focused diagnostic, not a vague AI strategy exercise."
            body="ProofWarden produces an Evidence Readiness Memo for the workflow reviewed, the bounded action, the review boundary, current evidence, weak proof, key reviewer questions, and one recommended next step."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="rounded-[1rem] border border-white/10 bg-slate-900/65 p-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] border border-violet-300/20 bg-violet-300/10 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-violet-100">Boundary statement</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              ProofWarden supports reviewability. Final judgment stays with the relevant reviewer.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {boundaries.map((boundary) => (
                <div key={boundary} className="rounded-[1rem] border border-white/10 bg-slate-950/35 p-4 text-sm text-slate-200">
                  {boundary}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <div className="pill mb-7">Book an Evidence Readiness Review</div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Find out whether one AI-agent action can become reviewer-verifiable evidence.
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-300">
              Use the form to request a call. If there is a fit, ProofWarden will move into a structured intake for the selected workflow and bounded action.
            </p>
            <div className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
              <p className="text-sm font-semibold text-cyan-50">For deeper preparation</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The longer Evidence Readiness intake remains available for scoped review work after the initial conversation.
              </p>
              <Link href="/intake" className="download-link mt-5 inline-flex">
                Open structured intake
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30 md:p-8">
            <EvidenceReadinessBookingForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">ProofWarden</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Evidence infrastructure for AI-agent actions.</p>
          </div>
          <div className="grid gap-4 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/" className="hover:text-cyan-200">Main site</Link>
            <a href="#problem" className="hover:text-cyan-200">Problem</a>
            <a href="#review" className="hover:text-cyan-200">Review scope</a>
            <a href="#book" className="hover:text-cyan-200">Book a call</a>
            <Link href="/intake" className="hover:text-cyan-200">Structured intake</Link>
            <Link href="/privacy" className="hover:text-cyan-200">Privacy Notice</Link>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-slate-600">© {new Date().getFullYear()} ProofWarden. All rights reserved.</p>
      </footer>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={centered ? "pill mx-auto mb-7" : "pill mb-7"}>{eyebrow}</div>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-6 text-base leading-8 text-slate-300">{body}</p>
    </div>
  );
}

function EvidenceNode({ label }: { label: string }) {
  return (
    <div className="rounded-[1rem] border border-cyan-300/20 bg-slate-950/55 p-4 text-center text-cyan-50">
      {label}
    </div>
  );
}

function Arrow() {
  return <div className="hidden text-cyan-200 sm:block" aria-hidden="true">-&gt;</div>;
}
