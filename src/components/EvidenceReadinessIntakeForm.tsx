"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { intakeSections, requiredIntakeFieldIds, type IntakeField } from "@/lib/intakeQuestions";

type FormState = "idle" | "submitting" | "success" | "error";
type IntakeValue = string | string[];
type IntakeValues = Record<string, IntakeValue>;

const initialValues = intakeSections.reduce<IntakeValues>((values, section) => {
  for (const field of section.fields) {
    values[field.id] = field.type === "checkboxes" ? [] : "";
  }

  return values;
}, {});

export function EvidenceReadinessIntakeForm() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [values, setValues] = useState<IntakeValues>(initialValues);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const activeSection = intakeSections[activeSectionIndex];
  const isFirstSection = activeSectionIndex === 0;
  const isFinalSection = activeSectionIndex === intakeSections.length - 1;
  const completedSections = state === "success" ? intakeSections.length : activeSectionIndex;
  const completionPercent = Math.round((completedSections / intakeSections.length) * 100);

  const buttonLabel = useMemo(() => {
    if (state === "submitting") return "Submitting intake...";
    if (state === "success") return "Intake received";
    return "Submit intake";
  }, [state]);

  function updateValue(field: IntakeField, value: IntakeValue) {
    setValues((currentValues) => ({ ...currentValues, [field.id]: value }));
    if (state === "error") {
      setState("idle");
      setError(null);
    }
  }

  function onCheckboxChange(field: IntakeField, option: string, checked: boolean) {
    const currentValue = values[field.id];
    const currentList = Array.isArray(currentValue) ? currentValue : [];
    const nextList = checked ? [...currentList, option] : currentList.filter((item) => item !== option);
    updateValue(field, nextList);
  }

  function validateVisibleSection(form: HTMLFormElement) {
    if (form.reportValidity()) return true;

    setState("error");
    setError("Please complete the required fields in this section before continuing.");
    return false;
  }

  function nextSection(form: HTMLFormElement) {
    if (!validateVisibleSection(form)) return;
    setActiveSectionIndex((index) => Math.min(index + 1, intakeSections.length - 1));
    setError(null);
    setState("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousSection() {
    setActiveSectionIndex((index) => Math.max(index - 1, 0));
    setError(null);
    setState("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!validateVisibleSection(form)) return;

    const missingRequiredField = requiredIntakeFieldIds.find((fieldId) => {
      const value = values[fieldId];
      return Array.isArray(value) ? value.length === 0 : !value;
    });

    if (missingRequiredField) {
      const missingSectionIndex = intakeSections.findIndex((section) =>
        section.fields.some((field) => field.id === missingRequiredField),
      );
      setActiveSectionIndex(Math.max(missingSectionIndex, 0));
      setState("error");
      setError("Please complete all required fields before submitting.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setState("submitting");
    setError(null);

    const formData = new FormData(form);
    const payload: Record<string, IntakeValue> = {
      ...values,
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    };

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
      setValues(initialValues);
      setActiveSectionIndex(0);
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (formError) {
      setState("error");
      setError(formError instanceof Error ? formError.message : "The intake could not be submitted.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Section {activeSectionIndex + 1} of {intakeSections.length}
            </p>
            <p className="mt-1 text-sm text-slate-300">{completionPercent}% complete</p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Intake sections">
            {intakeSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionIndex(index)}
                className={index === activeSectionIndex ? "step-dot step-dot-active" : "step-dot"}
                aria-label={`Go to ${section.title}`}
                aria-current={index === activeSectionIndex ? "step" : undefined}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-950/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-indigo-300 transition-[width] duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {state === "success" ? (
        <div className="rounded-[1.5rem] border border-cyan-300/30 bg-cyan-300/10 p-5 text-sm leading-6 text-cyan-50">
          Thank you. Your Evidence Readiness Review intake has been received. ProofWarden will respond about fit,
          next steps, and any materials needed for the review call.
        </div>
      ) : null}

      <section className="intake-section" aria-labelledby={`${activeSection.id}-title`}>
        <div className="intake-section-header">
          <span className="font-mono text-xs text-cyan-200">{String(activeSectionIndex + 1).padStart(2, "0")}</span>
          <div>
            <h2 id={`${activeSection.id}-title`} className="text-2xl font-semibold tracking-tight text-white">
              {activeSection.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{activeSection.intro}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {activeSection.fields.map((field) => (
            <IntakeFieldControl
              key={field.id}
              field={field}
              value={values[field.id]}
              onChange={updateValue}
              onCheckboxChange={onCheckboxChange}
            />
          ))}
        </div>
      </section>

      {isFinalSection ? (
        <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-6 text-amber-50">
          Do not submit API keys, passwords, bearer tokens, verifier tokens, credential JSON, or raw sensitive evidence.
          Use sanitized links or describe materials that can be reviewed later under the right access controls.
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={previousSection}
            disabled={isFirstSection || state === "submitting"}
            className="button-ghost w-full justify-center disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Previous
          </button>

          {isFinalSection ? (
            <button
              type="submit"
              disabled={state === "submitting" || state === "success"}
              className="button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {buttonLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={(event) => nextSection(event.currentTarget.form as HTMLFormElement)}
              disabled={state === "submitting" || state === "success"}
              className="button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              Next
            </button>
          )}
        </div>

        <p className="max-w-2xl text-xs leading-5 text-slate-500">
          ProofWarden uses this intake to evaluate one AI-agent workflow and one bounded action. See{" "}
          <Link href="/privacy" className="text-cyan-200 hover:text-cyan-100">
            Privacy Notice
          </Link>
          .
        </p>
      </div>

      {state === "error" ? (
        <p className="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function IntakeFieldControl({
  field,
  value,
  onChange,
  onCheckboxChange,
}: {
  field: IntakeField;
  value: IntakeValue;
  onChange: (field: IntakeField, value: IntakeValue) => void;
  onCheckboxChange: (field: IntakeField, option: string, checked: boolean) => void;
}) {
  const stringValue = typeof value === "string" ? value : "";

  if (field.type === "select") {
    return (
      <label className="field-label" htmlFor={field.id}>
        <FieldLabel field={field} />
        <select
          id={field.id}
          className="field-input"
          name={field.id}
          required={field.required}
          value={stringValue}
          onChange={(event) => onChange(field, event.target.value)}
        >
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
          value={stringValue}
          onChange={(event) => onChange(field, event.target.value)}
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
              <input
                name={field.id}
                type="radio"
                value={option}
                required={field.required}
                checked={stringValue === option}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(field, event.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldHelp field={field} />
      </fieldset>
    );
  }

  if (field.type === "checkboxes") {
    const selectedValues = Array.isArray(value) ? value : [];

    return (
      <fieldset className="field-label">
        <legend>
          <FieldLabel field={field} />
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          {field.options?.map((option) => (
            <label key={option} className="choice-control">
              <input
                name={field.id}
                type="checkbox"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onCheckboxChange(field, option, event.target.checked)
                }
              />
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
        value={stringValue}
        onChange={(event) => onChange(field, event.target.value)}
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
