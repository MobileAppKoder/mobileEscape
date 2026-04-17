# 🧪 COMMANDERSCORE: FULL SYSTEM README

This document explains EVERY part of the CommanderScore Deck Analyzer.

---

========================
CORE IDEA
========================

This tool produces a TRUE CONTINUOUS POWER RATING.

It is NOT a bracket system.
It is NOT capped at 5.

It is a PERFORMANCE MODEL.

Final Rating Range:
1.0 → infinity (practically 1–6+)

---

========================
WHAT THE TOOL MEASURES
========================

The tool answers:

"What does this deck actually do over time?"

It does this using:

1. STRUCTURE (Deck Construction)
2. CONSISTENCY (Benchmarks)
3. PERFORMANCE (100 Goldfish Games)

---

========================
THREE CORE PILLARS
========================

1. CATEGORY SCORE (0–35)
2. BENCHMARK COVERAGE (0–1)
3. GOLDFISH PERFORMANCE (0–1)

---

========================
CATEGORY SYSTEM (0–35)
========================

Each category is scored 0–5:

Mana Speed
- ramp
- rocks
- dorks
- fast mana

Card Advantage
- draw spells
- engines
- tutors

Interaction
- removal
- board wipes
- counters
- bounce / exile / disruption

Commander Dependence
- how much deck relies on commander

Win Speed
- how early deck wins

Win Quality
- reliability of win condition

Resilience
- recursion
- protection
- rebuild ability

TOTAL MAX = 35

---

========================
CATEGORY NORMALIZATION
========================

Category Score becomes:

Category % = Total / 35

Example:
24 / 35 = 0.685

---

========================
BENCHMARK SYSTEM
========================

Benchmarks measure consistency.

Targets:

T1 ramp → 16
T2 ramp → 14
T3 draw → 12
T4 lands → 41
T6 interaction → 10
T8 finisher → 5

---

========================
BENCHMARK CALCULATION
========================

For each benchmark:

% = (Deck Count / Target) * 100

Example:
2 / 16 = 12.5%

Each % is capped at 100%.

---

========================
BENCHMARK RATINGS
========================

85%+ = Excellent
65–85% = Close
50–65% = Good enough
35–50% = Not enough
<35% = Bad

---

========================
BENCHMARK SCORE
========================

Convert each benchmark to 0–1:

Then average all benchmarks.

Example:
(0.7 + 0.6 + 0.5 + 0.8 + 0.4 + 0.3) / 6

---

========================
GOLDFISH SYSTEM
========================

Runs 100 simulated games.

Each game:
- shuffle deck
- draw 7
- mulligan logic
- simulate turns 1–20

---

========================
WHAT GOLDFISH TRACKS
========================

- mulligans
- lands played
- ramp timing
- draw timing
- interaction availability
- commander cast turn
- board state
- probable win / overwhelm turn

---

========================
BOARD STATE SYSTEM
========================

Each turn evaluates:

1. RESOURCE SCORE
- mana available
- cards in hand

2. BOARD POWER
- creatures
- total power

3. ENGINE VALUE
- draw engines
- recursion

4. FINISHER PRESENCE
- in hand or board

---

========================
STATE TIERS
========================

Pressure → strong but not winning
Overwhelm → very hard to lose
Likely Win → game effectively over

---

========================
PROBABLE WIN TRACKING
========================

For each game, record turn where:
- overwhelm OR win state reached

Store distribution across 100 games.

---

========================
EARLY PRESSURE SYSTEM
========================

Track:

T1 wins
T2 wins
T3 wins

---

EARLY PRESSURE CALCULATION

Early Wins = T1 + T2 + T3

Example:
7 + 4 + 3 = 14

---

EARLY PRESSURE BONUS

0–4 → +0.0
5–8 → +0.1
9–12 → +0.2
13–16 → +0.3
17+ → +0.4

---

========================
GAME CHANGER SYSTEM
========================

Uses Scryfall flag: game_changer

Counts total Game Changers.

---

GAME CHANGER EFFECT

They DO NOT set bracket.

They DO:
- add modifier pressure
- increase rating

---

========================
WOTC SIGNAL (REFERENCE ONLY)
========================

0 GC → Bracket 1–2
1–3 GC → Bracket 3
4+ GC → Bracket 4–5

This is informational only.

---

========================
COMPETITIVE THRESHOLD
========================

If:

Turn 1 wins ≥ 8

Then:

Minimum rating = 5.0

BUT:
Modifiers still apply after.

---

========================
CORE FORMULA
========================

Final Score =

(0.55 × Category)
+ (0.20 × Benchmark)
+ (0.25 × Goldfish)

---

========================
CONVERT TO RATING
========================

Points = Final Score × 35

Convert to decimal rating.

---

========================
FINAL MODIFIERS
========================

Apply:

+ Game Changer modifier
+ Early Pressure modifier

---

========================
FINAL RULES
========================

- NO bracket flooring at 4
- Rating is continuous
- Can exceed 5.0
- 5.0 is only a minimum for extreme decks

---

========================
EXAMPLE 1
========================

Category = 0.69
Benchmark = 0.72
Goldfish = 0.38

Final = 0.6185

Points = 21.65

Base Rating ≈ 4.1

+ GC = +0.3
+ Pressure = +0.4

Final = 4.8

---

========================
EXAMPLE 2
========================

Base = 4.9

T1 wins = 8

→ floor to 5.0

+ modifiers

Final = 5.3

---

========================
EXAMPLE 3
========================

Game Changers = 2

Base = 3.9
Pressure = +0.2

Final = 4.1

---

========================
CARD BUCKETS
========================

Cards can have multiple roles:

- Land
- Ramp
- Draw
- Interaction
- Wipes
- Protection
- Recursion
- Finishers
- Tutors

---

========================
MANUAL OVERRIDE
========================

User can adjust role counts manually.

Then re-run analysis.

---

========================
MANA BASE FORMULA
========================

31.42 + (3.13 × AMV) − (0.28 × Ramp)

---

========================
LIMITATIONS
========================

- heuristic system
- no opponent simulation
- no meta context
- imperfect card classification

---

========================
FINAL STATEMENT
========================

This system measures:

REAL PERFORMANCE

Not theory.
