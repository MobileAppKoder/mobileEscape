# 🧪 Commander Deck Analyzer & Goldfish Simulator

A high-fidelity Commander deck analysis tool that evaluates **deck construction, consistency, and real gameplay performance** to produce a **true bracket decimal rating (1.0 – 5.0)**.

This tool is designed to answer one question:

> **What does your deck actually do, consistently, over time?**

Not:
- your best draw
- your perfect hand
- your theoretical ceiling

But your **real performance profile across 100 games**.

---

# ⚙️ Core Philosophy

This system is built on three principles:

### 1. Reality over theory
Decks are evaluated using **100 simulated games (goldfish)** — not assumptions.

### 2. Structure matters
Deck construction (ramp, draw, interaction, etc.) defines consistency.

### 3. Speed + consistency = power
Fast decks that do not consistently perform are not rated highly.

---

# 🧠 Three Pillars of Evaluation

The final rating is derived from three independent signals:

### 1. Category Score (Structural Power)
### 2. Benchmark Coverage (Consistency Targets)
### 3. Goldfish Performance (Actual Gameplay)

These are blended into a single **true bracket rating**.

---

# 🧮 Bracket Rating System (Foundation)

The system evaluates 7 categories, each scored 0–5:

| Category | What It Measures |
|--------|------------------|
| Mana Speed | Ramp, fast mana, acceleration |
| Card Advantage | Draw, filtering, tutors |
| Interaction | Removal, wipes, counters, disruption |
| Commander Dependence | Reliance on commander |
| Win Speed | How fast the deck wins |
| Win Quality | Reliability of win condition |
| Resilience | Recovery, protection, recursion |

### Total Score Max = 35


---

## Base Bracket Mapping

| Score | Bracket |
|------|--------|
| 0–8 | 1 — Jank / Theme |
| 9–14 | 2 — Casual |
| 15–23 | 3 — High-Power Casual |
| 24–31 | 4 — cEDH Adjacent |
| 32–35 | 5 — Competitive |

---

## Decimal System

The decimal refines placement:

| Decimal | Meaning |
|--------|--------|
| .1–.2 | Low end |
| .3–.4 | Solid |
| .5–.6 | Strong |
| .7–.8 | Very strong |
| .9 | Near next bracket |

---

# 📊 Benchmark System (Consistency Engine)

Benchmarks measure how reliably a deck hits key milestones.

## Targets

| Turn | Goal | Target |
|------|------|--------|
| T1 | 1-drop ramp | 16 |
| T2 | Ramp | 14 |
| T3 | Card draw | 12 |
| T4 | 4+ lands | 41 lands |
| T6 | Interaction | 10 |
| T8 | Finisher | 5 |

---

## Benchmark Formula
% = (Deck Count ÷ Target) × 100

Example: 2 ramp / 16 target = 12.5%


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

Each benchmark:
- capped at 100%
- converted to 0–1
- averaged

---

# 🎲 Goldfish Simulation (100 Games)

The engine simulates 100 games using:

- randomized shuffle
- opening hand draw
- mulligan logic
- land drop priority
- ramp-first casting logic
- commander priority casting
- turn progression through turn 20

---

## What It Tracks

- mulligans taken
- commander cast turn
- ramp timing
- draw timing
- interaction availability
- hand + battlefield resources
- probable win / overwhelm turn

---

## Probable Win / Overwhelm

This is a heuristic signal that estimates:

> “At this point, the deck likely wins or becomes unstoppable.”

Tracked per turn across 100 games.

---

# ⚡ Early Pressure System (CRITICAL)

This is the most important upgrade in the model.

It measures how often your deck wins early.

---

## Early Win Data

From 100 games:
- T1 = wins on turn 1
- T2 = wins on turn 2
- T3 = wins on turn 3

Example:
T1 = 7
T2 = 4
T3 = 3


---

## Early Pressure Score
Early Wins = T1 + T2 + T3

Example:
7 + 4 + 3 = 14%


---

## Early Pressure Bonus

| Early Wins | Bonus |
|-----------|------|
| 0–4 | +0.0 |
| 5–8 | +0.1 |
| 9–12 | +0.2 |
| 13–16 | +0.3 |
| 17+ | +0.4 |

This is applied **only to Bracket 4+ decks**.

---

# 🧩 Game Changer System (WotC Alignment)

Game Changers are pulled directly from Scryfall (`game_changer = true`).

---

## Game Changer Rules

| Count | Meaning |
|------|--------|
| 0 | Bracket 1–2 compatible |
| 1–3 | Bracket 3 signal |
| 4+ | Bracket 4–5 signal |

---

## Bracket Enforcement

- **4+ Game Changers → minimum Bracket 4**
- **8+ Turn 1 wins → forced Bracket 5**

---

## Why This Matters

Game Changers:
- are curated by Wizards
- represent powerful, format-warping cards
- act as a **floor, not the full rating**

---

# 🧮 True Rating Algorithm (FULL DETAIL)

This is the full calculation chain:

---

## Step 1: Normalize Category Score
Category Score = Total / 35


---

## Step 2: Benchmark Coverage
Benchmark Score = average of capped benchmark %


---

## Step 3: Goldfish Performance

Derived from:
- win timing
- resource consistency
- mulligans
- commander speed

Normalized to 0–1.

---

## Step 4: Blend Scores
Final Score =
(0.55 × Category) +
(0.20 × Benchmark) +
(0.25 × Goldfish)


---

## Step 5: Convert to Bracket Points
Points = Final Score × 35


---

## Step 6: Assign Base Bracket

Use bracket table.

---

## Step 7: Apply Game Changer Floor
if GC ≥ 4 → min bracket = 4


---

## Step 8: Apply Early Pressure
Add decimal bonus (0.0–0.4)


---

## Step 9: Check Forced Bracket 5
if T1 ≥ 8 → Bracket 5


---

## Final Output

Example:
Base: 4.0

Early Pressure: +0.4
Final: 4.4


---

# 🧩 Card Buckets

Cards can belong to multiple buckets:

- Lands
- Ramp / rocks / dorks
- Card advantage / draw
- Spot interaction
- Board wipes
- Protection
- Recursion
- Finishers
- Synergy
- Tutors

---

## Important

- Multi-tag system (not exclusive)
- Based on:
  - oracle text
  - keywords
  - type line

---

# ✏️ Manual Adjustments

Users can:
- override role counts
- reanalyze with new values

This allows:
- correcting edge cases
- tribal synergy adjustments
- commander-specific tuning

---

# 📐 Mana Base (Karsten Formula)
31.42 + (3.13 × AMV) − (0.28 × Ramp)


Outputs recommended land count.

---

# ⚠️ Limitations

- Not a full MTG rules engine
- Heuristic classification
- Goldfish ≠ real multiplayer interaction
- Meta context not included

---

# 🎯 Final Thought

This tool doesn’t tell you how strong your deck *can* be.

It tells you:

> **How strong your deck actually is.**
