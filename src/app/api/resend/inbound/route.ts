import { NextRequest, NextResponse } from "next/server";

type ResendInboundEvent = {
  type?: unknown;
  data?: {
    email_id?: unknown;
    from?: unknown;
    to?: unknown;
    received_for?: unknown;
    subject?: unknown;
    created_at?: unknown;
  };
};

type ReceivedEmail = {
  from?: unknown;
  subject?: unknown;
  text?: unknown;
  html?: unknown;
  created_at?: unknown;
  attachments?: unknown;
};

const defaultAcceptedRecipients = ["hello@proofwarden.com"];

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let event: ResendInboundEvent;

  try {
    event = (await request.json()) as ResendInboundEvent;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ message: "Ignored event." }, { status: 200 });
  }

  const emailId = clean(event.data?.email_id);
  if (!emailId) {
    return NextResponse.json({ message: "Missing email id." }, { status: 400 });
  }

  const recipients = [...cleanList(event.data?.to), ...cleanList(event.data?.received_for)];
  const acceptedRecipients = getAcceptedRecipients();

  if (!recipients.some((recipient) => acceptedRecipients.includes(recipient.toLowerCase()))) {
    console.info("ProofWarden inbound email ignored for unconfigured recipient", {
      emailId,
      recipients: recipients.map(maskEmail),
    });
    return NextResponse.json({ message: "Ignored recipient." }, { status: 200 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const forwardTo = process.env.INBOUND_FORWARD_TO;

  if (!resendApiKey || !fromEmail || !forwardTo) {
    console.info("ProofWarden inbound email received without forwarding configured", {
      emailId,
      fromDomain: getEmailDomain(clean(event.data?.from)),
      recipients: recipients.map(maskEmail),
    });
    return NextResponse.json({ message: "Inbound email received." }, { status: 200 });
  }

  const receivedEmail = await getReceivedEmail(resendApiKey, emailId);
  const subject = clean(receivedEmail?.subject) || clean(event.data?.subject) || "(no subject)";
  const sender = clean(receivedEmail?.from) || clean(event.data?.from) || "Unknown sender";
  const createdAt = clean(receivedEmail?.created_at) || clean(event.data?.created_at) || "Unknown time";
  const bodyText = clean(receivedEmail?.text);
  const bodyHtml = clean(receivedEmail?.html);
  const attachmentSummary = summarizeAttachments(receivedEmail?.attachments);

  const notificationText = [
    "New email received at ProofWarden",
    "",
    `From: ${sender}`,
    `To: ${recipients.join(", ")}`,
    `Subject: ${subject}`,
    `Received: ${createdAt}`,
    `Resend email id: ${emailId}`,
    "",
    attachmentSummary,
    "",
    "Message text:",
    bodyText || "No plain-text body returned by Resend.",
  ].join("\n");

  const notificationHtml = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h1 style="font-size:20px;margin:0 0 12px;">New email received at ProofWarden</h1>
      <p><strong>From:</strong> ${escapeHtml(sender)}</p>
      <p><strong>To:</strong> ${escapeHtml(recipients.join(", "))}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Received:</strong> ${escapeHtml(createdAt)}</p>
      <p><strong>Resend email id:</strong> ${escapeHtml(emailId)}</p>
      <p>${escapeHtml(attachmentSummary).replace(/\n/g, "<br />")}</p>
      <hr style="border:0;border-top:1px solid #dbe3ef;margin:18px 0;" />
      ${bodyHtml || `<pre style="white-space:pre-wrap;font-family:Arial,sans-serif;">${escapeHtml(bodyText || "No email body returned by Resend.")}</pre>`}
    </div>
  `;

  const sendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [forwardTo],
      reply_to: sender.includes("@") ? sender : undefined,
      subject: `Inbound ProofWarden email - ${subject}`,
      text: notificationText,
      html: notificationHtml,
    }),
  });

  if (!sendResponse.ok) {
    console.error("ProofWarden inbound notification rejected by provider", {
      providerStatus: sendResponse.status,
      emailId,
      forwardDomain: getEmailDomain(forwardTo),
    });
    return NextResponse.json({ message: "Inbound email received; notification failed." }, { status: 502 });
  }

  return NextResponse.json({ message: "Inbound email received." }, { status: 200 });
}

function isAuthorized(request: NextRequest) {
  const expectedToken = process.env.RESEND_INBOUND_TOKEN;

  if (!expectedToken) {
    return true;
  }

  const suppliedToken =
    request.headers.get("x-proofwarden-inbound-token") ?? request.nextUrl.searchParams.get("token");

  return suppliedToken === expectedToken;
}

async function getReceivedEmail(apiKey: string, emailId: string): Promise<ReceivedEmail | undefined> {
  const response = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    console.error("ProofWarden inbound email lookup failed", {
      providerStatus: response.status,
      emailId,
    });
    return undefined;
  }

  return (await response.json().catch(() => undefined)) as ReceivedEmail | undefined;
}

function getAcceptedRecipients() {
  const configured = process.env.INBOUND_ACCEPTED_RECIPIENTS?.split(",").map((item) => item.trim().toLowerCase());
  return configured?.filter(Boolean) ?? defaultAcceptedRecipients;
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function summarizeAttachments(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return "Attachments: none listed by Resend.";
  }

  return [
    `Attachments: ${value.length}`,
    ...value.map((attachment, index) => {
      if (!attachment || typeof attachment !== "object") return `${index + 1}. Unknown attachment`;
      const record = attachment as Record<string, unknown>;
      return `${index + 1}. ${clean(record.filename) || "Unnamed attachment"} (${clean(record.content_type) || "unknown type"})`;
    }),
  ].join("\n");
}

function getEmailDomain(value: string) {
  return value.includes("@") ? value.split("@").pop() : "unknown";
}

function maskEmail(value: string) {
  const [localPart, domain] = value.split("@");

  if (!localPart || !domain) {
    return "configured recipient";
  }

  return `${localPart.slice(0, 2)}***@${domain}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
