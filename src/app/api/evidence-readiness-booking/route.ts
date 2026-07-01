import { NextRequest, NextResponse } from "next/server";

const allowedUrgency = new Set([
  "Exploring a workflow now",
  "Reviewer or customer question expected",
  "Preparing for audit / assurance",
  "Broker / insurer / verifier conversation",
  "Not sure yet",
]);

type BookingPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  role?: string;
  urgency?: string;
  workflow?: string;
  message?: string;
  companyWebsite?: string;
};

const maxFieldLength = 5000;
const maxEmailLength = 254;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, maxFieldLength) : "";
}

function isEmail(value: string) {
  return value.length <= maxEmailLength && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const honeypot = clean(payload.companyWebsite);
  if (honeypot) {
    return NextResponse.json({ message: "Call request received." }, { status: 200 });
  }

  const fullName = clean(payload.fullName);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const role = clean(payload.role);
  const urgency = clean(payload.urgency);
  const workflow = clean(payload.workflow);
  const message = clean(payload.message);

  if (!fullName || !email || !company || !urgency || !workflow) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid work email address." }, { status: 400 });
  }

  if (!allowedUrgency.has(urgency)) {
    return NextResponse.json({ message: "Please select a valid review prompt." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@proofwarden.com";

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "The booking form is not fully configured yet. Please set RESEND_API_KEY and CONTACT_FROM_EMAIL in the deployment environment.",
      },
      { status: 503 },
    );
  }

  const subject = `ProofWarden Evidence Readiness Review call - ${company}`;
  const emailText = [
    "New ProofWarden Evidence Readiness Review call request",
    "",
    "Treat this as a request to discuss evidence-readiness, not as verified workflow evidence.",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${role || "Not provided"}`,
    `Review prompt: ${urgency}`,
    "",
    "Workflow or bounded action:",
    workflow,
    "",
    "Additional message:",
    message || "Not provided",
  ].join("\n");

  const emailHtml = `
    <h1>New ProofWarden Evidence Readiness Review call request</h1>
    <p>Treat this as a request to discuss evidence-readiness, not as verified workflow evidence.</p>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Role:</strong> ${escapeHtml(role || "Not provided")}</p>
    <p><strong>Review prompt:</strong> ${escapeHtml(urgency)}</p>
    <p><strong>Workflow or bounded action:</strong></p>
    <p>${escapeHtml(workflow).replace(/\n/g, "<br />")}</p>
    <p><strong>Additional message:</strong></p>
    <p>${escapeHtml(message || "Not provided").replace(/\n/g, "<br />")}</p>
  `;

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
      { message: "The call request could not be sent. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Call request received." }, { status: 200 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
