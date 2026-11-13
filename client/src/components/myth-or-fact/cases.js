
const cases = [
  {
    id: 1,
    statement: "Police cannot arrest a person without a warrant.",
    answer: "MYTH",
    explanation:
      "Police can arrest without a warrant in specified circumstances. Section 35 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) permits this subject to legal conditions. For certain cognizable offences punishable with up to seven years, the officer must have reason to believe that the person committed the offence and must be satisfied that arrest is necessary for one of the reasons specified in the section. The reasons must be recorded in writing. Police do not have unlimited power to arrest.",
    section:
      "BNSS, 2023 – Section 35: When police may arrest without warrant",
    sourceName: "India Code – Bharatiya Nagarik Suraksha Sanhita, 2023",
    sourceUrl:
      "https://www.indiacode.nic.in/bitstream/123456789/21544/1/the_bharatiya_nagarik_suraksha_sanhita%2C_2023.pdf",
  },
  {
    id: 2,
    statement:
      "A husband automatically becomes the owner of jewellery gifted to his wife at marriage.",
    answer: "MYTH",
    explanation:
      "Jewellery and other gifts given to a woman as her stridhan are her property. Marriage does not automatically transfer ownership to her husband. In Maya Gopinathan v. Anoop S.B. (2024), the Supreme Court reaffirmed the woman's rights over her stridhan. Section 14 of the Hindu Succession Act, 1956 also addresses the absolute ownership of property possessed by a female Hindu, within the scope of that Act.",
    section:
      "Supreme Court – Maya Gopinathan v. Anoop S.B. (2024); Hindu Succession Act, 1956 – Section 14",
    sourceName: "Supreme Court of India – Judgment",
    sourceUrl:
      "https://api.sci.gov.in/supremecourt/2022/22430/22430_2022_2_1501_52614_Judgement_24-Apr-2024.pdf",
  },
  {
    id: 3,
    statement: "A verbal agreement can never be legally enforceable.",
    answer: "MYTH",
    explanation:
      "An agreement does not become invalid merely because it was made orally. Sections 9 and 10 of the Indian Contract Act, 1872 recognise express and implied promises and explain when agreements become contracts. A valid contract generally requires free consent, competent parties, lawful consideration and a lawful object. However, certain transactions must be in writing, registered or completed with other legal formalities. Proving the terms of an oral agreement may also be difficult.",
    section: "Indian Contract Act, 1872 – Sections 9 and 10",
    sourceName: "India Code – Indian Contract Act, 1872",
    sourceUrl:
      "https://www.indiacode.nic.in/handle/123456789/2187",
  },
  {
    id: 4,
    statement:
      "A person can only be held legally responsible if they have signed a contract.",
    answer: "MYTH",
    explanation:
      "A signature is not necessary for every type of legal liability. For example, a person may face a negligence claim even when there is no contract between the parties. Negligence generally involves a duty of care, breach of that duty and resulting damage. Whether liability exists depends on the facts and whether the legal requirements are established.",
    section:
      "Civil liability – Principles of negligence and tort law",
    sourceName: "Supreme Court of India – Judgment on negligence",
    sourceUrl:
      "https://api.sci.gov.in/supremecourt/2015/20639/20639_2015_Judgement_15-Mar-2019.pdf",
  },
  {
    id: 5,
    statement:
      "A slap or other minor act causing bodily pain can never have legal consequences.",
    answer: "MYTH",
    explanation:
      "Under Section 114 of the Bharatiya Nyaya Sanhita, 2023 (BNS), causing bodily pain, disease or infirmity amounts to causing hurt. Section 115 explains when hurt is voluntarily caused. Under Section 115(2), punishment may extend to one year of imprisonment, a fine up to ₹10,000, or both, subject to the section's conditions and exceptions. The legal outcome depends on the facts of the incident.",
    section:
      "BNS, 2023 – Sections 114 and 115: Hurt and voluntarily causing hurt",
    sourceName: "India Code – Bharatiya Nyaya Sanhita, 2023",
    sourceUrl:
      "https://www.indiacode.nic.in/bitstream/123456789/20062/1/a2023-45.pdf",
  },
];

export default cases;
