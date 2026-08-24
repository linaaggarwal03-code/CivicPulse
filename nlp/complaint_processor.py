import re


# ============================================================
# CATEGORY DETECTION
# ============================================================

CATEGORY_KEYWORDS = {
    "waterlogging": [
        "waterlogging",
        "water logging",
        "water accumulation",
        "water accumulating",
        "water has been accumulating",
        "standing water",
        "flooded",
        "flooding"
    ],

    "pothole": [
        "pothole",
        "potholes",
        "road hole",
        "holes in road"
    ],

    "garbage": [
        "garbage",
        "trash",
        "waste",
        "rubbish"
    ],

    "streetlight": [
        "streetlight",
        "street light",
        "lamp post",
        "street lamp"
    ],

    "drainage": [
        "drain",
        "drainage",
        "blocked drain",
        "sewer"
    ],

    "traffic": [
        "traffic",
        "traffic jam",
        "congestion"
    ]
}


def detect_category(text):
    """
    Detect the category of a civic complaint.
    """

    text = text.lower()

    for category, keywords in CATEGORY_KEYWORDS.items():

        for keyword in keywords:

            if keyword in text:
                return category

    return "unknown"


# ============================================================
# SEVERITY DETECTION
# ============================================================

HIGH_SEVERITY_WORDS = [
    "dangerous",
    "accident",
    "accidents",
    "injury",
    "injuries",
    "flooding",
    "flooded",
    "blocked",
    "severe",
    "critical",
    "huge",
    "major"
]


MEDIUM_SEVERITY_WORDS = [
    "large",
    "heavy",
    "serious",
    "frequent"
]


# Some civic categories are considered more serious
# in the MVP when the complaint clearly indicates
# an active problem.
HIGH_SEVERITY_CATEGORIES = [
    "waterlogging",
    "drainage"
]


def detect_severity(text, category=None):
    """
    Estimate the severity of a civic complaint.
    """

    text = text.lower()

    # First check explicit high-severity words
    for word in HIGH_SEVERITY_WORDS:

        if word in text:
            return "high"

    # Then check medium-severity words
    for word in MEDIUM_SEVERITY_WORDS:

        if word in text:
            return "medium"

    # Category-based baseline rule
    if category in HIGH_SEVERITY_CATEGORIES:
        return "high"

    return "low"


# ============================================================
# DURATION EXTRACTION
# ============================================================

NUMBER_WORDS = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "ten": "10"
}


def extract_duration(text):
    """
    Extract duration such as:
    2 days
    two days
    5 hours
    one week
    """

    text = text.lower()

    # --------------------------------------------------------
    # Case 1: Numeric duration
    # Example: "2 days", "5 hours"
    # --------------------------------------------------------

    numeric_pattern = (
        r"\b(\d+)\s+"
        r"(minute|minutes|hour|hours|day|days|"
        r"week|weeks|month|months)\b"
    )

    match = re.search(numeric_pattern, text)

    if match:
        number = match.group(1)
        unit = match.group(2)

        return f"{number} {unit}"

    # --------------------------------------------------------
    # Case 2: Written-number duration
    # Example: "two days", "one week"
    # --------------------------------------------------------

    word_pattern = (
        r"\b(one|two|three|four|five|six|seven|eight|nine|ten)"
        r"\s+"
        r"(minute|minutes|hour|hours|day|days|"
        r"week|weeks|month|months)\b"
    )

    match = re.search(word_pattern, text)

    if match:
        number_word = match.group(1)
        unit = match.group(2)

        number = NUMBER_WORDS[number_word]

        return f"{number} {unit}"

    return None


# ============================================================
# MAIN COMPLAINT PROCESSOR
# ============================================================

def process_complaint(complaint):
    """
    Convert a citizen complaint into structured information.
    """

    # Step 1: Detect category
    category = detect_category(complaint)

    # Step 2: Detect severity
    severity = detect_severity(
        complaint,
        category
    )

    # Step 3: Extract duration
    duration = extract_duration(complaint)

    # Step 4: Return structured result
    return {
        "category": category,
        "severity": severity,
        "duration": duration
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    complaint = (
        "Water has been accumulating near the metro station "
        "for two days."
    )

    result = process_complaint(complaint)

    print("Complaint:")
    print(complaint)

    print("\nNLP Output:")
    print(result)