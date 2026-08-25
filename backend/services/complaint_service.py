def analyze_complaint(description: str):
    text = description.lower()

    if "water" in text or "flood" in text or "waterlogging" in text:
        category = "water"
        severity = "high"
    elif "garbage" in text or "waste" in text:
        category = "waste"
        severity = "medium"
    elif "road" in text or "pothole" in text:
        category = "road"
        severity = "medium"
    else:
        category = "other"
        severity = "low"

    return {
        "category": category,
        "severity": severity
    }