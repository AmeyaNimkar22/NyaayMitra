
const quizBundles = [
  {
    id: "emergency-numbers",
    title: "Emergency Numbers & Helplines",
    description:
      "Learn important emergency numbers and support services in India.",

    questions: [
      {
        question:
          "You witness a serious accident and someone needs immediate police, fire or medical assistance. Which number should you call?",
        options: ["100", "112", "1915", "1098"],
        correctAnswer: "112",
        explanation:
          "112 is India's unified Emergency Response Support System number for emergencies involving police, fire, health and other emergency services.",
      },
      {
        question:
          "Someone has transferred money to a fraudster after receiving a fake banking call. Which number should they call immediately to report the financial cyber fraud?",
        options: ["1098", "181", "1930", "14416"],
        correctAnswer: "1930",
        explanation:
          "1930 is the national helpline for reporting financial cyber fraud. The incident should also be reported through the National Cyber Crime Reporting Portal.",
      },
      {
        question:
          "You find a child who appears to be abandoned or in need of protection. Which helpline should you contact?",
        options: ["1098", "1915", "1906", "139"],
        correctAnswer: "1098",
        explanation:
          "1098 is the Child Helpline operated under Mission Vatsalya. It provides assistance to children in crisis and is integrated with emergency response services.",
      },
      {
        question:
          "A woman experiencing violence or distress needs support and information about available assistance. Which helpline can she contact?",
        options: ["14416", "181", "1930", "102"],
        correctAnswer: "181",
        explanation:
          "181 is the Women Helpline. It provides emergency and non-emergency support and can connect women with appropriate services.",
      },
      {
        question:
          "You purchased a defective product and want to register a consumer grievance. Which number should you contact?",
        options: ["112", "1098", "1915", "101"],
        correctAnswer: "1915",
        explanation:
          "1915 is the National Consumer Helpline number. Consumers can use it to seek assistance with grievances against sellers or service providers.",
      },
      {
        question:
          "A person is experiencing emotional distress and wants to speak with a trained mental health counsellor. Which number can they call?",
        options: ["14416", "1930", "139", "1906"],
        correctAnswer: "14416",
        explanation:
          "14416 is the Tele-MANAS mental health support helpline. It provides free mental health counselling and support across India, 24 hours a day.",
      },
      {
        question:
          "Someone needs ambulance assistance. Which number is listed for the National Ambulance Service on the Government of India's helpline directory?",
        options: ["101", "102", "181", "1915"],
        correctAnswer: "102",
        explanation:
          "102 is listed for the National Ambulance Service. For an immediate emergency requiring coordinated assistance, you can also call the unified emergency number 112.",
      },
      {
        question:
          "A fire breaks out in a nearby building. Which traditional fire emergency number is listed on the Government of India's helpline directory?",
        options: ["101", "1098", "14416", "1930"],
        correctAnswer: "101",
        explanation:
          "101 is the fire helpline listed in the Government of India's national helpline directory. You can also call 112 for integrated emergency assistance.",
      },
      {
        question:
          "You suspect an LPG gas leak at home. Which dedicated helpline number should you contact?",
        options: ["1906", "1915", "139", "181"],
        correctAnswer: "1906",
        explanation:
          "1906 is the dedicated LPG leakage helpline listed in the Government of India's national helpline directory.",
      },
      {
        question:
          "A passenger travelling by train needs security-related assistance because they are facing a safety concern. Which railway helpline should they contact?",
        options: ["1098", "139", "1930", "102"],
        correctAnswer: "139",
        explanation:
          "139 is the Indian Railways helpline for passenger assistance, including security-related assistance for passengers in distress. It is integrated with emergency response number 112.",
      },
    ],
  },

  {
    id: "cyber-safety",
    title: "Cyber Safety & Digital Rights",
    description:
      "Test your knowledge of online safety, cybercrime and digital rights.",
    questions: [
  {
    question: "You receive a message claiming your bank account will be blocked unless you click a link and update your details. What should you do?",
    options: [
      "Click the link immediately",
      "Reply with your account details",
      "Avoid the link and contact your bank through its official channel",
      "Forward the message to friends"
    ],
    correctAnswer: "Avoid the link and contact your bank through its official channel",
    explanation: "This may be a phishing attempt. Never enter banking details through suspicious links. Use your bank's official app, website or verified contact details.",
    source: "https://www.cert-in.org.in/s2cMainServlet?CACODE=CICA-2022-3113&pageid=PUBADV01"
  },
  {
    question: "A caller says they are from your bank and asks you to share the OTP sent to your phone. What should you do?",
    options: [
      "Share it if the caller knows your name",
      "Share only the first few digits",
      "Do not share the OTP with anyone",
      "Send it by text message"
    ],
    correctAnswer: "Do not share the OTP with anyone",
    explanation: "An OTP is confidential. CERT-In advises users not to share OTPs, passwords or sensitive financial information with callers.",
    source: "https://www.cert-in.org.in/s2cMainServlet?CACODE=CICA-2022-3113&pageid=PUBADV01"
  },
  {
    question: "Someone sends you a QR code and says you must scan it and enter your UPI PIN to receive a prize. What is the safest response?",
    options: [
      "Scan it and enter your PIN",
      "Enter your PIN only if the prize is large",
      "Do not scan it or enter your PIN to receive money",
      "Share the QR code with someone else"
    ],
    correctAnswer: "Do not scan it or enter your PIN to receive money",
    explanation: "Entering a UPI PIN authorises a payment; it is not required to receive money. Be cautious of QR codes sent by unknown people.",
    source: "https://www.npci.org.in/fraud-awareness"
  },
  {
    question: "You accidentally transfer money to a fraudster through an online payment. What should you do first?",
    options: [
      "Wait for the fraudster to return it",
      "Immediately call 1930 and report it on the National Cyber Crime Reporting Portal",
      "Delete the payment app",
      "Post your UPI PIN online"
    ],
    correctAnswer: "Immediately call 1930 and report it on the National Cyber Crime Reporting Portal",
    explanation: "1930 is the helpline for reporting financial cyber fraud. Report the incident as quickly as possible and submit the complaint through https://cybercrime.gov.in.",
    source: "https://www.cybercrime.gov.in/"
  },
  {
    question: "You receive an email attachment from an unknown sender. What should you do?",
    options: [
      "Open it to see what it contains",
      "Download it on every device",
      "Avoid opening suspicious attachments",
      "Forward it to your contacts"
    ],
    correctAnswer: "Avoid opening suspicious attachments",
    explanation: "Unexpected attachments may contain malware or links to harmful websites. Verify the sender before opening files.",
    source: "https://www.cert-in.org.in/s2cMainServlet?CACODE=CICA-2022-3113&pageid=PUBADV01"
  },
  {
    question: "Which password practice provides better protection for your online accounts?",
    options: [
      "Use the same password everywhere",
      "Use your date of birth",
      "Use strong, unique passwords for different accounts",
      "Share your password with a friend"
    ],
    correctAnswer: "Use strong, unique passwords for different accounts",
    explanation: "Strong and unique passwords reduce the risk that one compromised account will expose your other accounts. Multi-factor authentication adds another layer of protection.",
    source: "https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2025-0019&pageid=PUBVLNOTES02"
  },
  {
    question: "You receive a video call from someone pretending to be a police officer and threatening immediate arrest unless you transfer money. What should you do?",
    options: [
      "Transfer the money to avoid trouble",
      "Share your bank details",
      "Do not transfer money and report the suspected cybercrime",
      "Install an app they send you"
    ],
    correctAnswer: "Do not transfer money and report the suspected cybercrime",
    explanation: "Threats and demands for money through impersonation may be part of a digital arrest scam. Do not make payments or install unknown apps. Report cybercrime through the official portal or 1930 for financial fraud.",
    source: "https://cybercrime.gov.in/"
  },
  {
    question: "You want to report an online account that is impersonating you and using your photographs. Where can you report this cybercrime?",
    options: [
      "National Cyber Crime Reporting Portal",
      "National Consumer Helpline only",
      "Railway enquiry",
      "Passport Seva"
    ],
    correctAnswer: "National Cyber Crime Reporting Portal",
    explanation: "The National Cyber Crime Reporting Portal allows people to report different types of cybercrime, including incidents involving online impersonation.",
    source: "https://cybercrime.gov.in/"
  },
  {
    question: "A stranger asks you to install a screen-sharing app so they can help you receive a refund. What should you do?",
    options: [
      "Install it and give access",
      "Share your banking screen",
      "Refuse and contact the company through its official channel",
      "Give them your UPI PIN"
    ],
    correctAnswer: "Refuse and contact the company through its official channel",
    explanation: "Unknown people may misuse remote-access or screen-sharing apps to view sensitive information or manipulate transactions. Never give an unverified person access to your device.",
    source: "https://www.npci.org.in/fraud-awareness"
  },
  {
    question: "You discover that someone has accessed your online account without permission. What is a sensible first response?",
    options: [
      "Ignore the activity",
      "Secure the account by changing its password and enabling multi-factor authentication",
      "Share your new password publicly",
      "Delete all your other accounts"
    ],
    correctAnswer: "Secure the account by changing its password and enabling multi-factor authentication",
    explanation: "Change the compromised password, use a unique password, enable multi-factor authentication where available, and review account activity and recovery details.",
    source: "https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2025-0019&pageid=PUBVLNOTES02"
  }
],
  },

  {
    id: "police-rights",
    title: "Know Your Police Rights",
    description:
      "Understand your rights during police encounters, questioning and arrest.",
    questions: [
  {
    question: "A police officer arrests a person without a warrant. What must the officer communicate to that person?",
    options: [
      "Only the police station's address",
      "The full particulars of the offence or grounds for arrest",
      "The names of all witnesses",
      "The final court judgment"
    ],
    correctAnswer: "The full particulars of the offence or grounds for arrest",
    explanation: "Section 47 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 requires the person arrested without a warrant to be informed of the full particulars of the offence or other grounds for arrest.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "A person is arrested and wants to consult a lawyer during police interrogation. What does the law provide?",
    options: [
      "They can never consult a lawyer",
      "They may meet an advocate of their choice during interrogation, though not throughout it",
      "They can consult only a police officer",
      "They must wait until the trial ends"
    ],
    correctAnswer: "They may meet an advocate of their choice during interrogation, though not throughout it",
    explanation: "Section 38 of the BNSS provides an arrested person the right to meet an advocate of their choice during interrogation, though not throughout the interrogation.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "After arresting someone, what must the police do regarding a relative or friend nominated by that person?",
    options: [
      "Keep the arrest secret",
      "Inform the nominated relative or friend about the arrest and place of custody",
      "Inform only the person's employer",
      "Wait until the person is released"
    ],
    correctAnswer: "Inform the nominated relative or friend about the arrest and place of custody",
    explanation: "Section 48 of the BNSS requires the person making the arrest to inform a relative, friend or other nominated person about the arrest and where the arrested person is being held.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "A person is arrested without a warrant and asks why they are being arrested. Which statement is correct?",
    options: [
      "The police do not need to give any reason",
      "The person must be informed of the grounds of arrest",
      "Only the person's family can be told",
      "The reason can be disclosed only after conviction"
    ],
    correctAnswer: "The person must be informed of the grounds of arrest",
    explanation: "The grounds of arrest must be communicated to the arrested person. This is protected by Section 47 of the BNSS and Article 22(1) of the Constitution.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "A person is arrested and taken into custody. Under the general constitutional rule, within what period must they be produced before the nearest magistrate?",
    options: [
      "12 hours",
      "24 hours, excluding the time necessary for the journey",
      "48 hours",
      "7 days"
    ],
    correctAnswer: "24 hours, excluding the time necessary for the journey",
    explanation: "Article 22(2) of the Constitution requires an arrested person to be produced before the nearest magistrate within 24 hours, excluding the time necessary for the journey. Further detention requires the magistrate's authority.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "During questioning, an accused person is asked to provide an answer that would directly incriminate them. Which constitutional protection is relevant?",
    options: [
      "Article 14",
      "Article 19",
      "Article 20(3)",
      "Article 51A"
    ],
    correctAnswer: "Article 20(3)",
    explanation: "Article 20(3) protects an accused person from being compelled to be a witness against themselves.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "A police officer arrests a person. What does Section 36 of the BNSS require regarding the arrest procedure?",
    options: [
      "The officer must prepare a memorandum of arrest",
      "The officer must take the person's phone permanently",
      "The officer must obtain permission from the person's employer",
      "The officer must publish the arrest online"
    ],
    correctAnswer: "The officer must prepare a memorandum of arrest",
    explanation: "Section 36 of the BNSS sets out duties of the arresting officer, including preparing a memorandum of arrest and following the specified witness and attestation requirements.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "A person receives a notice from a police officer to appear for investigation instead of being arrested. What should the person generally do?",
    options: [
      "Ignore the notice",
      "Comply with the notice's directions",
      "Destroy the notice",
      "Leave the country immediately"
    ],
    correctAnswer: "Comply with the notice's directions",
    explanation: "Under Section 35(3) of the BNSS, when arrest is not required in the specified circumstances, the police officer issues a notice to appear. The person receiving it has a duty to comply with its terms.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "A person is arrested and needs medical attention. What does the BNSS say about the health and safety of an arrested person?",
    options: [
      "Their health is no longer the responsibility of anyone",
      "The person having custody must take reasonable care of their health and safety",
      "Medical help can be given only after trial",
      "Only family members can arrange medical help"
    ],
    correctAnswer: "The person having custody must take reasonable care of their health and safety",
    explanation: "Section 56 of the BNSS requires the person having custody of an accused to take reasonable care of the accused's health and safety.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  },
  {
    question: "Can police arrest any person at any time without following legal conditions?",
    options: [
      "Yes, without any reason",
      "Yes, whenever someone complains",
      "No, arrest must follow the legal grounds and conditions prescribed by law",
      "Only if the person is outside their home"
    ],
    correctAnswer: "No, arrest must follow the legal grounds and conditions prescribed by law",
    explanation: "Section 35 of the BNSS specifies when police may arrest without a warrant and includes conditions that must be met. A complaint alone does not automatically mean that arrest is always permitted.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/20340/1/bnss%2C_2023.pdf"
  }
],
  },

  {
    id: "consumer-rights",
    title: "Consumer Rights",
    description:
      "Learn about refunds, defective products and consumer protection.",
    questions: [
  {
    question: "You buy a new phone, but it stops working because of a manufacturing defect. Which law can help protect your interests as a consumer?",
    options: [
      "Consumer Protection Act, 2019",
      "Motor Vehicles Act, 1988",
      "Arms Act, 1959",
      "Citizenship Act, 1955"
    ],
    correctAnswer: "Consumer Protection Act, 2019",
    explanation: "The Consumer Protection Act, 2019 provides a framework for protecting consumer interests and addressing complaints involving defective goods and deficient services.",
    source: "https://www.indiacode.nic.in/indiacode/handle/123456789/15256?sam_handle=123456789%2F1362&view_type=browse"
  },
  {
    question: "A seller refuses to provide information about the quantity, quality or price of a product. Which consumer right is especially relevant?",
    options: [
      "Right to be informed",
      "Right to vote",
      "Right to education",
      "Right to privacy under the Constitution only"
    ],
    correctAnswer: "Right to be informed",
    explanation: "Consumers have the right to receive information about the quality, quantity, potency, purity, standard and price of goods or services to protect themselves against unfair trade practices.",
    source: "https://consumerhelpline.gov.in/public/knowledgebasedetails/Consumer%20Protection%20Act%202019"
  },
  {
    question: "A shopkeeper forces you to buy one product only if you also purchase another unrelated product. What might this be an example of?",
    options: [
      "An unfair trade practice",
      "A fundamental duty",
      "A criminal court order",
      "A consumer's right to education"
    ],
    correctAnswer: "An unfair trade practice",
    explanation: "Forcing consumers into unwanted purchases may amount to an unfair trade practice, depending on the facts and applicable law.",
    source: "https://www.indiacode.nic.in/indiacode/handle/123456789/15256?sam_handle=123456789%2F1362&view_type=browse"
  },
  {
    question: "You are unhappy with a service provider and want to raise a consumer grievance before approaching a Consumer Commission. Which service can help?",
    options: [
      "National Consumer Helpline",
      "Passport Seva",
      "Election Commission",
      "Railway enquiry"
    ],
    correctAnswer: "National Consumer Helpline",
    explanation: "The National Consumer Helpline is a pre-litigation grievance redressal platform. Consumers can contact it at 1915 or use its official website.",
    source: "https://consumerhelpline.gov.in/"
  },
  {
    question: "Which authority was established under the Consumer Protection Act, 2019 to address violations of consumer rights, unfair trade practices and misleading advertisements affecting consumers as a class?",
    options: [
      "Central Consumer Protection Authority (CCPA)",
      "Election Commission of India",
      "University Grants Commission",
      "National Human Rights Commission"
    ],
    correctAnswer: "Central Consumer Protection Authority (CCPA)",
    explanation: "The CCPA is established under the Consumer Protection Act, 2019. It protects, promotes and enforces consumer rights as a class and acts against specified unfair trade practices and misleading advertisements.",
    source: "https://www.ccpa.doca.gov.in/"
  },
  {
    question: "An online shopping platform displays a product as genuine branded merchandise, but it knowingly sells a counterfeit item. Which consumer issue may arise?",
    options: [
      "Unfair trade practice",
      "Right to vote",
      "A constitutional amendment",
      "A traffic violation"
    ],
    correctAnswer: "Unfair trade practice",
    explanation: "Misrepresenting the nature or quality of goods can amount to an unfair trade practice under consumer protection law.",
    source: "https://www.indiacode.nic.in/indiacode/handle/123456789/15256?sam_handle=123456789%2F1362&view_type=browse"
  },
  {
    question: "A consumer wants to file a complaint about goods or services before a District Consumer Commission. Who can file such a complaint under Section 35 of the Consumer Protection Act?",
    options: [
      "Only the seller",
      "The consumer and certain other persons or bodies recognised by the Act",
      "Only a police officer",
      "Only a High Court judge"
    ],
    correctAnswer: "The consumer and certain other persons or bodies recognised by the Act",
    explanation: "Section 35 allows a consumer and certain other eligible persons or bodies, including recognised consumer associations and governments in specified circumstances, to file a complaint.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/12808/1/the_consumer_protection_act%2C_2019_no._35_of_2019_date_09.08.2019.pdf"
  },
  {
    question: "A product causes harm because it has a manufacturing defect. Which concept under the Consumer Protection Act, 2019 may allow a consumer to seek compensation from a responsible party?",
    options: [
      "Product liability",
      "Fundamental duties",
      "Judicial review",
      "Citizenship"
    ],
    correctAnswer: "Product liability",
    explanation: "The Consumer Protection Act, 2019 includes provisions on product liability, under which a claim may arise against a product manufacturer, product service provider or product seller when the legal requirements are met.",
    source: "https://www.indiacode.nic.in/indiacode/handle/123456789/15256?sam_handle=123456789%2F1362&view_type=browse"
  },
  {
    question: "An advertisement makes a false claim about a product's quality to persuade people to buy it. What is this commonly called?",
    options: [
      "A misleading advertisement",
      "A consumer awareness campaign",
      "A legal notice",
      "A product warranty"
    ],
    correctAnswer: "A misleading advertisement",
    explanation: "An advertisement that falsely describes a product or is likely to mislead consumers about its nature, quality or quantity may be a misleading advertisement under the Consumer Protection Act, 2019.",
    source: "https://consumerhelpline.gov.in/public/knowledgebasedetails/Consumer%20Protection%20Act%202019"
  },
  {
    question: "You want to approach a Consumer Commission about a dispute. Which statement is correct?",
    options: [
      "Consumer disputes can never be filed electronically",
      "The Consumer Protection Act allows complaints to be filed electronically in the prescribed manner",
      "Only verbal complaints are accepted",
      "A consumer must first become a lawyer"
    ],
    correctAnswer: "The Consumer Protection Act allows complaints to be filed electronically in the prescribed manner",
    explanation: "Section 35 of the Consumer Protection Act, 2019 provides that a complaint may be filed electronically in the prescribed manner.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/12808/1/the_consumer_protection_act%2C_2019_no._35_of_2019_date_09.08.2019.pdf"
  }
]
  },

  {
    id: "constitution",
    title: "Constitution & Fundamental Rights",
    description:
      "Explore the Indian Constitution and your fundamental rights.",
    questions: [
  {
    question: "On which date did the Constitution of India come into effect?",
    options: [
      "15 August 1947",
      "26 November 1949",
      "26 January 1950",
      "2 October 1950"
    ],
    correctAnswer: "26 January 1950",
    explanation: "The Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950. This is why India celebrates Republic Day on 26 January.",
    source: "https://www.legislative.gov.in/static/uploads/2025/08/b9a933fb88c0a5afba254256bc55a3f0.pdf"
  },
  {
    question: "Which part of the Indian Constitution contains Fundamental Rights?",
    options: [
      "Part I",
      "Part III",
      "Part IV",
      "Part IVA"
    ],
    correctAnswer: "Part III",
    explanation: "Fundamental Rights are contained in Part III of the Constitution, covering Articles 12 to 35.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "A person believes that the State has treated them unequally before the law. Which constitutional article provides equality before the law and equal protection of the laws?",
    options: [
      "Article 14",
      "Article 19",
      "Article 25",
      "Article 51A"
    ],
    correctAnswer: "Article 14",
    explanation: "Article 14 guarantees equality before the law and equal protection of the laws to every person within the territory of India.",
    source: "https://indiacode.ecourtsindia.com/constitution-of-india/article/14/"
  },
  {
    question: "Which article protects the freedom of speech and expression of Indian citizens, subject to reasonable restrictions?",
    options: [
      "Article 14",
      "Article 19(1)(a)",
      "Article 21",
      "Article 32"
    ],
    correctAnswer: "Article 19(1)(a)",
    explanation: "Article 19(1)(a) gives citizens the right to freedom of speech and expression. This right is subject to the reasonable restrictions listed in Article 19(2).",
    source: "https://indiacode.ecourtsindia.com/constitution-of-india/article/19/"
  },
  {
    question: "A person's life or personal liberty is threatened. Which constitutional article is especially relevant?",
    options: [
      "Article 17",
      "Article 21",
      "Article 40",
      "Article 51A"
    ],
    correctAnswer: "Article 21",
    explanation: "Article 21 states that no person shall be deprived of their life or personal liberty except according to procedure established by law.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "Which article provides free and compulsory education for children between 6 and 14 years of age?",
    options: [
      "Article 19",
      "Article 21A",
      "Article 24",
      "Article 32"
    ],
    correctAnswer: "Article 21A",
    explanation: "Article 21A provides for free and compulsory education for all children between the ages of six and fourteen years, in the manner provided by law.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "A person is arrested and wants to know the constitutional protection regarding being informed of the grounds of arrest and consulting a lawyer. Which article is relevant?",
    options: [
      "Article 14",
      "Article 19",
      "Article 22",
      "Article 51A"
    ],
    correctAnswer: "Article 22",
    explanation: "Article 22 provides safeguards relating to arrest and detention, including being informed of the grounds of arrest and the right to consult and be defended by a legal practitioner of one's choice, subject to the article's stated exceptions.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "Which article allows a person to approach the Supreme Court for the enforcement of Fundamental Rights?",
    options: [
      "Article 21",
      "Article 32",
      "Article 44",
      "Article 51"
    ],
    correctAnswer: "Article 32",
    explanation: "Article 32 guarantees the right to move the Supreme Court for enforcement of Fundamental Rights. The Supreme Court can issue appropriate writs for this purpose.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "Where are the Fundamental Duties of Indian citizens listed in the Constitution?",
    options: [
      "Part II",
      "Part III",
      "Part IVA",
      "Part V"
    ],
    correctAnswer: "Part IVA",
    explanation: "Fundamental Duties are listed in Part IVA of the Constitution, under Article 51A.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  },
  {
    question: "Which of the following is the correct description of India in the Preamble to the Constitution?",
    options: [
      "A monarchy",
      "A Sovereign Socialist Secular Democratic Republic",
      "A military state",
      "A group of independent kingdoms"
    ],
    correctAnswer: "A Sovereign Socialist Secular Democratic Republic",
    explanation: "The Preamble describes India as a Sovereign Socialist Secular Democratic Republic and sets out the ideals of justice, liberty, equality and fraternity.",
    source: "https://www.indiacode.nic.in/bitstream/123456789/16124/1/the_constitution_of_india.pdf"
  }
],
  },
];

export default quizBundles;
