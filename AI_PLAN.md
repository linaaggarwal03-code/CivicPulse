# CivicPulse — AI/ML Plan

## 1. AI Pipeline

The CivicPulse AI pipeline converts raw citizen complaints into structured insights, detects emerging patterns, predicts civic risk, and provides explainable risk factors.

### Pipeline

Citizen Complaint
↓
NLP Complaint Analysis
↓
Category + Severity + Entity + Duration Extraction
↓
Similar / Duplicate Complaint Detection
↓
Temporal + Spatial Pattern Detection
↓
Risk Prediction
↓
Civic Risk Score
↓
Risk Level
↓
Explainability
↓
Emerging Problem Detection


## 2. ML Prediction Problem

### Prediction Objective

Predict the probability that an emerging civic issue will escalate into a high-risk or critical civic problem.

### Model Inputs

- Complaint growth
- Complaint frequency
- Spatial density
- Historical recurrence
- Average complaint severity
- Weather impact
- Traffic / mobility impact

### Model Output

- Escalation probability
- Civic Risk Score
- Risk Level

Example:

Escalation Probability: 78%
Civic Risk Score: 87/100
Risk Level: HIGH


## 3. Risk Score

The Civic Risk Score combines multiple signals into a normalized score from 0 to 100.

### Proposed MVP Formula

Risk Score =
0.30 × Complaint Growth
+ 0.20 × Spatial Density
+ 0.20 × Historical Recurrence
+ 0.20 × Weather Impact
+ 0.10 × Traffic Impact

Each factor will be normalized to a 0–100 scale.

### Risk Levels

0–30   → LOW
31–60  → MEDIUM
61–80  → HIGH
81–100 → CRITICAL

The final weights and thresholds can be calibrated using the available hackathon dataset.


## 4. Model Approach

### NLP Layer

The NLP layer will process citizen complaint text and extract structured information.

Planned capabilities:

- Complaint text preprocessing
- Complaint classification
- Category detection
- Severity detection
- Entity extraction
- Duration extraction
- Similar / duplicate complaint detection

### Risk Prediction Layer

For the initial MVP, an interpretable machine-learning approach will be preferred.

Candidate baseline models:

- Logistic Regression
- Random Forest

The final model will be selected after evaluating the available dataset and features.

### Explainability

The system will not only produce a risk score but also identify the major contributing factors.

Example:

Risk Score: 87/100
Risk Level: HIGH

Why?

- +31 complaints
- +73% complaint growth
- Heavy rainfall
- Previous flooding incidents
- Nearby drainage complaints


## 5. NLP Outputs

Each complaint will be converted into a structured representation.

### Example Input

"Water has been accumulating near the metro station for two days."

### Example Output

Category: Waterlogging
Severity: High
Duration: 2 days
Location: Metro Station
Problem: Water accumulation


### Planned NLP Schema

```json
{
  "category": "Waterlogging",
  "severity": "High",
  "location": "Metro Station",
  "duration": "2 days",
  "problem": "Water accumulation",
  "confidence": 0.94
}
