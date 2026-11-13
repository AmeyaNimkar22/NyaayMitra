/**
 * CIVIC ADVISOR SERVICE — MOCK IMPLEMENTATION
 * --------------------------------------------
 * There is no real RAG pipeline, LLM, or vector database wired up in this
 * project yet. This file exists so the UI has one clean seam to call
 * through, instead of components inventing guidance content themselves.
 *
 * When a real backend exists, replace the body of `askCivicAdvisor` with
 * a fetch() to something like `POST /api/advisor/ask`, keep the
 * `AdvisorGuidance` shape (or update it and `GuidanceResponse.tsx`
 * together), and nothing else in the UI needs to change.
 */

export interface AdvisorRight {
  title: string;
  body: string;
}

export interface AdvisorStep {
  title: string;
  body: string;
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

/** Simulates a RAG-backed civic advisor call. Replace with a real API call later. */
export async function askCivicAdvisor(question: string): Promise<AdvisorGuidance> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return matchGuidance(question);
}

export const topicToQuestion: Record<string, string> = {
  "police-fir": "How do I file an FIR and what if the police refuse?",
  "consumer-rights": "What are my consumer rights if a seller refuses a refund?",
  "cyber-safety": "Someone made an unauthorised UPI transaction from my account.",
  workplace: "My employer hasn't paid my salary for two months. What can I do?",
  "rent-property": "My landlord is refusing to return my security deposit.",
  "govt-services": "My RTI request has been pending for a long time, what can I do?",
};
