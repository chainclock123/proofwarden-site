import Link from "next/link";

export const metadata = {
  title: "Privacy Notice - ProofWarden",
  description: "Basic privacy notice for ProofWarden form submissions.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
        <Link href="/" className="text-sm text-cyan-200 hover:text-cyan-100">
          Back to ProofWarden
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white">Privacy Notice</h1>
        <p className="mt-3 text-sm text-slate-400">Effective date: 23 May 2026</p>

        <div className="prose-dark mt-8 space-y-5 text-sm leading-7 text-slate-300">
          <p>
            ProofWarden collects information submitted through the Request Early Access form, including name, work email, company, role, primary interest, and message content.
          </p>
          <p>
            ProofWarden may also collect information submitted through the Evidence Readiness Review intake form, including contact details, workflow descriptions, bounded-action context, review boundaries, source-capture details, evidence-custody descriptions, exception summaries, sanitized links, and confirmation responses.
          </p>
          <p>
            We use this information to review early-access requests, respond to enquiries, understand potential customer needs, and improve ProofWarden communications.
          </p>
          <p>We do not sell personal information.</p>
          <p>
            We may use trusted service providers to host the website, process form submissions, deliver email notifications, and maintain the site. These providers process information only as needed to support the website and related communications.
          </p>
          <p>
            Submitting the form does not create a customer relationship, service agreement, or product commitment.
          </p>
          <p>
            To request deletion of submitted contact information, contact:{" "}
            <a className="text-cyan-200 hover:text-cyan-100" href="mailto:hello@proofwarden.com">
              hello@proofwarden.com
            </a>
          </p>
          <p>This notice may be updated as ProofWarden develops.</p>
        </div>
      </div>
    </main>
  );
}
