"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { intakeSections, type IntakeField } from "@/lib/intakeQuestions";

type FormState = "idle" | "submitting" | "success" | "error";

const multiValueFields = new Set(
  intakeSections.flatMap((section) =>
    section.fields.filter((field) => field.type === "checkboxes").map((field) => field.id),
  ),
);

export function EvidenceReadinessIntakeForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const buttonLabel = useMemo(() => {
    if (state === "submitting") return "Submitting intake...";
    if (state === "success") return "Intake received";
    return "Submit intake";
  }, [state]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

    for (const [key, value] of formData.entries()) {
      if (multiValueFields.has(key)) {
        payload[key] = formData.getAll(key);
      } else {
        payload[key] = value;
      }
    }

    try {
      const response = await fetch("/api/evidence-readiness-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "The intake could not be submitted.");
      }

      setState("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (formError) {
      setState("error");
      setError(formError instanceof Error ? formError.message : "The intake could not be submitted.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "success" ? (
        <div className="rounded-[1.5rem] border border-cyan-300/30 bg-cyan-300/10 p-5 text-sm leading-6 text-cyan-50">
          Thank you. Your Evidence Readiness Review intake has been received. ProofWarden will respond about fit,
          next steps, and any materials needed for the review call.
        </div>
      ) : null}

      {intakeSections.map((section, sectionIndex) => (
        <section key={section.id} className="intake-section" aria-labelledby={`${section.id}-title`}>
          <div className="intake-section-header">
            <span className="font-mono text-xs text-cyan-200">0{sectionIndex + 1}</span>
            <div>
              <h2 id={`${section.id}-title`} className="text-2xl font-semibold tracking-tight text-white">
                {section.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{section.intro}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            {section.fields.map((field) => (
              <IntakeFieldControl key={field.id} field={field} />
            ))}
          </div>
        </section>
      ))}

      <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-6 text-amber-50">
        Do not submit API keys, passwords, bearer tokens, verifier tokens, credential JSON, or raw sensitive evidence.
        Use sanitized links or describe materials that can be reviewed later under the right access controls.
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-xs leading-5 text-slate-500">
          ProofWarden uses this intake to evaluate one AI-agent workflow and one bounded action. See{" "}
          <Link href="/privacy" className="text-cyan-200 hover:text-cyan-100">
            Privacy Notice
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={state === "submitting" || state === "success"}
          className="button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {buttonLabel}
        </button>
      </div>

      {state === "error" ? (
        <p className="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function IntakeFieldControl({ field }: { field: IntakeField }) {
  if (field.type === "select") {
    return (
      <label className="field-label" htmlFor={field.id}>
        <FieldLabel field={field} />
        <select id={field.id} className="field-input" name={field.id} required={field.required} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldHelp field={field} />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="field-label" htmlFor={field.id}>
        <FieldLabel field={field} />
        <textarea
          id={field.id}
          className="field-input resize-y"
          name={field.id}
          rows={field.rows ?? 3}
          required={field.required}
          placeholder={field.placeholder}
        />
        <FieldHelp field={field} />
      </label>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset className="field-label">
        <legend>
          <FieldLabel field={field} />
        </legend>
        <div className="flex flex-wrap gap-3">
          {field.options?.map((option) => (
            <label key={option} className="choice-control">
              <input name={field.id} type="radio" value={option} required={field.required} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldHelp field={field} />
      </fieldset>
    );
  }

  if (field.type === "checkboxes") {
    return (
      <fieldset className="field-label">
        <legend>
          <FieldLabel field={field} />
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          {field.options?.map((option) => (
            <label key={option} className="choice-control">
              <input name={field.id} type="checkbox" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldHelp field={field} />
      </fieldset>
    );
  }

  return (
    <label className="field-label" htmlFor={field.id}>
      <FieldLabel field={field} />
      <input
        id={field.id}
        className="field-input"
        name={field.id}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete={field.type === "email" ? "email" : undefined}
      />
      <FieldHelp field={field} />
    </label>
  );
}

function FieldLabel({ field }: { field: IntakeField }) {
  return (
    <span>
      {field.label}
      {field.required ? <span className="text-cyan-200"> *</span> : null}
    </span>
  );
}

function FieldHelp({ field }: { field: IntakeField }) {
  if (!field.help) return null;
  return <span className="text-xs font-normal leading-5 text-slate-500">{field.help}</span>;
}
