/**
 * LEGAL ADVISOR SERVICE
 * ---------------------
 * `askCivicAdvisor` sends the user's question to the integrated Legal Advisor
 * RAG backend (legal-advisor/, FastAPI `POST /api/advisor/ask`) and adapts its
 * response into the `AdvisorGuidance` shape the UI renders.
 *
 * - Base URL: `VITE_ADVISOR_API_BASE` (default "/api/advisor", proxied by Vite
 *   to the Legal Advisor backend on port 8001 — see vite.config.ts).
 * - The original keyword-based demo answers are kept below and are used ONLY
 *   when `VITE_ADVISOR_USE_MOCK=true` is set explicitly (offline UI demos).
 *   They are never used as a silent fallback when the backend fails.
 */

export interface AdvisorRight {
  title: string;
  body: string;
}

export interface AdvisorStep {
  title: string;
  body: string;
}

export interface AdvisorSource {
  sourceFile: string;
  sections: string;
  page?: string;
  chunkId?: string;
  /** Link that opens the original document (PDFs at the cited page, via #page=N). */
  url?: string;
  /** Original document name, e.g. "Consumer_Protection_Act_2019". */
  title?: string;
  /** e.g. "pdf", "docx", "html". */
  fileType?: string;
  pageStart?: number;
  pageEnd?: number;
}

export interface AdvisorGuidance {
  /** Short label shown in the response header, e.g. "Tenancy Frameworks & TPA" */
  contextLabel: string;
  summary: string;
  rights: AdvisorRight[];
  nextSteps: AdvisorStep[];
  learnMoreLabel: string;
  sourceSummary: string;
  sourceDetail: string;

  // ---- Optional fields filled in by the real Legal Advisor backend ----
  /** Backend status, e.g. SUPPORTED, PARTIALLY_SUPPORTED, NO_RELEVANT_SOURCE. */
  status?: string;
  applicableLaw?: AdvisorRight[];
  responsibilities?: string[];
  evidenceChecklist?: string[];
  authorities?: string[];
  importantNote?: string;
  limitations?: string[];
  sources?: AdvisorSource[];
  /** Set when the backend declined to answer (no verified evidence) or failed. */
  notice?: { kind: "blocked" | "error"; message: string };
}

export interface AdvisorMessage {
  id: string;
  role: "user" | "advisor";
  text?: string; // present for user messages
  guidance?: AdvisorGuidance; // present for advisor messages
}

const TOPIC_TEMPLATES: { keywords: string[]; guidance: AdvisorGuidance }[] = [
  {
    keywords: ["landlord", "deposit", "tenant", "rent", "eviction", "vacate"],
    guidance: {
      contextLabel: "Tenancy Frameworks & TPA",
      summary:
        "Under Indian law, a landlord cannot unilaterally evict a tenant or withhold a deposit without formal cause or without adhering to the notice period in your registered rental agreement. Both state rent control legislation and Section 106 of the Transfer of Property Act mandate a standard notice period (typically 15 to 30 days) before eviction or deposit disputes can proceed.",
      rights: [
        { title: "Right to a notice period:", body: "A landlord must give proper written notice before eviction — an abrupt verbal request isn't enough." },
        { title: "Right to a written explanation:", body: "You can ask for an itemised, written reason for any deposit deduction." },
        { title: "Right to redressal:", body: "You can approach your local Rent Authority or consumer forum if the dispute isn't resolved directly." },
      ],
      nextSteps: [
        { title: "Preserve your paperwork:", body: "Keep your rental agreement, rent receipts, and a dated record of the property's condition when you moved in and out." },
        { title: "Send a written request:", body: "Ask for the deposit or a notice explanation in writing (email or registered post) so there's a clear record." },
        { title: "Escalate if ignored:", body: "If there's no response within a reasonable time, approach your state's Rent Authority or a consumer forum." },
      ],
      learnMoreLabel: "Want to learn more? Understand tenancy rights",
      sourceSummary: "Sources & references (Transfer of Property Act & Model Tenancy Act)",
      sourceDetail:
        "Statutory baseline: Section 106, Transfer of Property Act, 1882 & Model Tenancy Act, 2021 (eviction protection & notice norms).",
    },
  },
  {
    keywords: ["fir", "police", "arrest", "complaint", "station"],
    guidance: {
      contextLabel: "Criminal Procedure",
      summary:
        "Police are legally required to register an FIR for any cognizable offence — one where they can arrest without a warrant. If your local police station refuses, you can still get your complaint registered through a Zero FIR or by approaching a higher authority.",
      rights: [
        { title: "Right to a Zero FIR:", body: "You can file an FIR at any police station, regardless of where the incident happened — it gets transferred to the right jurisdiction." },
        { title: "Right to a free copy:", body: "You're entitled to a free copy of the FIR once it's registered." },
        { title: "Right to escalate a refusal:", body: "If police refuse to register a cognizable offence, you can approach the Superintendent of Police or a magistrate." },
      ],
      nextSteps: [
        { title: "Write it down clearly:", body: "Note down what happened, when, and any witnesses, before you go to the station." },
        { title: "Ask for it in writing:", body: "If they refuse to file an FIR, ask for the refusal in writing — this helps if you need to escalate." },
        { title: "Escalate calmly:", body: "Approach the SP's office or file a complaint with the local magistrate under the BNSS if the refusal continues." },
      ],
      learnMoreLabel: "Want to learn more? Understand FIR procedures",
      sourceSummary: "Sources & references (BNSS 2024)",
      sourceDetail: "Statutory baseline: Section 173, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 — duty to register cognizable offences.",
    },
  },
  {
    keywords: ["refund", "consumer", "defective", "product", "purchase", "warranty"],
    guidance: {
      contextLabel: "Consumer Protection Act, 2019",
      summary:
        "Sellers and e-commerce platforms cannot arbitrarily refuse a refund for a defective, counterfeit, or misdescribed product. The Consumer Protection Act and E-Commerce Rules (2020) give you a clear right to redressal.",
      rights: [
        { title: "Right to be heard:", body: "You can raise a complaint and expect a genuine response, not a dismissal." },
        { title: "Right to redressal:", body: "You can seek a replacement, repair, or refund for defective or misrepresented goods." },
        { title: "Right to escalate:", body: "If the seller doesn't cooperate, you can file a complaint with the National Consumer Helpline or e-Daakhil portal." },
      ],
      nextSteps: [
        { title: "Keep your proof of purchase:", body: "Save the invoice, order confirmation, and any photos of the defect." },
        { title: "Raise it with the seller first:", body: "Send a clear written complaint describing the issue and what resolution you want." },
        { title: "Escalate if unresolved:", body: "File a complaint on the National Consumer Helpline (1915) or the e-Daakhil portal." },
      ],
      learnMoreLabel: "Want to learn more? Understand consumer rights",
      sourceSummary: "Sources & references (Consumer Protection Act, 2019)",
      sourceDetail: "Statutory baseline: Section 2(9), Consumer Protection Act, 2019 & Consumer Protection (E-Commerce) Rules, 2020.",
    },
  },
  {
    keywords: ["otp", "cyber", "fraud", "upi", "hacked", "scam", "online"],
    guidance: {
      contextLabel: "IT Act & Cyber Safety",
      summary:
        "Unauthorised UPI debits, OTP fraud, and online scams are covered under the IT Act, and banks are required to help you recover funds if you report quickly. Speed matters — most banks only guarantee zero-liability if you report within a short window.",
      rights: [
        { title: "Right to zero liability:", body: "If you report an unauthorised transaction promptly, you may not be liable for the loss under RBI guidelines." },
        { title: "Right to a formal complaint:", body: "You can file a complaint with your bank and with the National Cybercrime Reporting Portal." },
        { title: "Right to a paper trail:", body: "The bank must acknowledge your complaint and investigate it within a defined timeline." },
      ],
      nextSteps: [
        { title: "Report immediately:", body: "Call your bank's fraud helpline and freeze the affected account or card right away." },
        { title: "File a cyber complaint:", body: "Report the incident at cybercrime.gov.in or call the 1930 helpline." },
        { title: "Change your credentials:", body: "Update your passwords and UPI PIN, and check for any other suspicious activity." },
      ],
      learnMoreLabel: "Want to learn more? Understand cyber safety",
      sourceSummary: "Sources & references (IT Act & RBI guidelines)",
      sourceDetail: "Statutory baseline: Information Technology Act, 2000 & RBI's Limited Liability of Customers circular, 2017.",
    },
  },
  {
    keywords: ["rti", "ration", "aadhaar", "government", "certificate"],
    guidance: {
      contextLabel: "Right to Information Act & Citizen Charters",
      summary:
        "Citizens have a legal right to request information from government offices, and most public services are bound by published citizen charters with defined timelines for issuing certificates, ration cards, and other documents.",
      rights: [
        { title: "Right to information:", body: "You can file an RTI application to get information about the status of your request." },
        { title: "Right to timely service:", body: "Most public services have a maximum turnaround time defined in the citizen charter." },
        { title: "Right to escalate delays:", body: "You can approach the grievance officer or file an RTI if a request is delayed beyond the stated timeline." },
      ],
      nextSteps: [
        { title: "Check the citizen charter:", body: "Look up the expected timeline for your specific request on the department's website." },
        { title: "File a written follow-up:", body: "Submit a written query or grievance if the timeline has passed." },
        { title: "File an RTI if needed:", body: "An RTI application (₹10 fee) compels a written response within 30 days." },
      ],
      learnMoreLabel: "Want to learn more? Understand government service rights",
      sourceSummary: "Sources & references (RTI Act, 2005)",
      sourceDetail: "Statutory baseline: Right to Information Act, 2005 & respective state/department Citizen Charters.",
    },
  },
  {
    keywords: ["salary", "wage", "employer", "workplace", "pf", "gratuity", "termination"],
    guidance: {
      contextLabel: "Tenancy Frameworks & TPA",
      summary:
        "Not receiving your salary on time can raise employment-related legal concerns. In India, wages are legally protected, and the exact rules can depend on whether you are under a formal contract, appointment letter, or established work agreement.",
      rights: [
        { title: "Right to timely payment:", body: "Earned wages cannot be withheld arbitrarily without statutory justification or formal notice." },
        { title: "Right to written explanation:", body: "You may request an official statement or payslip explaining any delay or pending clearance." },
        { title: "Right to redressal:", body: "You can seek conciliation or file a claim through the appropriate local Labour Commissioner or authority if dues remain unpaid." },
      ],
      nextSteps: [
        { title: "Gather and safeguard records:", body: "Keep your offer letter, salary slips, attendance records, and bank statements together in one safe folder." },
        { title: "Request status in writing:", body: "Write a calm, formal email or message to HR requesting an update and a clear settlement date." },
        { title: "Preserve all communication:", body: "Archive email threads and responses carefully before taking any escalation step." },
      ],
      learnMoreLabel: "Want to learn more? Understand workplace rights",
      sourceSummary: "Sources & references (Payment of Wages Act & Industrial Relations Framework)",
      sourceDetail:
        "Statutory baseline: Section 5 & 15 of Payment of Wages Act, 1936 (timely wage disbursement and claims) • Model Shops & Establishments Acts as applicable by State jurisdiction.",
    },
  },
];

const DEFAULT_GUIDANCE = TOPIC_TEMPLATES[TOPIC_TEMPLATES.length - 1].guidance;

function matchGuidance(question: string): AdvisorGuidance {
  const lower = question.toLowerCase();
  for (const template of TOPIC_TEMPLATES) {
    if (template.keywords.some((k) => lower.includes(k))) {
      return template.guidance;
    }
  }
  return DEFAULT_GUIDANCE;
}

// ---------------------------------------------------------------------------
// Real backend integration
// ---------------------------------------------------------------------------

const ADVISOR_API_BASE: string =
  (import.meta.env.VITE_ADVISOR_API_BASE as string | undefined)?.replace(/\/$/, "") || "/api/advisor";

const USE_MOCK = import.meta.env.VITE_ADVISOR_USE_MOCK === "true";

/** The RAG pipeline makes several LLM calls; allow it time but never hang forever. */
const REQUEST_TIMEOUT_MS = 180_000;

const ANSWER_STATUSES = new Set(["SUPPORTED", "PARTIALLY_SUPPORTED"]);

const BLOCKED_MESSAGES: Record<string, string> = {
  NO_RELEVANT_SOURCE:
    "I couldn't find a sufficiently relevant verified legal source for this question, so I won't guess. Try describing your situation with more detail (what happened, where, and who was involved).",
  INSUFFICIENT_INFORMATION:
    "The verified sources I found don't contain enough information to answer this safely. Try adding more detail about your situation.",
  INVALID_INPUT: "Please describe your situation.",
};

export class AdvisorRequestError extends Error {}

function asText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(asText).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(asText).filter(Boolean).join(" — ");
  }
  return "";
}

function asTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return value ? [asText(value)].filter(Boolean) : [];
  return value.map(asText).filter(Boolean);
}

/** Strings become {title:"", body}; objects with title-like keys keep them. */
function asTitledList(value: unknown): AdvisorRight[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item): AdvisorRight => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const obj = item as Record<string, unknown>;
        const title = asText(obj.title ?? obj.right ?? obj.step ?? obj.name ?? "");
        const rest = { ...obj };
        delete rest.title; delete rest.right; delete rest.step; delete rest.name;
        return { title, body: asText(obj.body ?? obj.description ?? obj.detail ?? rest) };
      }
      return { title: "", body: asText(item) };
    })
    .filter((r) => r.title || r.body);
}

function toSources(value: unknown): AdvisorSource[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((s) => s && typeof s === "object")
    .map((s) => {
      const src = s as Record<string, unknown>;
      return {
        sourceFile: asText(src.source_file) || "Verified source",
        sections: asText(src.section_numbers),
        page: asText(src.page ?? src.pages) || undefined,
        chunkId: asText(src.chunk_id) || undefined,
        url: asText(src.url) || undefined,
        title: asText(src.document_title) || undefined,
        fileType: asText(src.file_type) || undefined,
        pageStart: typeof src.page_start === "number" ? src.page_start : undefined,
        pageEnd: typeof src.page_end === "number" ? src.page_end : undefined,
      };
    });
}

function describeSources(sources: AdvisorSource[]): { summary: string; detail: string } {
  if (sources.length === 0) {
    return { summary: "No sources returned", detail: "The backend did not return any source references." };
  }
  const files = Array.from(new Set(sources.map((s) => s.sourceFile.replace(/\.(pdf|docx?|txt|csv|xlsx)$/i, ""))));
  return {
    summary: `Sources & references (${files.join(", ")})`,
    detail: sources
      .map((s) => [s.sourceFile, s.sections && `Section(s) ${s.sections}`, s.page && `p. ${s.page}`].filter(Boolean).join(" · "))
      .join("\n"),
  };
}

/**
 * Adapter: Legal Advisor backend response -> AdvisorGuidance.
 * Exported so it can be unit-tested without a running backend.
 */
export function toGuidance(raw: unknown): AdvisorGuidance {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const status = asText(data.status).toUpperCase() || "UNKNOWN";
  const sources = toSources(data.sources);
  const { summary: sourceSummary, detail: sourceDetail } = describeSources(sources);
  const legalAreas = asTextList(data.legal_area);

  const base: AdvisorGuidance = {
    status,
    contextLabel: legalAreas.join(" · ") || "Legal guidance",
    summary: asText(data.situation),
    rights: asTitledList(data.rights),
    nextSteps: asTitledList(data.recommended_next_steps ?? data.next_steps),
    applicableLaw: Array.isArray(data.applicable_law)
      ? (data.applicable_law as unknown[]).map((law) => {
          if (law && typeof law === "object") {
            const l = law as Record<string, unknown>;
            const provision = asText(l.provision);
            return {
              title: [asText(l.law_name), provision && provision !== "Not specified in retrieved evidence" ? provision : ""]
                .filter(Boolean)
                .join(", "),
              body: [asText(l.explanation), asText(l.relevance)].filter(Boolean).join(" "),
            };
          }
          return { title: asText(law), body: "" };
        }).filter((l) => l.title || l.body)
      : [],
    responsibilities: asTextList(data.responsibilities),
    evidenceChecklist: asTextList(data.evidence_checklist ?? data.evidence),
    authorities: asTextList(data.authority),
    importantNote: asText(data.important_note),
    limitations: asTextList(data.limitations),
    learnMoreLabel: "",
    sources,
    sourceSummary,
    sourceDetail,
  };

  if (!ANSWER_STATUSES.has(status)) {
    const backendMessage = asText(data.error);
    const isError = !(status in BLOCKED_MESSAGES);
    base.notice = {
      kind: isError ? "error" : "blocked",
      message: isError
        ? `The Legal Advisor could not complete this request (${status}).${backendMessage ? " " + backendMessage : ""} Please try again.`
        : BLOCKED_MESSAGES[status],
    };
  }

  return base;
}

export async function askCivicAdvisor(question: string): Promise<AdvisorGuidance> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return matchGuidance(question);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${ADVISOR_API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: question }),
      signal: controller.signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new AdvisorRequestError("The Legal Advisor took too long to respond. Please try again.");
    }
    throw new AdvisorRequestError(
      "Couldn't reach the Legal Advisor service. Make sure the Legal Advisor backend is running (port 8001).",
    );
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 502 || response.status === 503 || response.status === 504) {
    throw new AdvisorRequestError(
      "The Legal Advisor service is not available right now. Make sure the Legal Advisor backend is running (port 8001), then try again.",
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = asText((body as Record<string, unknown>)?.detail);
    } catch {
      /* non-JSON error body */
    }
    throw new AdvisorRequestError(
      `The Legal Advisor returned an error (HTTP ${response.status}).${detail ? " " + detail : ""}`,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new AdvisorRequestError("The Legal Advisor returned a response that could not be read.");
  }
  return toGuidance(payload);
}

/** Guidance object used to show a request failure inside the chat. */
export function errorGuidance(message: string): AdvisorGuidance {
  return {
    status: "REQUEST_ERROR",
    contextLabel: "Legal Advisor",
    summary: "",
    rights: [],
    nextSteps: [],
    learnMoreLabel: "",
    sourceSummary: "",
    sourceDetail: "",
    notice: { kind: "error", message },
  };
}

export const topicToQuestion: Record<string, string> = {
  "police-fir": "How do I file an FIR and what if the police refuse?",
  "consumer-rights": "What are my consumer rights if a seller refuses a refund?",
  "cyber-safety": "Someone made an unauthorised UPI transaction from my account.",
  workplace: "My employer hasn't paid my salary for two months. What can I do?",
  "rent-property": "My landlord is refusing to return my security deposit.",
  "govt-services": "My RTI request has been pending for a long time, what can I do?",
};
