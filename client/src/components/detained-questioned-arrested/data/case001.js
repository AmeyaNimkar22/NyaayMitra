
const case001 = [
  {
    title: "The Unexpected Stop",
    location: "A city street · 8:45 PM",
    scene:
      "You are walking home when two police officers approach you. They tell you that a phone-snatching incident happened nearby.",
    dialogue:
      "Officer: We need to ask you a few questions. You were seen near the location. Come here for a moment.",
    question: "How do you respond?",
    choices: [
      {
        id: "A",
        text: "Politely ask whether I am free to leave or being detained.",
        response:
          "The officer explains that they want to ask you about the incident. You have calmly clarified your situation before deciding what to do.",
        feedback:
          "A sensible first step. Asking about your status helps you understand whether this is a voluntary conversation or whether the police are exercising a legal power. The answer depends on the circumstances."
      },
      {
        id: "B",
        text: "Immediately walk away without saying anything.",
        response:
          "The officer calls you back and asks you to cooperate. The situation becomes tense.",
        feedback:
          "Walking away may not be appropriate if the police are exercising a lawful power. You should first clarify why you are being stopped. You do not have an unlimited right to ignore a lawful direction."
      },
      {
        id: "C",
        text: "Assume I am under arrest and start arguing.",
        response:
          "The officer tells you that you have not been informed of any arrest and asks you to remain calm.",
        feedback:
          "Being approached or questioned does not automatically mean you have been arrested. Ask clearly whether you are under arrest and the reason for it."
      }
    ],
    legalInsight: {
      heading: "Being stopped is not automatically an arrest",
      explanation:
        "Police questioning, detention and arrest are different situations. Police may arrest without a warrant only in circumstances permitted by law. Section 35 of the BNSS, 2023 specifies when such an arrest is permitted.",
      law: "BNSS, 2023 – Section 35",
      source:
        "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
    }
  },

  {
    title: "The Request to Visit the Station",
    location: "The same street · A few minutes later",
    scene:
      "The officer says that you may have seen something important and asks you to come to the police station.",
    dialogue:
      "Officer: It will only take a few minutes. Come to the station and answer some questions.",
    question: "What would you do?",
    choices: [
      {
        id: "A",
        text: "Ask whether my presence is voluntary or whether I am being formally required to attend.",
        response:
          "The officer explains that you may be a witness and says they can issue a written notice if your attendance is required under the law.",
        feedback:
          "Good approach. You are clarifying the legal basis instead of assuming that every request to visit a police station is an arrest."
      },
      {
        id: "B",
        text: "Ask for the written order or notice if my attendance is being formally required.",
        response:
          "The officer explains the process for requiring a witness to attend during an investigation.",
        feedback:
          "This is important. Under Section 179 of the BNSS, an investigating police officer may require certain witnesses to attend by an order in writing. This provision has specific safeguards and exceptions."
      },
      {
        id: "C",
        text: "Refuse every request from the police because I have done nothing wrong.",
        response:
          "The officer explains that a person who is lawfully required to attend as a witness cannot simply ignore the requirement.",
        feedback:
          "Being innocent does not mean every lawful investigative request can be ignored. Understand whether the request is voluntary or a lawful written requirement."
      }
    ],
    legalInsight: {
      heading: "A witness can be required to attend",
      explanation:
        "Section 179 of the BNSS allows an investigating police officer to require a person acquainted with the facts of a case to attend through an order in writing. The section also provides special protections for specified persons, including women and certain age and health categories.",
      law: "BNSS, 2023 – Section 179",
      source:
        "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
    }
  },

  {
    title: "The Questioning",
    location: "Police station · 9:30 PM",
    scene:
      "You are at the police station. An investigating officer begins asking questions about what you saw.",
    dialogue:
      "Officer: Tell me where you were at 8:30 PM. Did you see anyone running away? Were you involved in taking the phone?",
    question: "How should you respond?",
    choices: [
      {
        id: "A",
        text: "Answer questions truthfully based on what I actually know.",
        response:
          "You explain only what you personally saw and avoid guessing or inventing details.",
        feedback:
          "Good. A person examined as a witness must answer truthfully, subject to the legal protection for questions whose answers may expose them to a criminal charge, penalty or forfeiture."
      },
      {
        id: "B",
        text: "Make up an answer so the officer stops questioning me.",
        response:
          "The officer notices inconsistencies and asks you to clarify your statement.",
        feedback:
          "Inventing facts can create serious problems. Do not lie or guess. Explain honestly when you do not know or remember something."
      },
      {
        id: "C",
        text: "Ask whether I must answer a question that could expose me to a criminal charge.",
        response:
          "The officer is reminded that the law provides protection against compelled answers that may expose a person to a criminal charge, penalty or forfeiture.",
        feedback:
          "Important distinction: Section 180(2) of the BNSS contains this protection for a person examined by police. Article 20(3) of the Constitution separately protects an accused person against being compelled to be a witness against themselves."
      }
    ],
    legalInsight: {
      heading: "You are not required to incriminate yourself",
      explanation:
        "Under Section 180(2) of the BNSS, a person examined by police must answer questions relating to the case truthfully, except questions whose answers would tend to expose that person to a criminal charge, penalty or forfeiture. Article 20(3) protects an accused person from compelled self-incrimination.",
      law: "BNSS, 2023 – Section 180(2); Constitution of India – Article 20(3)",
      source:
        "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
    }
  },

  {
    title: "The Arrest",
    location: "Police station · 10:15 PM",
    scene:
      "The officer returns and tells you that the investigation has led to a decision to arrest you in connection with the incident.",
    dialogue:
      "Officer: You are under arrest. We need to take you into custody.",
    question: "What should you do now?",
    choices: [
      {
        id: "A",
        text: "Ask for the grounds of arrest and request access to a lawyer.",
        response:
          "You ask the officer to explain the grounds for your arrest and state that you want to consult a lawyer.",
        feedback:
          "Correct approach. An arrested person has constitutional protections, including being informed of the grounds of arrest and the right to consult and be defended by a lawyer of their choice."
      },
      {
        id: "B",
        text: "Assume the police can keep me at the station for as long as they want.",
        response:
          "You learn that police custody is subject to legal and constitutional limits.",
        feedback:
          "Incorrect. Article 22(2) of the Constitution generally requires an arrested and detained person to be produced before the nearest magistrate within 24 hours, excluding necessary journey time."
      },
      {
        id: "C",
        text: "Sign every document immediately without reading it.",
        response:
          "The officer hands you documents. You realise that you should understand what a document contains before signing it.",
        feedback:
          "Do not sign blank or unexplained documents. Ask to read and understand documents and seek legal advice where necessary."
      }
    ],
    legalInsight: {
      heading: "Know your rights after arrest",
      explanation:
        "Article 22(1) protects the right to be informed of the grounds of arrest and to consult and be defended by a lawyer of your choice. Article 22(2) generally requires production before a magistrate within 24 hours, excluding necessary journey time.",
      law: "Constitution of India – Article 22(1) and 22(2)",
      source:
        "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
    }
  }
];

export default case001;
