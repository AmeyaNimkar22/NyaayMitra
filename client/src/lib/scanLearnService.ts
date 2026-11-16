/**
 * SCAN & LEARN SERVICE
 * --------------------
 * `identifyPlace` uploads the photo to the Scan & Learn backend
 * (backend/main.py, FastAPI `POST /ocr`): PaddleOCR reads any signboard text,
 * a keyword classifier or the MobileNet image model picks the place type,
 * and the matching civic guidance is fetched from MongoDB (CivicGuidesDB.civic_knowledge).
 * `toPlaceGuide` adapts that response to the `PlaceGuide` shape the UI renders.
 *
 * - Base URL: `VITE_SCAN_API_BASE` (default "/api/scan", proxied by Vite to port 8000).
 * - The original fixed demo guide is kept and used ONLY when
 *   `VITE_SCAN_USE_MOCK=true` is set explicitly; it is never a silent fallback.
 */

export interface PlaceGuide {
  placeName: string;
  placeSubtitle: string;
  contextLabel: string;
  headline: string;
  intro: string;
  rights: { title: string; body: string }[];
  whatYouCanDo: { title: string; body: string }[];
  thingsToAvoid: string[];
  footnote: string;

  // ---- Optional fields filled in by the real backend ----
  sourceName?: string;
  sourceUrl?: string;
  authority?: string;
  verifiedDate?: string;
  /** "OCR" (signboard text) or "Image AI" (MobileNet). */
  method?: string;
  /** MobileNet confidence in percent, when the image model was used. */
  confidence?: number;
  detectedText?: string;
  /** Backend classification, shown as-is in the result card. */
  domain?: string;
  topic?: string;
  imageClass?: string;
  legalBasisType?: string;
  /** Civic information record (title + description) from MongoDB. */
  infoTitle?: string;
  infoDescription?: string;
  /** Name of the uploaded file, as echoed by the backend. */
  filename?: string;
  /** Set when no guidance could be shown (error, or nothing stored for this place). */
  notice?: { kind: "missing" | "error"; message: string };
}

const POLICE_STATION_GUIDE: PlaceGuide = {
  placeName: "District Police Station & Help Desk",
  placeSubtitle: "Public Law Enforcement Facility",
  contextLabel: "Instant Contextual Guide",
  headline: "What you should know at a Police Station",
  intro:
    "Indian citizens hold clear procedural safeguards guaranteed under the Bharatiya Nagarik Suraksha Sanhita (BNSS) and constitutional conventions.",
  rights: [
    {
      title: "Free copy of the FIR:",
      body: "You have the right to receive a signed, free copy of any First Information Report registered.",
    },
    {
      title: "Filing a Zero FIR:",
      body: "For cognizable offences, you can register a Zero FIR at any station, regardless of jurisdiction.",
    },
    {
      title: "Special protections for women:",
      body: "Questioning must happen in the presence of a female officer or guardian, and generally only between sunrise and sunset.",
    },
  ],
  whatYouCanDo: [
    { title: "Document facts", body: "Keep clear, chronological notes and valid government ID with you." },
    { title: "Seek clarification", body: "Politely ask for the General Diary (GD) entry number for your records." },
    { title: "Get official receipts", body: "Always ask for a stamped receiving slip for any complaint you file." },
  ],
  thingsToAvoid: [
    "Never sign unverified or blank documents without reading them carefully.",
    "Do not agree to informal, unofficial monetary settlements on the premises.",
  ],
  footnote:
    "Guidelines can vary slightly by State Police Acts. These safeguards reflect baseline constitutional protections.",
};

// ---------------------------------------------------------------------------
// Real backend integration
// ---------------------------------------------------------------------------

const SCAN_API_BASE: string =
  (import.meta.env.VITE_SCAN_API_BASE as string | undefined)?.replace(/\/$/, "") || "/api/scan";

const USE_MOCK = import.meta.env.VITE_SCAN_USE_MOCK === "true";

/** OCR + image model can be slow on the first request (models warming up). */
const REQUEST_TIMEOUT_MS = 120_000;

/** Friendly place names for the backend's domains (backend/classifier.py, main.py). */
const PLACE_NAMES: Record<string, string> = {
  Healthcare: "Hospital / Healthcare Facility",
  Banking: "Bank",
  Police: "Police Station",
  Consumer: "Shop / Consumer Outlet",
  Railways: "Railway Station",
  "Road Traffic": "Road & Traffic",
  "Religious Places": "Religious Place",
  "Public Space": "Public Space",
};

export class ScanRequestError extends Error {}

function text(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function textList(value: unknown): string[] {
  if (!Array.isArray(value)) return text(value) ? [text(value)] : [];
  return value.map(text).filter(Boolean);
}

/**
 * Adapter: Scan & Learn backend response -> PlaceGuide.
 * Exported so it can be unit-tested without a running backend.
 */
export function toPlaceGuide(raw: unknown): PlaceGuide {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const classification = (data.classification && typeof data.classification === "object"
    ? data.classification
    : {}) as Record<string, unknown>;
  const info = (data.civic_info && typeof data.civic_info === "object" ? data.civic_info : null) as
    | Record<string, unknown>
    | null;

  const domain = text(classification.domain) || "Unknown";
  const topic = text(classification.topic);
  const method = text(data.classification_method);
  const confidenceRaw = Number(classification.confidence);
  const confidence = Number.isFinite(confidenceRaw) ? confidenceRaw : undefined;

  const contextLabel =
    method === "OCR"
      ? "Identified from signboard text"
      : method
        ? `Identified from the photo${confidence !== undefined ? ` (${Math.round(confidence)}% confidence)` : ""}`
        : "Instant Contextual Guide";

  const friendlyName = PLACE_NAMES[domain] ?? domain;
  const base: PlaceGuide = {
    // Shown on the photo overlay as "Backend classification / <domain> - <topic>"
    placeName: topic ? `${domain} - ${topic}` : domain,
    placeSubtitle: "Backend classification",
    contextLabel,
    headline: topic ? `What you should know: ${topic}` : "What you should know",
    intro: "",
    rights: [],
    whatYouCanDo: [],
    thingsToAvoid: [],
    footnote: "",
    method: method || undefined,
    confidence,
    detectedText: text(data.text) || undefined,
    domain,
    topic: topic || undefined,
    imageClass: text(classification.image_class) || undefined,
    filename: text(data.filename) || undefined,
  };

  if (!info) {
    base.notice = {
      kind: "missing",
      message:
        domain === "Unknown"
          ? "We couldn't recognise this place. Try a clearer photo that shows the building or its signboard."
          : `Identified as: ${friendlyName}. No civic guidance is stored for "${topic || domain}" yet.`,
    };
    return base;
  }

  const title = text(info.title);
  const description = text(info.description);
  const sourceName = text(info.source_name);
  const authority = text(info.authority);
  const verifiedDate = text(info.verified_date);

  return {
    ...base,
    headline: title || base.headline,
    intro: sourceName
      ? `Based on the ${sourceName}${authority ? ` (${authority})` : ""}.`
      : authority
        ? `Issued by ${authority}.`
        : "",
    rights: title || description ? [{ title: title ? `${title}:` : "", body: description }] : [],
    whatYouCanDo: textList(info.what_you_can_do).map((body) => ({ title: "", body })),
    thingsToAvoid: textList(info.donts ?? info.things_to_avoid),
    footnote: [
      sourceName && `Source: ${sourceName}`,
      authority && authority !== sourceName ? authority : "",
      verifiedDate && `verified ${verifiedDate}`,
    ]
      .filter(Boolean)
      .join(" · "),
    sourceName: sourceName || undefined,
    sourceUrl: text(info.source_url) || undefined,
    authority: authority || undefined,
    verifiedDate: verifiedDate || undefined,
    legalBasisType: text(info.legal_basis_type) || undefined,
    infoTitle: title || undefined,
    infoDescription: description || undefined,
  };
}

export async function identifyPlace(image: File): Promise<PlaceGuide> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    return POLICE_STATION_GUIDE;
  }

  const form = new FormData();
  form.append("file", image, image.name || "photo.jpg");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${SCAN_API_BASE}/ocr`, { method: "POST", body: form, signal: controller.signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new ScanRequestError("Scanning took too long. Please try again.");
    }
    throw new ScanRequestError(
      "Couldn't reach the Scan & Learn service. Make sure the Scan & Learn backend is running (port 8000).",
    );
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 502 || response.status === 503 || response.status === 504) {
    throw new ScanRequestError(
      "The Scan & Learn service is not available right now. Make sure its backend is running (port 8000), then try again.",
    );
  }
  if (!response.ok) {
    throw new ScanRequestError(
      `The Scan & Learn service returned an error (HTTP ${response.status}). If this keeps happening, check the backend terminal — a database connection problem is the most common cause.`,
    );
  }

  try {
    return toPlaceGuide(await response.json());
  } catch {
    throw new ScanRequestError("The Scan & Learn service returned a response that could not be read.");
  }
}

/** Guide object used to show a failure in the result panel. */
export function errorPlaceGuide(message: string): PlaceGuide {
  return {
    placeName: "Could not identify",
    placeSubtitle: "",
    contextLabel: "Scan & Learn",
    headline: "Something went wrong",
    intro: "",
    rights: [],
    whatYouCanDo: [],
    thingsToAvoid: [],
    footnote: "",
    notice: { kind: "error", message },
  };
}

export interface PublicPlaceCategory {
  key: string;
  tag: string;
  title: string;
  description: string;
}

export const publicPlaceCategories: PublicPlaceCategory[] = [
  { key: "govt-office", tag: "Administration", title: "Government Offices", description: "Government departments and public administrative offices." },
  { key: "police-station", tag: "Public Safety", title: "Police Stations", description: "Police stations and citizen assistance counters." },
  { key: "hospital", tag: "Healthcare", title: "Hospitals", description: "Public hospitals and healthcare facilities." },
  { key: "transport", tag: "Transportation", title: "Transport Facilities", description: "Bus stations, railway stations and transport offices." },
  { key: "bank", tag: "Financial Services", title: "Banks", description: "Bank branches and public banking service counters." },
  { key: "service-center", tag: "Citizen Services", title: "Service Centers", description: "Public service centers and citizen help desks." },
  { key: "school", tag: "Education", title: "Educational Institutions", description: "Schools and other educational institutions." },
  { key: "traffic", tag: "Road Safety", title: "Traffic & Roads", description: "Traffic signs, road regulations and public traffic facilities." },
];
