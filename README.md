# 🧪 Commander Deck Analyzer & Goldfish Simulator

A single-page Commander deck analysis tool that evaluates **structure, consistency, and real gameplay performance** to produce a **true bracket decimal rating (1.0 – 5.0)**.

This tool does **not** rate your deck based on theory or ideal hands — it evaluates what your deck actually does over time.

---

# ⚙️ Core Philosophy

> **Rate the deck you play — not the one you imagine.**

This system combines:
- Deck construction quality
- Probability-based benchmarks
- Simulated gameplay (100 goldfish games)

Into a single, blended rating.

---

# 🧠 The Three Pillars of Evaluation

The final rating is derived from **three independent signals**:

## 1. Category Score (Structural Power)
## 2. Benchmark Coverage (Consistency Targets)
## 3. Goldfish Performance (Actual Gameplay)

Each signal is normalized and blended into a final result.

---

# 🧮 Bracket Rating System (Foundation)

The system is based on **7 core categories**, each scored from **0–5**:

| Category | Description |
|--------|------------|
| Mana Speed | Ramp, fast mana, acceleration |
| Card Advantage | Draw, filtering, tutors |
| Interaction | Removal, wipes, counters, disruption |
| Commander Dependence | How required the commander is |
| Win Speed | How fast the deck wins |
| Win Quality | Reliability of the win condition |
| Resilience | Recovery, protection, recursion |

### Total Score MAX = 35

### Base Bracket Mapping

| Score | Bracket |
|------|--------|
| 0–8 | 1 — Jank / Theme |
| 9–14 | 2 — Casual |
| 15–23 | 3 — High-Power Casual |
| 24–31 | 4 — cEDH Adjacent |
| 32–35 | 5 — Competitive |

---

# 🔢 Decimal System

The decimal refines placement inside the bracket:

| Decimal | Meaning |
|--------|--------|
| .1–.2 | Low end |
| .3–.4 | Solid |
| .5–.6 | Strong |
| .7–.8 | Very strong |
| .9 | Near next bracket |

---

# 📊 Benchmark System

Benchmarks define how reliably a deck hits key gameplay milestones.

## Targets

| Turn | Goal | Target |
|------|------|--------|
| T1 | 1-drop ramp | 16 |
| T2 | Ramp | 14 |
| T3 | Card draw | 12 |
| T4 | 4+ lands | 41 lands |
| T6 | Removal | 10 |
| T7 | Synergy (3+) | 30 |
| T8 | Finisher | 5 |

---

## Benchmark Calculation

Each benchmark is evaluated as: % = (Deck Count ÷ Target Count) × 100

Example: 2 ramp pieces / 16 target = 12.5%


---

## Benchmark Ratings

| % | Rating |
|--|--------|
| 85%+ | Excellent |
| 65–85% | Close |
| 50–65% | Good enough |
| 35–50% | Not enough |
| <35% | Bad |

---

## Benchmark Coverage Score

Each benchmark is:
- capped at 100%
- converted to decimal (0–1)
- averaged across all benchmarks

---

# 🎲 Goldfish Simulation

The tool runs **100 simulated games** using:

- Random shuffle
- Opening hand logic
- Mulligan rules
- Turn-by-turn play through turn 20
- Ramp prioritization
- Commander casting priority

---

## Goldfish Metrics

Tracked metrics include:

- Mulligan frequency
- Commander cast turn
- Ramp / draw / removal timing
- Resource availability (hand + battlefield)
- Probable win / overwhelm turn

---

## Goldfish Performance Score

Goldfish performance is calculated from:

- Early curve success (T1–T4)
- Resource consistency
- Commander deployment speed
- Win timing distribution
- Mulligan penalties

Normalized into a **0–1 score**

---

# 🧪 True Bracket Algorithm (IMPORTANT)

The final rating is NOT just the category score.

It is a **blended model**:
Final Score =
(Category Score × 0.55) +
(Benchmark Coverage × 0.20) +
(Goldfish Performance × 0.25)


---

## Step-by-Step Calculation

### 1. Normalize Category Score
Category % = Total Category Points / 35

---

### 2. Calculate Benchmark Coverage
Each benchmark % → capped at 100%
Average all → Benchmark Score (0–1)

---

### 3. Calculate Goldfish Score
Blend of:
- Curve success
- Commander timing
- Win timing
- Mulligans
→ normalized 0–1

---

### 4. Blend Scores
Final % = (0.55 × Category) + (0.20 × Benchmark) + (0.25 × Goldfish)

---

### 5. Convert to Bracket Score
Final Points = Final % × 35


Then map to bracket tiers.

---

### 6. Assign Decimal

Decimal is adjusted using:
- Benchmark strength
- Goldfish consistency
- Proximity to next bracket

---

## Example

Category Score: 69%
Benchmark Coverage: 72%
Goldfish Performance: 38%

Final = (0.55 × 0.69) + (0.20 × 0.72) + (0.25 × 0.38)
= 0.3795 + 0.144 + 0.095
= 0.6185

Final Points = 0.6185 × 35 ≈ 21.6

→ Bracket 3
→ Decimal adjusted → 3.7


---

# 🧩 Card Bucket System

Cards are classified into multiple roles (not exclusive):

- Lands
- Ramp / rocks / dorks
- Card advantage / draw
- Spot interaction
- Board wipes
- Protection
- Recursion
- Finishers
- Synergy pieces
- Tutors / selection

---

## Important Notes

- Cards can belong to **multiple buckets**
- Classification is based on:
  - Oracle text
  - Type line
  - Keywords
- Priority logic prevents misclassification (e.g. wipes ≠ finishers)

---

# ✏️ Manual Adjustments

Users can:
- override role counts
- reanalyze using adjusted values

This allows correction of:
- edge-case cards
- tribal synergies
- commander-specific interactions

---

# 📐 Mana Base Calculation

Uses the **Frank Karsten Formula**:
31.42 + (3.13 × AMV) − (0.28 × Ramp)


Outputs a **recommended land count**

---

# ⚠️ Limitations

- This is a heuristic system, not a full rules engine
- Card classification is not perfect
- Goldfish simulation approximates gameplay
- Meta context is not considered

---

# 🎯 Final Thought

This tool is designed to answer one question:

> **What does your deck actually do, consistently, over time?**

Not:
- your best game
- your luckiest draw
- your imagined ceiling

But your **real performance profile**.
