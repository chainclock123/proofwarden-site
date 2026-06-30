import Image from "next/image";
import Link from "next/link";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { MobileNavigation } from "@/components/MobileNavigation";

const navItems = [
  { label: "How it works", href: "#product" },
  { label: "Architecture", href: "#architecture" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

const proofChain = [
  {
    title: "Event",
    eyebrow: "Capture",
    description: "Capture the structured facts of the agent action closest to execution.",
  },
  {
    title: "Receipt",
    eyebrow: "Anchor",
    description: "Anchor proof metadata through DUAL, the distributed-ledger proof layer.",
  },
  {
    title: "Record",
    eyebrow: "Review",
    description: "Assemble a reviewer-verifiable evidence record that can be inspected.",
  },
];

const problemPoints = [
  "Operational facts are scattered across logs, tickets, tools, emails, approvals, and AI gateways.",
  "AI-generated summaries can reshape the narrative after the event.",
  "Evidence can be sensitive, mutable, incomplete, or difficult to verify.",
  "Exceptions can disappear during workflow cleanup or retrospective reporting.",
  "Traditional logging was not designed for reviewer-verifiable AI action evidence.",
];

const whenProofWardenMatters = [
  "An AI agent takes an operational action.",
  "A reviewer later needs to reconstruct what happened.",
  "Sensitive raw evidence cannot be broadly exposed.",
];

const architectureLayers = [
  {
    title: "Customer Evidence Vault",
    label: "Custody",
    description: "Stores prompts, logs, approvals, files, tickets, and operational records.",
    purpose: "Purpose: custody and access control.",
  },
  {
    title: "DUAL Proof Layer",
    label: "Integrity",
    description:
      "Stores hashes, timestamps, receipt IDs, lineage references, object references, and integrity status.",
    purpose: "Purpose: independent proof metadata.",
  },
  {
    title: "Reviewer Evidence Record",
    label: "Judgment",
    description:
      "Contains event summary, boundary mapping, receipt metadata, reason codes, verifier access, and review context.",
    purpose: "Purpose: inspection and verification.",
  },
];

const boundaries = [
  "Approval rules",
  "Procurement thresholds",
  "Authority limits",
  "Data-access rules",
  "Contract obligations",
  "Audit requirements",
  "Operational procedures",
  "Reviewer-defined questions",
];

const useCases = [
  {
    title: "AI-agent procurement controls",
    description:
      "Capture and verify agent actions around purchase orders, spend thresholds, approval rules, and authority limits.",
    example:
      "Example: an AI agent prepares or routes a purchase order under a defined spend threshold.",
  },
  {
    title: "Sensitive data and tool access",
    description:
      "Preserve evidence when AI agents access controlled systems, customer data, internal tools, or restricted workflows.",
    example: "Example: an AI agent accesses a controlled system or customer dataset.",
  },
  {
    title: "Exception and incident reconstruction",
    description:
      "Assemble review records when agent actions cross boundaries, miss approvals, or require post-action investigation.",
    example:
      "Example: an agent action exceeds a limit or lacks approval, and ProofWarden preserves the exception as review evidence.",
  },
];

const sampleReceipt = [
  ["Receipt ID", "PWR-2026-000184"],
  ["Action type", "Procurement request"],
  ["Boundary", "PO threshold under $5,000"],
  ["Approval state", "Within delegated authority"],
  ["Vault reference", "vault://customer/po/8472"],
  ["Event hash", "9f3a...72c1"],
  ["DUAL anchor", "Confirmed"],
  ["Timestamp", "2026-05-23 14:32 UTC"],
  ["Review status", "Ready for inspection"],
];

const positiveReceiptValues = new Set([
  "Within delegated authority",
  "Confirmed",
  "Ready for inspection",
]);

const secondaryUseCases = [
  "Customer assurance evidence requests",
  "Supplier-screening exception routing",
  "Operational escalation workflows",
  "Low-risk refunds",
  "Contract workflow evidence",
];

const does = [
  "Captures structured AI-agent action events.",
  "Maps operational boundaries to agent activity.",
  "Validates events against approvals, thresholds, authority scope, and evidence requirements.",
  "Anchors proof metadata through DUAL.",
  "Assembles reviewer-verifiable evidence records.",
  "Preserves exception evidence.",
  "Provides scoped verifier access and evidence-pack exports.",
];

const doesNot = [
  "Determine compliance.",
  "Assign liability.",
  "Approve or deny workflows.",
  "Replace auditor or reviewer judgment.",
  "Act as a general AI risk dashboard.",
  "Store raw operational evidence on DUAL.",
  "Make final operational or legal decisions.",
];

const faqs = [
  {
    question: "What is ProofWarden?",
    answer:
      "ProofWarden is evidence infrastructure for AI-agent actions. It helps enterprise AI deployers and risk teams capture bounded agent events, anchor proof metadata, and assemble reviewer-verifiable evidence records.",
  },
  {
    question: "What problem does ProofWarden solve?",
    answer:
      "ProofWarden helps teams preserve and verify the evidence trail around AI-agent actions, especially when logs, summaries, approvals, or operational narratives may change after the action occurs.",
  },
  {
    question: "Who is ProofWarden for?",
    answer:
      "ProofWarden is designed for enterprise AI deployers, risk teams, governance teams, assurance teams, audit teams, compliance reviewers, and AI operations teams.",
  },
  {
    question: "What is an AI-agent action?",
    answer:
      "An AI-agent action is an operational step taken or initiated by an AI system, such as accessing a tool, preparing a purchase order, routing an exception, requesting data, approving a low-risk workflow, or escalating an operational process.",
  },
  {
    question: "What does bounded action mean?",
    answer:
      "A bounded action is an AI-agent action tied to a defined rule, threshold, approval expectation, authority scope, data-access condition, contract obligation, or reviewer question.",
  },
  {
    question: "What is DUAL?",
    answer:
      "DUAL is the distributed-ledger proof layer used by ProofWarden to anchor proof metadata such as hashes, timestamps, receipt references, lineage metadata, object references, and verifier-readable proof fields.",
  },
  {
    question: "Does ProofWarden store raw prompts or sensitive files on DUAL?",
    answer:
      "No. Raw prompts, logs, approvals, files, tickets, and operational records remain in customer-controlled evidence storage. DUAL stores proof metadata only.",
  },
  {
    question: "Is ProofWarden a compliance tool?",
    answer:
      "ProofWarden supports evidence integrity and reviewability. It does not determine compliance, assign liability, approve workflows, or replace reviewer judgment.",
  },
  {
    question: "What happens when an action is out of bounds?",
    answer:
      "ProofWarden preserves the event as exception evidence and assembles a review record so reviewers can inspect what happened.",
  },
  {
    question: "Is ProofWarden available now?",
    answer:
      "ProofWarden is an active product. Organisations interested in early access can request a conversation through the site.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_78%_4%,rgba(129,140,248,0.16),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_45%,#020617_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(125,211,252,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="#home" className="brand-lockup" aria-label="ProofWarden home">
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
            <span className="hidden text-xs text-slate-400 xl:block">AI action evidence infrastructure</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-200">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#request" className="button-primary min-h-10 px-4 py-2 text-sm">
              Request early access
            </a>
          </div>

          <MobileNavigation navItems={navItems} />

        </div>
      </header>

      <section id="home" className="section-padding relative pt-20 lg:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <div>
            <div className="pill mb-7">Distributed proof metadata for bounded AI-agent actions</div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              Evidence infrastructure for AI-agent actions.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              For enterprise AI deployers and risk teams that need to prove what AI agents did, what boundary applied, and whether the evidence trail can be trusted.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              ProofWarden captures bounded AI-agent actions, anchors proof metadata through DUAL, and assembles reviewer-verifiable evidence records.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Raw evidence stays in your vault. Proof metadata is anchored on DUAL. Reviewers get a record they can inspect.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#request" className="button-primary">
                Request early access
              </a>
              <a href="#product" className="button-ghost">
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
              <div className="mb-6 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Evidence chain</p>
                  <h2 className="mt-2 text-balance text-xl font-semibold text-white sm:text-2xl">event → receipt → record</h2>
                </div>
              </div>

              <div className="space-y-4">
                {proofChain.map((item, index) => (
                  <div key={item.title} className="proof-card">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-100">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.26em] text-cyan-200">{item.eyebrow}</p>
                        <h3 className="mt-1 text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                      </div>
                    </div>
                    {index < proofChain.length - 1 ? <div className="chain-line" /> : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-violet-300/20 bg-violet-300/10 p-5">
                <p className="text-sm font-medium text-violet-100">Exception path</p>
                <p className="mt-2 font-mono text-sm text-cyan-100">event → exception → review record</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  When an action crosses a boundary, ProofWarden preserves the exception as evidence instead of making the action look cleaner than it was.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-white/10 bg-white/[0.02]" aria-label="When ProofWarden matters">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">When ProofWarden matters</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {whenProofWardenMatters.map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 font-mono text-sm text-cyan-100">
                  0{index + 1}
                </div>
                <p className="text-lg font-semibold leading-7 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionIntro
            eyebrow="The problem"
            title="AI agents are moving from recommendation to action."
            body="Enterprise AI agents increasingly interact with tools, workflows, approvals, procurement systems, customer operations, and controlled data. After an action occurs, risk teams may need to reconstruct what happened, which boundary applied, whether approvals existed, and whether the evidence changed."
          />
          <div className="grid gap-4">
            {problemPoints.map((point, index) => (
              <div key={point} className="flex gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="section-padding scroll-mt-28 bg-slate-900/35">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="How it works"
            title="Prove what happened, then make the trail reviewable."
            body="ProofWarden follows a narrow sequence: capture the event, anchor the receipt, and assemble the record."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {proofChain.map((item, index) => (
              <div key={item.title} className="feature-card">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-100">
                    {item.eyebrow}
                  </span>
                  <span className="font-mono text-sm text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {index === 0
                    ? "Capture structured facts around the AI-agent action: actor, action type, timestamp, source system, tool used, approval state, authority scope, boundary context, and evidence-vault reference."
                    : index === 1
                      ? "Anchor proof metadata through DUAL, a distributed-ledger proof layer that stores hashes, timestamps, receipt references, lineage metadata, object references, and verifier-readable proof fields."
                      : "Assemble a reviewer-readable evidence record linking the event, boundary mapping, receipt metadata, hashes, approvals, reason codes, verifier grants, and review context."}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Sample action receipt</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                A compact record of what happened, what boundary applied, and where the evidence lives.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                The receipt gives reviewers a stable starting point without moving sensitive raw prompts, files, logs, or approvals out of the customer evidence vault.
              </p>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-slate-950/90 shadow-2xl shadow-cyan-950/35">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/80" />
                <span className="ml-3 font-mono text-xs text-slate-500">proofwarden receipt</span>
              </div>
              <dl className="grid gap-3 p-5 font-mono text-xs sm:text-sm">
                {sampleReceipt.map(([label, value]) => (
                  <div key={label} className="grid gap-2 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-cyan-200">{label}:</dt>
                    <dd className={positiveReceiptValues.has(value) ? "text-emerald-200" : "break-words text-slate-100"}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="section-padding scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="Architecture"
            title="Separate custody, integrity, and judgment."
            body="ProofWarden does not move sensitive raw evidence onto DUAL. It separates raw evidence custody from independently verifiable proof metadata."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {architectureLayers.map((layer, index) => (
              <div key={layer.title} className="relative rounded-[2rem] border border-white/10 bg-slate-900/70 p-7">
                {index < architectureLayers.length - 1 ? (
                  <div className="absolute left-[calc(100%-1.5rem)] top-1/2 hidden h-px w-12 bg-gradient-to-r from-cyan-300/70 to-transparent lg:block" />
                ) : null}
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{layer.label}</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{layer.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{layer.description}</p>
                <p className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm font-medium leading-6 text-cyan-50">
                  {layer.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 text-center text-sm leading-7 text-cyan-50">
            Customer Evidence Vault → DUAL Proof Layer → Reviewer Evidence Record
          </div>
        </div>
      </section>

      <section id="boundaries" className="section-padding scroll-mt-28 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <SectionIntro
            eyebrow="Bounded actions"
            title="Built around the boundary a reviewer will care about later."
            body="ProofWarden starts with the operational boundary: the rule, threshold, authority limit, access condition, control, contract obligation, or reviewer question that defines what evidence should exist."
          />
          <div className="flex flex-wrap content-start gap-3">
            {boundaries.map((boundary) => (
              <span key={boundary} className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-slate-200">
                {boundary}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="exceptions" className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-8 shadow-2xl shadow-amber-950/20">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-100">Exception path</p>
            <h2 className="mt-4 font-mono text-2xl text-amber-50 md:text-3xl">event → exception → review record</h2>
            <div className="mt-8 space-y-4">
              {[
                "Threshold exceeded",
                "Approval missing",
                "Outside authority scope",
                "Boundary crossed",
                "Proof-readiness failed",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-amber-100/10 bg-slate-950/35 p-4 text-sm text-amber-50">
                  <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.8)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <SectionIntro
            eyebrow="Exception preservation"
            title="Exceptions are evidence too."
            body="If an action exceeds a threshold, lacks approval, falls outside authority scope, crosses a boundary, or fails proof-readiness checks, ProofWarden does not create a clean-action receipt that could imply acceptance. Instead, it preserves the facts as exception evidence so reviewers can inspect what occurred, which boundary failed, what evidence existed, and where uncertainty remained."
          />
        </div>
      </section>

      <section id="use-cases" className="section-padding scroll-mt-28 bg-slate-900/35">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="Use cases"
            title="Designed for enterprise AI deployers and risk teams."
            body="Start where boundaries, review conditions, approvals, and evidence sufficiency already matter."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div key={useCase.title} className="feature-card">
                <span className="font-mono text-sm text-cyan-200">0{index + 1}</span>
                <h3 className="mt-5 text-2xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{useCase.description}</p>
                <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">
                  {useCase.example}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {secondaryUseCases.map((useCase) => (
              <span key={useCase} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs text-cyan-50">
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="scope" className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <ScopeCard title="What ProofWarden does" items={does} tone="positive" />
          <ScopeCard title="What ProofWarden does not do" items={doesNot} tone="guardrail" />
        </div>
      </section>

      <section id="faq" className="section-padding scroll-mt-28 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionIntro
            centered
            eyebrow="FAQ"
            title="Common questions about ProofWarden."
            body="Plain-English answers for enterprise teams evaluating AI action evidence infrastructure."
          />
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-white">
                  {faq.question}
                  <span className="text-cyan-200 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-padding scroll-mt-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <div className="pill mx-auto mb-7">About ProofWarden</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Built for the next phase of enterprise AI operations.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            As AI agents move deeper into operational workflows, enterprises need more than dashboards and logs. They need evidence infrastructure that preserves what happened, anchors proof metadata, and supports reviewer trust without exposing unnecessary sensitive data.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-400">
            ProofWarden is built around a simple principle: when AI agents act, the evidence trail should be captured, anchored, and reviewable before systems or narratives change around it.
          </p>
        </div>
      </section>

      <section id="request" className="section-padding scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="pill mb-7">Request early access</div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Explore AI action evidence infrastructure with ProofWarden.
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-300">
              ProofWarden is working with enterprise AI deployers and risk teams exploring evidence infrastructure for AI-agent actions.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm font-semibold text-white">Downloads</p>
              <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row">
                <a className="download-link" href="/downloads/proofwarden-infographic.png" download>
                  Download infographic
                </a>
                <a className="download-link" href="/downloads/proofwarden-one-page-overview.pdf" download>
                  Download one-page overview
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30 md:p-8">
            <EarlyAccessForm />
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
            <a href="#product" className="hover:text-cyan-200">How it works</a>
            <a href="#architecture" className="hover:text-cyan-200">Architecture</a>
            <a href="#use-cases" className="hover:text-cyan-200">Use Cases</a>
            <a href="#faq" className="hover:text-cyan-200">FAQ</a>
            <a href="#about" className="hover:text-cyan-200">About</a>
            <a href="#request" className="hover:text-cyan-200">Request Early Access</a>
            <Link href="/privacy" className="hover:text-cyan-200">Privacy Notice</Link>
            <a href="/downloads/proofwarden-infographic.png" download className="hover:text-cyan-200">Download infographic</a>
            <a href="/downloads/proofwarden-one-page-overview.pdf" download className="hover:text-cyan-200">Download one-page overview</a>
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

function ScopeCard({ title, items, tone }: { title: string; items: string[]; tone: "positive" | "guardrail" }) {
  const isPositive = tone === "positive";
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-7">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span
              className={`mt-1 h-5 w-5 shrink-0 rounded-full border ${
                isPositive ? "border-cyan-300/40 bg-cyan-300/10" : "border-violet-300/40 bg-violet-300/10"
              }`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
