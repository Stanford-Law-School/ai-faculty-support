# Prediction and confidence calibration

## Before the test

Ask:

1. What do you predict will happen?
2. How confident are you? **Low**, **Moderate**, or **High**
3. What evidence or assumption drives that prediction?

Do not force numerical probabilities.

## After the test

Ask:

1. What happened?
2. Which part surprised you?
3. Did your confidence increase, decrease, or become more conditional?
4. What would you predict on a similar task?
5. What evidence would you need before relying on the system?

## Calibration outcomes

| Outcome | Meaning |
|---------|---------|
| Correct prediction, sound reasoning | Mental model aligned with mechanism |
| Correct prediction, weak reason | Lucky or superficial understanding |
| Incorrect prediction, better model | Valuable learning |
| Ambiguous result | Confidence should stay conditional |
| One trial | Usually should not shift confidence much |

## Confidence language in outputs

Distinguish faculty prediction confidence from model output certainty. The model's fluent confidence is not calibrated internal probability.

## Non-punitive framing

Never imply the faculty member should have predicted correctly. Prediction exists to make observation more informative.

## Confidence-calibration lab

Compare the certainty of the system's language with the quality of available evidence. Flag false confidence and unhelpful hedging separately.
