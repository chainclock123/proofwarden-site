"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const urgencyOptions = [
  "Exploring a workflow now",
  "Reviewer or customer question expected",
  "Preparing for audit / assurance",
  "Broker / insurer / verifier conversation",
  "Not sure yet",
];

export function EvidenceReadinessBookingForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const buttonLabel = useMemo(() => {
    if (state === "submitting") return "Sending...";
    if (state === "success") return "Request sent";
    return "Book a call";
  }, [state]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/evidence-readiness-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "The call request could not be sent.");
      }

      setState("success");
      event.currentTarget.reset();
    } catch (formError) {
      setState("error");
      setError(formError instanceof Error ? formError.message : "The call request could not be sent.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          <span>Full name</span>
          <input className="field-input" name="fullName" type="text" autoComplete="name" required />
        </label>
        <label className="field-label">
          <span>Work email</span>
          <input className="field-input" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field-label">
          <span>Company</span>
          <input className="field-input" name="company" type="text" autoComplete="organization" required />
        </label>
        <label className="field-label">
          <span>Role / title <span className="font-normal text-slate-500">(optional)</span></span>
          <input className="field-input" name="role" type="text" autoComplete="organization-title" />
        </label>
      </div>

      <label className="field-label">
        <span>What prompted the review?</span>
        <select className="field-input" name="urgency" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {urgencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="field-label">
        <span>Workflow or bounded action</span>
        <textarea
          className="field-input min-h-28 resize-y"
          name="workflow"
          required
          placeholder="Example: an agent drafts renewal language, routes submissions, prepares vendor-risk summaries, or recommends refunds."
        />
      </label>

      <label className="field-label">
        <span>Anything else? <span className="font-normal text-slate-500">(optional)</span></span>
        <textarea
          className="field-input min-h-24 resize-y"
          name="message"
          placeholder="Optional: note the reviewer, control, policy, customer assurance request, or evidence concern."
        />
      </label>

      <button
        type="submit"
        disabled={state === "submitting" || state === "success"}
        className="button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {buttonLabel}
      </button>

      <p className="max-w-xl text-xs leading-5 text-slate-500">
        Do not submit API keys, passwords, credential JSON, or raw sensitive evidence. ProofWarden will use your details
        to respond about the review. See{" "}
        <Link href="/privacy" className="text-cyan-200 hover:text-cyan-100">
          Privacy Notice
        </Link>
        .
      </p>

      {state === "success" ? (
        <p className="rounded-[1.5rem] border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm text-cyan-100">
          Thank you. Your call request has been received. ProofWarden will respond about fit and next steps.
        </p>
      ) : null}

      {state === "error" ? (
        <p className="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </form>
  );
}
