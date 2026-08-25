import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from nlp.complaint_processor import process_complaint
# CivicPulse - Risk Engine
# Member 1: AI/ML
#
# Responsibilities:
# 1. Calculate Civic Risk Score
# 2. Assign Risk Level
# 3. Explain why the risk is high
# 4. Detect emerging civic problems


# ============================================================
# 1. RISK SCORE
# ============================================================

def calculate_risk_score(
    complaint_growth,
    spatial_density,
    historical_recurrence,
    weather_impact,
    traffic_impact
):
    """
    Calculate Civic Risk Score from 0 to 100.

    Formula:
    30% Complaint Growth
    20% Spatial Density
    20% Historical Recurrence
    20% Weather Impact
    10% Traffic Impact
    """

    risk_score = (
        0.30 * complaint_growth
        + 0.20 * spatial_density
        + 0.20 * historical_recurrence
        + 0.20 * weather_impact
        + 0.10 * traffic_impact
    )

    # Keep score between 0 and 100
    risk_score = max(0, min(100, risk_score))

    return round(risk_score)


# ============================================================
# 2. RISK LEVEL
# ============================================================

def get_risk_level(risk_score):
    """
    Convert risk score into a human-readable risk level.
    """

    if risk_score <= 30:
        return "LOW"

    elif risk_score <= 60:
        return "MEDIUM"

    elif risk_score <= 80:
        return "HIGH"

    else:
        return "CRITICAL"


# ============================================================
# 3. EXPLAINABILITY
# ============================================================

def explain_risk(
    complaint_growth,
    spatial_density,
    historical_recurrence,
    weather_impact,
    traffic_impact
):
    """
    Identify the major factors contributing to the risk.
    """

    factors = []

    # Complaint growth
    if complaint_growth >= 70:
        factors.append(
            f"Very high complaint growth ({complaint_growth}%)"
        )

    elif complaint_growth >= 40:
        factors.append(
            f"Complaint growth is increasing ({complaint_growth}%)"
        )

    # Spatial density
    if spatial_density >= 70:
        factors.append(
            "High spatial concentration of complaints"
        )

    elif spatial_density >= 40:
        factors.append(
            "Moderate spatial concentration of complaints"
        )

    # Historical recurrence
    if historical_recurrence >= 70:
        factors.append(
            "Similar civic problems occurred previously"
        )

    elif historical_recurrence >= 40:
        factors.append(
            "Some historical recurrence detected"
        )

    # Weather
    if weather_impact >= 70:
        factors.append(
            "Severe weather impact"
        )

    elif weather_impact >= 40:
        factors.append(
            "Moderate weather impact"
        )

    # Traffic
    if traffic_impact >= 70:
        factors.append(
            "High traffic or mobility impact"
        )

    elif traffic_impact >= 40:
        factors.append(
            "Moderate traffic impact"
        )

    # If nothing significant was detected
    if not factors:
        factors.append(
            "No major risk factor detected"
        )

    return factors


# ============================================================
# 4. ESCALATION PROBABILITY
# ============================================================

def calculate_escalation_probability(
    risk_score,
    complaint_growth,
    historical_recurrence
):
    """
    Estimate the probability that the civic issue may escalate.

    This is an MVP heuristic, not a trained ML probability.
    """

    probability = (
        0.60 * risk_score
        + 0.25 * complaint_growth
        + 0.15 * historical_recurrence
    )

    probability = max(0, min(100, probability))

    return round(probability)


# ============================================================
# 5. EMERGING PROBLEM DETECTOR
# ============================================================

def detect_emerging_problem(
    category,
    location,
    complaint_count,
    complaint_growth,
    risk_score
):
    """
    Detect whether a civic issue is emerging in a particular area.
    """

    # Strong growth + enough complaints
    if complaint_growth >= 50 and complaint_count >= 10:

        escalation_probability = calculate_escalation_probability(
            risk_score,
            complaint_growth,
            complaint_growth
        )

        return {
            "emerging_problem": True,
            "category": category,
            "location": location,
            "complaint_count": complaint_count,
            "complaint_growth": complaint_growth,
            "escalation_probability": escalation_probability,
            "message": "Emerging civic problem detected"
        }

    # High risk itself can indicate an emerging issue
    if risk_score >= 61:

        escalation_probability = calculate_escalation_probability(
            risk_score,
            complaint_growth,
            complaint_growth
        )

        return {
            "emerging_problem": True,
            "category": category,
            "location": location,
            "complaint_count": complaint_count,
            "complaint_growth": complaint_growth,
            "escalation_probability": escalation_probability,
            "message": "High-risk civic problem detected"
        }

    return {
        "emerging_problem": False,
        "category": category,
        "location": location,
        "complaint_count": complaint_count,
        "complaint_growth": complaint_growth,
        "escalation_probability": 0,
        "message": "No emerging problem detected"
    }


# ============================================================
# 6. COMPLETE RISK ANALYSIS
# ============================================================

def analyze_risk(
    category,
    location,
    complaint_count,
    complaint_growth,
    spatial_density,
    historical_recurrence,
    weather_impact,
    traffic_impact
):
    """
    Run the complete CivicPulse risk analysis.
    """

    # Calculate risk score
    risk_score = calculate_risk_score(
        complaint_growth=complaint_growth,
        spatial_density=spatial_density,
        historical_recurrence=historical_recurrence,
        weather_impact=weather_impact,
        traffic_impact=traffic_impact
    )

    # Convert score into risk level
    risk_level = get_risk_level(risk_score)

    # Generate explanation
    explanations = explain_risk(
        complaint_growth=complaint_growth,
        spatial_density=spatial_density,
        historical_recurrence=historical_recurrence,
        weather_impact=weather_impact,
        traffic_impact=traffic_impact
    )

    # Detect emerging problem
    emerging_problem = detect_emerging_problem(
        category=category,
        location=location,
        complaint_count=complaint_count,
        complaint_growth=complaint_growth,
        risk_score=risk_score
    )

    # Return complete result
    return {
        "category": category,
        "location": location,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "explanation": explanations,
        "emerging_problem": emerging_problem
    }
# ============================================================
# 8. NLP + RISK ENGINE INTEGRATION
# ============================================================

def analyze_complaint_with_risk(
    complaint,
    location,
    complaint_count,
    complaint_growth,
    spatial_density,
    historical_recurrence,
    weather_impact,
    traffic_impact
):
    """
    Connect NLP complaint processing with Risk Engine.
    """

    # Process complaint using NLP
    nlp_result = process_complaint(complaint)

    # Run risk analysis
    risk_result = analyze_risk(
        category=nlp_result["category"],
        location=location,
        complaint_count=complaint_count,
        complaint_growth=complaint_growth,
        spatial_density=spatial_density,
        historical_recurrence=historical_recurrence,
        weather_impact=weather_impact,
        traffic_impact=traffic_impact
    )

    # Combine NLP + Risk results
    return {
        "complaint": complaint,

        "nlp": nlp_result,

        "risk": risk_result
    }

# ============================================================
# 9. INTEGRATION TEST
# ============================================================

if __name__ == "__main__":

    complaint = (
        "Water has been accumulating near the metro station "
        "for two days."
    )

    result = analyze_complaint_with_risk(
        complaint=complaint,
        location="Sector 18",

        # Complaint data
        complaint_count=31,
        complaint_growth=73,

        # Area/context data
        spatial_density=80,
        historical_recurrence=70,
        weather_impact=90,
        traffic_impact=60
    )

    print("\n================================")
    print("       CIVICPULSE AI")
    print("   NLP + RISK ENGINE")
    print("================================")

    print("\nComplaint:")
    print(result["complaint"])

    print("\nNLP Output:")
    print("Category:", result["nlp"]["category"])
    print("Severity:", result["nlp"]["severity"])
    print("Duration:", result["nlp"]["duration"])

    print("\nRisk Analysis:")
    print("Location:", result["risk"]["location"])
    print("Risk Score:", f'{result["risk"]["risk_score"]}/100')
    print("Risk Level:", result["risk"]["risk_level"])

    print("\nWhy?")
    for factor in result["risk"]["explanation"]:
        print("-", factor)

    print("\nEmerging Problem:")

    emerging = result["risk"]["emerging_problem"]

    print("Detected:", emerging["emerging_problem"])
    print("Category:", emerging["category"])
    print("Location:", emerging["location"])
    print("Message:", emerging["message"])

    if emerging["emerging_problem"]:
        print(
            "Escalation Probability:",
            f'{emerging["escalation_probability"]}%'
        )