# 🧪 CommandScore — Full Design, Evolution, and Algorithms (Comprehensive README)

> This document captures the **origin, evolution, full architecture, and all calculations** behind CommandScore.

---

# 🧠 ORIGIN OF THE IDEA

The tool started as a **Commander bracket rater** inspired by WotC bracket discussions.

Initial goals:
- Take a decklist
- Assign a bracket (1–5)
- Provide a “power level” score

Problem discovered early:
- Traditional brackets are **too coarse**
- Decks inside the same bracket vary wildly
- Real gameplay performance ≠ theoretical deck strength

---

# ⚠️ PROBLEM WITH TRADITIONAL SYSTEMS

Early observations:

- “Bracket 4” decks ranged from:
  - barely optimized casual
  - to near cEDH

- Decks labeled as “Bracket 3” could outperform “Bracket 4” decks

Conclusion:
> **Brackets alone are not sufficient to describe power.**

---

# 🔄 EVOLUTION OF THE SYSTEM

## Phase 1 — Static Deck Analysis
- Count ramp, draw, removal
- Assign category scores
- Produce bracket

Problem:
- No real gameplay data
- Could not measure consistency

---

## Phase 2 — Benchmark System
Added probability targets:

- T1 ramp
- T2 ramp
- T3 draw
- T4 lands
- T6 interaction
- T8 finisher

Purpose:
> Measure **consistency**, not just presence

---

## Phase 3 — Goldfish Simulation
Major breakthrough.

Added:
- 100 simulated games
- turn-by-turn progression
- mulligan logic
- resource tracking

Result:
> Now measuring **real performance over time**

---

## Phase 4 — Probable Win / Overwhelm

Initially:
- triggered by big creature or finisher

Problem:
- too simplistic

Upgraded to:
- board state evaluation
- resource analysis
- engine detection

---

## Phase 5 — Board State Engine

Three tiers introduced:

- Pressure
- Overwhelm
- Likely Win

This replaced simple “win detection”.

---

## Phase 6 — Early Pressure System

Tracked:
- Turn 1 wins
- Turn 2 wins
- Turn 3 wins

Purpose:
> Measure **explosiveness**

---

## Phase 7 — Game Changer Integration

Replaced “synergy” metric.

Using:
- Scryfall `game_changer` flag

Purpose:
- align with WotC philosophy
- detect high-impact cards

---

## Phase 8 — Removing Bracket Floors

Originally:
- Game Changers forced Bracket 4

Problem:
- compressed ratings
- lost nuance

Solution:
> Removed hard floors → moved to **modifiers**

---

## Phase 9 — Continuous Rating System

Final breakthrough:

- Ratings no longer capped at 5
- Fully continuous scale introduced

Result:
> **4.1, 4.8, 5.3, 5.7 all possible**

---

# 📊 FINAL SYSTEM OVERVIEW

The system combines:

1. Category Score
2. Benchmark Coverage
3. Goldfish Performance
4. Game Changer Modifier
5. Early Pressure Modifier

---

# 🧮 FULL ALGORITHM

## Step 1 — Category Score

Each category scored 0–5.

Total max = 35

```
Category Score = Total / 35
```

---

## Step 2 — Benchmark Coverage

For each benchmark:

```
Percent = DeckCount / Target
Capped at 1.0
```

Average all benchmarks:

```
Benchmark Score = avg(all benchmark %)
```

---

## Step 3 — Goldfish Performance

Derived from:

- average win turn
- mulligan frequency
- resource curve
- board dominance

Normalized to 0–1

---

## Step 4 — Blend Core Scores

```
Base Score =
(0.55 × Category)
+ (0.20 × Benchmark)
+ (0.25 × Goldfish)
```

---

## Step 5 — Convert to Rating

```
Points = Base Score × 35
```

Converted to decimal rating.

---

# ⚡ EARLY PRESSURE ALGORITHM

```
Early Wins = T1 + T2 + T3
```

Bonus:

```
0–4 → +0.0
5–8 → +0.1
9–12 → +0.2
13–16 → +0.3
17+ → +0.4
```

---

# 💥 GAME CHANGER ALGORITHM

Count cards where:

```
card.game_changer == true
```

Apply modifier based on count.

No flooring.

---

# ⚡ COMPETITIVE THRESHOLD

```
If T1 wins ≥ 8:
    rating = max(rating, 5.0)
```

Then continue applying modifiers.

---

# 📈 GRAPH SYSTEMS

The app generates multiple graphs:

---

## 1. Win / Overwhelm Distribution

Tracks:
- Turn 1–20
- Frequency of probable win

Used for:
- speed detection
- early pressure

---

## 2. Resource Curve Graph

Tracks over turns:
- cards in hand
- mana available

Purpose:
> Evaluate consistency

---

## 3. Role Hit Graphs

Tracks when deck achieves:

- ramp online
- draw online
- interaction available

---

## 4. Mulligan Distribution

Tracks:
- number of mulligans per game

Purpose:
> Detect inconsistency

---

# 🧠 BOARD STATE ALGORITHM

Each turn calculates:

---

## Resource Score

```
mana + cards in hand
```

---

## Board Power

```
sum of creature power
+ number of creatures
```

---

## Engine Score

- draw engines
- recursion engines

---

## Finisher Score

- finisher in hand or board
- playable with current mana

---

## Total Board Score

Combined weighted score.

---

## State Thresholds

```
Score < X → Normal
Score ≥ X → Pressure
Score ≥ Y → Overwhelm
Score ≥ Z → Likely Win
```

---

# 🧩 CARD CLASSIFICATION

Cards assigned to multiple roles:

- Land
- Ramp
- Draw
- Interaction
- Wipes
- Protection
- Recursion
- Finisher
- Tutor

Classification uses:
- oracle text
- keywords
- heuristics

---

# ✏️ USER OVERRIDES

Users can:
- manually adjust role counts
- rerun analysis

---

# 📐 MANA BASE ALGORITHM

Karsten Formula:

```
31.42 + (3.13 × AMV) − (0.28 × Ramp)
```

---

# ⚠️ LIMITATIONS

- no opponent simulation
- heuristic win detection
- imperfect classification
- no meta awareness

---

# 🎯 FINAL PHILOSOPHY

This system measures:

REAL PERFORMANCE

Not:
- ideal draws
- theory
- assumptions

---

# 🏁 FINAL RESULT

A system that produces:

- continuous ratings
- real gameplay insight
- measurable consistency
- meaningful deck comparison

---

END OF DOCUMENT
