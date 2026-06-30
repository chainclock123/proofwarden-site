import { NextRequest, NextResponse } from "next/server";
import {
  intakeFieldMap,
  intakeSections,
  requiredIntakeFieldIds,
  sensitiveDataOptions,
} from "@/lib/intakeQuestions";

type IntakePayload = Record<string, unknown>;

const maxFieldLength = 5000;
const maxEmailLength = 254;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, maxFieldLength) : "";
}

function cleanList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isEmail(value: string) {
  return value.length <= maxEmailLength && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let payload: IntakePayload;

  try {
    payload = (await request.json()) as IntakePayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const honeypot = clean(payload.companyWebsite);
  if (honeypot) {
    return NextResponse.json({ message: "Intake received." }, { status: 200 });
  }

  const values = new Map<string, string | string[]>();

  for (const section of intakeSections) {
    for (const field of section.fields) {
      if (field.type === "checkboxes") {
        const selected = cleanList(payload[field.id]).filter((item) => field.options?.includes(item));
        values.set(field.id, selected);
      } else {
        const value = clean(payload[field.id]);
        if ((field.type === "select" || field.type === "radio") && value && !field.options?.includes(value)) {
          return NextResponse.json({ message: `Please select a valid option for ${field.label}.` }, { status: 400 });
        }
        values.set(field.id, value);
      }
    }
  }

  for (const fieldId of requiredIntakeFieldIds) {
    const value = values.get(fieldId);
    const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);
    if (!hasValue) {
      const field = intakeFieldMap.get(fieldId);
      return NextResponse.json(
        { message: `Please complete the required field: ${field?.label ?? fieldId}.` },
        { status: 400 },
      );
    }
  }

  const email = String(values.get("workEmail") ?? "");
  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid work email address." }, { status: 400 });
  }

  if (values.get("consentToContact") !== "Yes") {
    return NextResponse.json({ message: "Please confirm ProofWarden may contact you about this intake." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@proofwarden.com";

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "The intake form is not fully configured yet. Please set RESEND_API_KEY and CONTACT_FROM_EMAIL in the deployment environment.",
      },
      { status: 503 },
    );
  }

  const organization = String(values.get("organizationName") ?? "Unknown organization");
  const contact = String(values.get("primaryContact") ?? "Unknown contact");
  const subject = `ProofWarden Evidence Readiness Review intake - ${organization}`;
  const emailText = buildText(values);
  const emailHtml = buildHtml(values);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text: emailText,
      html: emailHtml,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { message: "The intake could not be sent. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { message: `Intake received for ${contact} at ${organization}.` },
    { status: 200 },
  );
}

function buildText(values: Map<string, string | string[]>) {
  const lines = [
    "New ProofWarden Evidence Readiness Review intake",
    "",
    "Do not treat this submission as verified fact until source systems, control wording, and responsible owners are reviewed.",
    "",
  ];

  for (const section of intakeSections) {
    lines.push(section.title);
    lines.push("-".repeat(section.title.length));

    for (const field of section.fields) {
      const value = values.get(field.id);
      const formattedValue = Array.isArray(value) ? value.join(", ") || "Not provided" : value || "Not provided";
      lines.push(`${field.label}:`);
      lines.push(String(formattedValue));
      lines.push("");
    }
  }

  return lines.join("\n");
}

function buildHtml(values: Map<string, string | string[]>) {
  const sectionHtml = intakeSections
    .map((section) => {
      const rows = section.fields
        .map((field) => {
          const value = values.get(field.id);
          const formattedValue = Array.isArray(value) ? value.join(", ") || "Not provided" : value || "Not provided";
          return `
            <tr>
              <th align="left" style="vertical-align:top;padding:10px 12px;border-bottom:1px solid #dbe3ef;width:34%;font-family:Arial,sans-serif;font-size:13px;color:#0f172a;">${escapeHtml(field.label)}</th>
              <td style="vertical-align:top;padding:10px 12px;border-bottom:1px solid #dbe3ef;font-family:Arial,sans-serif;font-size:13px;line-height:1.55;color:#334155;">${escapeHtml(String(formattedValue)).replace(/\n/g, "<br />")}</td>
            </tr>
          `;
        })
        .join("");

      return `
        <h2 style="font-family:Arial,sans-serif;font-size:18px;color:#0f172a;margin:26px 0 8px;">${escapeHtml(section.title)}</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #dbe3ef;border-radius:8px;overflow:hidden;">
          ${rows}
        </table>
      `;
    })
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h1 style="font-size:22px;margin:0 0 12px;">New ProofWarden Evidence Readiness Review intake</h1>
      <p style="font-size:14px;line-height:1.6;color:#475569;">
        Do not treat this submission as verified fact until source systems, control wording, and responsible owners are reviewed.
        Sensitive data categories selected in the form are limited to: ${escapeHtml(sensitiveDataOptions.join(", "))}.
      </p>
      ${sectionHtml}
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
