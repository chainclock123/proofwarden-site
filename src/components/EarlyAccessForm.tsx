"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const primaryInterests = [
  "AI governance",
  "Risk / compliance",
  "Audit / assurance",
  "AI operations",
  "Procurement controls",
  "Sensitive data access",
  "Incident review",
  "Customer assurance",
  "Other",
];

export function EarlyAccessForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const buttonLabel = useMemo(() => {
    if (state === "submitting") return "Submitting...";
    if (state === "success") return "Request received";
    return "Submit request";
  }, [state]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "The request could not be submitted.");
      }

      setState("success");
      event.currentTarget.reset();
    } catch (formError) {
      setState("error");
      setError(
        formError instanceof Error
          ? formError.message
          : "The request could not be submitted.",
      );
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
          <span>Role / title</span>
          <input className="field-input" name="role" type="text" autoComplete="organization-title" required />
        </label>
      </div>

      <label className="field-label">
        <span>Primary interest</span>
        <select className="field-input" name="primaryInterest" required defaultValue="">
          <option value="" disabled>
            Select an area
          </option>
          {primaryInterests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </label>

      <label className="field-label">
        <span>Message</span>
        <textarea
          className="field-input min-h-36 resize-y"
          name="message"
          placeholder="Tell us what kind of AI-agent actions, workflows, or evidence questions you are exploring."
          required
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
        By submitting, you agree that ProofWarden may use your details to respond to your early-access request. See{" "}
        <Link href="/privacy" className="text-cyan-200 hover:text-cyan-100">
          Privacy Notice
        </Link>
        .
      </p>

      {state === "success" ? (
        <p className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm text-cyan-100">
          Thank you. Your request has been received. We will respond if there is a fit for early access or a design-partner discussion.
        </p>
      ) : null}

      {state === "error" ? (
        <p className="rounded-2xl border border-rose-300/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </form>
  );
}
