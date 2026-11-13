/**
 * SCAN & LEARN SERVICE — MOCK IMPLEMENTATION
 * -------------------------------------------
 * There is no real image-recognition or vision AI backend in this project
 * yet. `identifyPlace` simulates what a future endpoint would return —
 * a place type match plus its civic guidance — using a fixed delay
 * instead of an actual model call.
 *
 * When a real backend exists, replace the body of `identifyPlace` with a
 * fetch() that uploads the image and returns a real prediction. Keep the
 * `PlaceGuide` shape (or update it and the components that render it
 * together) and the rest of the UI stays unchanged.
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

export async function identifyPlace(_image: File): Promise<PlaceGuide> {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  // Mock: always resolves to the same example guide for now.
  return POLICE_STATION_GUIDE;
}

export interface PublicPlaceCategory {
  key: string;
  tag: string;
  title: string;
  description: string;
}

export const publicPlaceCategories: PublicPlaceCategory[] = [
  { key: "govt-office", tag: "Civil Admin", title: "Government Offices", description: "Application timelines, fee charts, and Citizen Charters." },
  { key: "police-station", tag: "Public Safety", title: "Police Stations", description: "Zero FIR protocols, bail notice parameters, and detention limits." },
  { key: "hospital", tag: "Healthcare", title: "Public Hospitals", description: "Mandatory emergency care, free generic drug lists, and patient rights." },
  { key: "transport", tag: "Transit", title: "Public Transport", description: "Passenger baggage rules, refund rights, and dispute lodgement." },
  { key: "bank", tag: "Finance", title: "Banks & Post Offices", description: "RBI Ombudsman rights, zero-balance norms, and senior counters." },
  { key: "service-center", tag: "Services", title: "Public Service Centers", description: "Government-capped service charges for CSCs and Aadhaar centers." },
  { key: "school", tag: "Education", title: "Schools & Institutes", description: "RTE 25% quota provisions, fee transparency, and anti-ragging." },
  { key: "traffic", tag: "Mobility", title: "Traffic Checkpoints", description: "e-Challan validation, digital DigiLocker licenses, and officer ranks." },
];
