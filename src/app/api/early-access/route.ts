import { NextRequest, NextResponse } from "next/server";

const allowedInterests = new Set([
  "AI governance",
  "Risk / compliance",
  "Audit / assurance",
  "AI operations",
  "Procurement controls",
  "Sensitive data access",
  "Incident review",
  "Customer assurance",
  "Other",
]);

type EarlyAccessPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  role?: string;
  primaryInterest?: string;
  message?: string;
  companyWebsite?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let payload: EarlyAccessPayload;

  try {
    payload = (await request.json()) as EarlyAccessPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const honeypot = clean(payload.companyWebsite);
  if (honeypot) {
    return NextResponse.json({ message: "Request received." }, { status: 200 });
  }

  const fullName = clean(payload.fullName);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const role = clean(payload.role);
  const primaryInterest = clean(payload.primaryInterest);
  const message = clean(payload.message);

  if (!fullName || !email || !company || !role || !primaryInterest || !message) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid work email address." }, { status: 400 });
  }

  if (!allowedInterests.has(primaryInterest)) {
    return NextResponse.json({ message: "Please select a valid primary interest." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "proofwarden.thirstily220@simplelogin.com";

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "The early-access form is not fully configured yet. Please set RESEND_API_KEY and CONTACT_FROM_EMAIL in the deployment environment.",
      },
      { status: 503 },
    );
  }

  const emailSubject = `ProofWarden early access request - ${company}`;
  const emailText = [
    "New ProofWarden early access request",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${role}`,
    `Primary interest: ${primaryInterest}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const emailHtml = `
    <h1>New ProofWarden early access request</h1>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Role:</strong> ${escapeHtml(role)}</p>
    <p><strong>Primary interest:</strong> ${escapeHtml(primaryInterest)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
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
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { message: "The request could not be sent. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Request received." }, { status: 200 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
