def classify_text(text: str):
    text_lower = text.lower()

    # Healthcare
    healthcare_keywords = [
        "hospital",
        "patient",
        "doctor",
        "treatment",
        "medical",
        "healthcare",
        "medicine",
        "clinic",
    ]

    # Banking
    banking_keywords = [
        "bank",
        "banking",
        "account",
        "atm",
        "rbi",
        "deposit",
        "loan",
        "customer",
    ]

    # Police
    police_keywords = [
        "police",
        "fir",
        "complaint",
        "crime",
        "criminal",
        "station",
        "arrest",
    ]

    # Consumer
    consumer_keywords = [
        "consumer",
        "refund",
        "product",
        "seller",
        "defective",
        "warranty",
        "purchase",
        "complaint",
    ]

    # Railways
    railway_keywords = [
        "railway",
        "train",
        "passenger",
        "ticket",
        "platform",
        "irctc",
        "rail",
    ]

    domains = {
        "Healthcare": healthcare_keywords,
        "Banking": banking_keywords,
        "Police": police_keywords,
        "Consumer": consumer_keywords,
        "Railways": railway_keywords,
    }

    scores = {}

    for domain, keywords in domains.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        scores[domain] = score

    best_domain = max(scores, key=scores.get)

    if scores[best_domain] == 0:
        return {
            "domain": "Unknown",
            "topic": "Unknown"
        }

    topics = {
        "Healthcare": "Patient Rights",
        "Banking": "Unauthorized Electronic Transactions",
        "Police": "FIR & Police Complaints",
        "Consumer": "Consumer Rights",
        "Railways": "Passenger Rights",
    }

    return {
        "domain": best_domain,
        "topic": topics[best_domain]
    }