export type IntakeFieldType =
  | "text"
  | "email"
  | "url"
  | "select"
  | "textarea"
  | "checkboxes"
  | "radio";

export type IntakeField = {
  id: string;
  label: string;
  type: IntakeFieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  rows?: number;
};

export type IntakeSection = {
  id: string;
  title: string;
  intro: string;
  fields: IntakeField[];
};

export const reviewTriggerOptions = [
  "Insurance renewal",
  "Policy placement",
  "Audit",
  "Procurement review",
  "Board review",
  "Customer diligence",
  "Launch",
  "Incident review",
  "Internal control review",
  "Other",
];

export const reviewerOptions = [
  "Auditor",
  "Compliance lead",
  "Customer assurance reviewer",
  "Counsel",
  "Operator",
  "Broker",
  "Insurer",
  "MGA",
  "Carrier",
  "Underwriter",
  "Claims reviewer",
  "Verifier",
  "Other",
];

export const lifecycleOptions = ["Live", "Pilot", "Pre-launch", "Planned", "Unknown"];

export const actionModeOptions = [
  "Recommend",
  "Prepare",
  "Approve",
  "Execute",
  "Escalate",
  "Record",
  "Other",
];

export const yesNoUnknownOptions = ["Yes", "No", "Unknown"];

export const sensitiveDataOptions = [
  "Raw prompts",
  "Model outputs",
  "Application logs",
  "Approval records",
  "Customer data",
  "Personal data",
  "Commercial terms",
  "Policy or contract text",
  "Credentials or secrets",
  "Privileged material",
  "Other",
];

export const intakeSections: IntakeSection[] = [
  {
    id: "buyer-trigger",
    title: "Buyer And Trigger",
    intro: "Who is asking for the review, and what external or internal event made the evidence trail matter now?",
    fields: [
      { id: "organizationName", label: "Organization name", type: "text", required: true },
      { id: "primaryContact", label: "Primary contact", type: "text", required: true },
      { id: "primaryContactRole", label: "Primary contact role", type: "text", required: true },
      { id: "workEmail", label: "Work email", type: "email", required: true },
      {
        id: "reviewTrigger",
        label: "Review trigger",
        type: "select",
        required: true,
        options: reviewTriggerOptions,
      },
      {
        id: "targetReviewer",
        label: "Target evidence reviewer",
        type: "select",
        required: true,
        options: reviewerOptions,
      },
      {
        id: "desiredOutcome",
        label: "Desired outcome from this review",
        type: "textarea",
        rows: 3,
        required: true,
      },
    ],
  },
  {
    id: "workflow",
    title: "Workflow",
    intro: "Answer for one AI-agent workflow. If the answer is unknown, write unknown rather than guessing.",
    fields: [
      {
        id: "workflowDescription",
        label: "Describe the AI-agent workflow in 3-5 sentences",
        type: "textarea",
        rows: 5,
        required: true,
      },
      {
        id: "affectedProcess",
        label: "What system, product, team, or customer process does the workflow affect?",
        type: "textarea",
        rows: 3,
        required: true,
      },
      {
        id: "workflowStage",
        label: "Is the agent already live, in pilot, pre-launch, or planned?",
        type: "select",
        required: true,
        options: lifecycleOptions,
      },
      {
        id: "workflowFrequency",
        label: "How often does the workflow run?",
        type: "text",
        required: true,
      },
      {
        id: "disruptedProcess",
        label: "What business process would be disrupted if the workflow behaved incorrectly?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "bounded-action",
    title: "Bounded Action",
    intro: "Narrow the review to one action the agent can take or recommend.",
    fields: [
      {
        id: "boundedActionName",
        label: "Name the single action the agent can take or recommend",
        type: "text",
        required: true,
      },
      {
        id: "boundedActionSentence",
        label: "Complete this sentence: The agent [verb] [object] in [system/context] when [condition/limit].",
        type: "textarea",
        rows: 3,
        required: true,
      },
      {
        id: "actionMode",
        label: "Does the agent recommend, prepare, approve, execute, escalate, or record the action?",
        type: "select",
        required: true,
        options: actionModeOptions,
      },
      {
        id: "actionLimits",
        label: "What amount, scope, customer, geography, transaction, policy, system, or permission limits apply?",
        type: "textarea",
        rows: 4,
        required: true,
      },
      {
        id: "reviewRelevantReason",
        label: "What makes the action review-relevant?",
        type: "textarea",
        rows: 3,
        required: true,
      },
    ],
  },
  {
    id: "authority-approval",
    title: "Authority And Approval",
    intro: "Define where delegated authority starts, stops, and gets recorded.",
    fields: [
      { id: "authorityOwner", label: "Who owns the authority boundary for this action?", type: "text" },
      {
        id: "withoutApproval",
        label: "When can the agent act without human approval?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "humanApprovalRequired",
        label: "When must a human approve, override, or reject the action?",
        type: "textarea",
        rows: 3,
      },
      { id: "approvalRecordedWhere", label: "Where is approval recorded?", type: "textarea", rows: 3 },
      {
        id: "overrideRecordedWhere",
        label: "Who can override the agent, and where is that override recorded?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "uncertainOverLimitPath",
        label: "What happens when the agent is uncertain, over limit, or outside scope?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "review-boundary",
    title: "Review Boundary",
    intro: "Name the control, policy, contract, audit requirement, or assurance promise a reviewer will test against.",
    fields: [
      {
        id: "applicableBoundary",
        label: "What control, policy, contract, audit requirement, customer assurance promise, or insurance wording applies?",
        type: "textarea",
        rows: 4,
        required: true,
      },
      { id: "boundaryLocation", label: "Where does that boundary live?", type: "textarea", rows: 3 },
      {
        id: "boundaryVersioned",
        label: "Is the boundary versioned?",
        type: "radio",
        options: yesNoUnknownOptions,
      },
      {
        id: "boundaryKeyWords",
        label: "Which words or requirements in that boundary matter most for this action?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "insuranceContextOnly",
        label: "For insurance contexts only: which policy, endorsement, underwriting condition, or broker/carrier review trigger is relevant?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "source-capture",
    title: "Source Capture",
    intro: "Show which records exist closest to the moment the action occurs.",
    fields: [
      { id: "systemsOfRecord", label: "Which systems of record are involved?", type: "textarea", rows: 3 },
      {
        id: "closestActionSystem",
        label: "Which system records the action closest to the moment it occurs?",
        type: "textarea",
        rows: 3,
        required: true,
      },
      {
        id: "existingLogs",
        label: "Which event logs, application logs, approval logs, tickets, identity records, policy-engine results, customer records, or exports exist?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "consistentCapture",
        label: "Are timestamps, actor or service identity, action type, result, approval state, and exception reason captured consistently?",
        type: "radio",
        options: yesNoUnknownOptions,
      },
      {
        id: "tamperProtection",
        label: "Are logs signed, hashed, immutable, exportable, or otherwise protected from after-the-fact editing?",
        type: "radio",
        options: yesNoUnknownOptions,
      },
      {
        id: "manualReconstruction",
        label: "Are any key facts reconstructed manually after the event?",
        type: "radio",
        options: yesNoUnknownOptions,
      },
    ],
  },
  {
    id: "evidence-vault",
    title: "Evidence Vault And Custody",
    intro: "Raw evidence should stay under customer control; this intake asks where it lives and what cannot be shared.",
    fields: [
      {
        id: "rawEvidenceLocation",
        label: "Where do raw prompts, model outputs, logs, approvals, documents, and payloads live?",
        type: "textarea",
        rows: 4,
      },
      { id: "rawEvidenceAccess", label: "Who can access the raw evidence?", type: "textarea", rows: 3 },
      {
        id: "sensitiveDataNotShared",
        label: "What sensitive data should not be shared with an outside reviewer?",
        type: "checkboxes",
        options: sensitiveDataOptions,
      },
      {
        id: "retentionRules",
        label: "What retention, legal hold, privilege, or disclosure rules apply?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "stableEvidenceReferences",
        label: "Can the organization create stable evidence references, hashes, exports, or vault pointers without exposing raw sensitive material?",
        type: "radio",
        options: yesNoUnknownOptions,
      },
    ],
  },
  {
    id: "exceptions-disputes",
    title: "Exceptions And Disputes",
    intro: "Exceptions are evidence too. Capture the messy parts before they get cleaned out of the narrative.",
    fields: [
      {
        id: "recentExceptions",
        label: "List recent incidents, exceptions, near misses, disputed actions, customer complaints, reviewer questions, or audit findings related to this workflow",
        type: "textarea",
        rows: 4,
      },
      { id: "outOfBoundaryEvent", label: "What would count as an out-of-boundary event?", type: "textarea", rows: 3 },
      { id: "exceptionPreservation", label: "How are exception events preserved?", type: "textarea", rows: 3 },
      { id: "exceptionReviewer", label: "Who reviews exceptions?", type: "textarea", rows: 3 },
      {
        id: "disputeEvidenceNeeded",
        label: "What evidence would be needed if the action were disputed later?",
        type: "textarea",
        rows: 4,
      },
    ],
  },
  {
    id: "existing-material",
    title: "Existing Review Material",
    intro: "Link sanitized materials only. Do not submit credentials, secrets, or raw sensitive evidence through this form.",
    fields: [
      {
        id: "workflowMaterialLinks",
        label: "Link current workflow descriptions, SOPs, control wording, policy wording, contract clauses, audit requirements, diagrams, approval policies, or screenshots",
        type: "textarea",
        rows: 4,
        placeholder: "Paste links or describe what can be shared after a review call.",
      },
      {
        id: "sampleLogLinks",
        label: "Link a sample event log or export with sensitive data removed",
        type: "textarea",
        rows: 3,
      },
      {
        id: "reviewTemplateLinks",
        label: "Link any current incident, exception, or compliance review template",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "confirmation",
    title: "Confirmation",
    intro: "These answers help ProofWarden separate verified facts from assumptions in the readiness memo.",
    fields: [
      {
        id: "aiDraftedAnswers",
        label: "Did an AI system help draft these answers?",
        type: "radio",
        required: true,
        options: yesNoUnknownOptions,
      },
      {
        id: "humanOwnerReviewed",
        label: "Has a responsible human owner reviewed the answers against source systems and current policy or control wording?",
        type: "radio",
        required: true,
        options: yesNoUnknownOptions,
      },
      {
        id: "unverifiedConfidentialFacts",
        label: "Are there any facts ProofWarden should treat as unverified, confidential, privileged, or unavailable for the memo?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "consentToContact",
        label: "ProofWarden may contact me about this Evidence Readiness Review intake.",
        type: "radio",
        required: true,
        options: ["Yes"],
      },
    ],
  },
];

export const intakeFieldMap = new Map(
  intakeSections.flatMap((section) => section.fields.map((field) => [field.id, field])),
);

export const requiredIntakeFieldIds = intakeSections.flatMap((section) =>
  section.fields.filter((field) => field.required).map((field) => field.id),
);
