# 🧙‍♂️ Commander Deck Analyzer & Goldfish Simulator

A lightweight, single-page HTML tool for analyzing Magic: The Gathering Commander decks using a **decimal bracket rating system**, automated heuristics, and **100-game goldfish simulations**.

---

## 🔍 What This Tool Does

This tool allows you to:

- Paste a Commander decklist (no Moxfield required)
- Analyze deck structure and performance
- Run **100 simulated games (goldfish)**
- Generate performance graphs
- Calculate a **Bracket + Decimal rating (1.0 – 5.0)**
- Evaluate consistency, speed, and reliability

---

## ⚙️ How to Use

1. Open the HTML file in your browser  
2. Paste your decklist (one card per line, quantity optional)  
3. Enter your commander (and partner if applicable)  
4. Click **Analyze Deck**  
5. Review:
   - Rating
   - Graphs
   - Summary breakdown  
6. Optionally click **Run Single Goldfish** for a detailed turn-by-turn simulation  

---

## 📋 Decklist Format

Supported formats:
1 Sol Ring
Sol Ring
1x Sol Ring
Sol Ring x1


- Section headers like `Creatures`, `Lands`, etc. are ignored  
- Quantities are automatically expanded (e.g., `49 Island` = 49 cards)  

---

## 🧠 The Rating System

The deck is evaluated using **7 core categories**, each scored from **0–5**.

---

### 1. Mana Speed

| Score | Meaning |
|------|--------|
| 0 | Very slow, clunky, low ramp |
| 1 | A little ramp, often behind |
| 2 | Normal casual ramp package |
| 3 | Good ramp, reliable acceleration |
| 4 | Fast starts, efficient mana base |
| 5 | Fast mana, explosive starts |

---

### 2. Card Advantage & Consistency

| Score | Meaning |
|------|--------|
| 0 | Runs out of cards constantly |
| 1 | A little draw, inconsistent |
| 2 | Normal casual draw |
| 3 | Strong draw engines, good flow |
| 4 | Excellent draw, filtering, recursion |
| 5 | Tutors + draw + redundancy |

---

### 3. Interaction

| Score | Meaning |
|------|--------|
| 0 | Barely any removal |
| 1 | A few answers, often too late |
| 2 | Normal casual removal |
| 3 | Good interaction spread |
| 4 | Efficient answers, strong interaction |
| 5 | High interaction density, very efficient |

---

### 4. Commander Dependence

| Score | Meaning |
|------|--------|
| 0 | Deck barely works without commander |
| 1 | Major collapse without commander |
| 2 | Commander is very important |
| 3 | Works without commander |
| 4 | Strong shell independent of commander |
| 5 | Commander optional / not needed |

---

### 5. Win Speed

| Score | Meaning |
|------|--------|
| 0 | Turn 12+ |
| 1 | Turn 10–12 |
| 2 | Turn 8–10 |
| 3 | Turn 6–9 |
| 4 | Turn 4–7 |
| 5 | Turn 3–5 |

---

### 6. Win Quality

| Score | Meaning |
|------|--------|
| 0 | No clear win plan |
| 1 | Wins by random combat |
| 2 | Clear plan but slow/fragile |
| 3 | Strong synergy finish |
| 4 | Compact, reliable win lines |
| 5 | Deterministic combo |

---

### 7. Resilience

| Score | Meaning |
|------|--------|
| 0 | One wipe ends the game |
| 1 | Struggles after interaction |
| 2 | Some rebuild potential |
| 3 | Good recursion/recovery |
| 4 | Strong protection and rebuild |
| 5 | Very hard to stop permanently |
---

## 🧮 Bracket System

After scoring all categories (max = 35):

| Total Score | Bracket |
|------------|--------|
| 0–8        | 1 — Jank / Theme |
| 9–14       | 2 — Casual |
| 15–23      | 3 — High-Power Casual |
| 24–31      | 4 — cEDH Adjacent |
| 32–35      | 5 — Competitive (cEDH) |

---

## 🔢 Decimal Ratings

Decimals refine placement within a bracket:

| Decimal | Meaning |
|--------|--------|
| .1–.2  | Low end |
| .3–.4  | Solid |
| .5–.6  | Strong |
| .7–.8  | Very strong |
| .9     | Near next bracket |

**Example:**
> **3.7** = Very strong high-power deck, approaching cEDH

---

## 🎲 Goldfish Simulation

The tool simulates **100 games** using:

- Randomized shuffle
- Opening hand + mulligan logic
- Land drop and ramp prioritization
- Commander casting priority
- Turn-by-turn play through **turn 20**

---

## 📊 Graphs Explained

### Mulligan Distribution
How often hands are kept vs mulliganed.

---

### Commander Cast Turn
When your commander typically enters play.

---

### Ramp / Draw / Removal / Protection Timing
When key resources become available.

---

### Utility Over Time
Tracks how many useful cards you have:
- In hand  
- On battlefield  

---

### Win / Overwhelm Distribution (Turn 1–20)
Estimates when your deck:
- Can realistically win  
- Becomes overwhelming  

---

## 📐 Mana Base Philosophy

Uses the **Frank Karsten formula**:
31.42 + (3.13 × Average Mana Value) − (0.28 × Ramp Cards)


This estimates an **optimal land count**.

⚠️ This is a guideline, not a strict rule — some decks deviate intentionally.

---

## 🧪 Important Notes

- This is a **heuristic simulator**, not a full MTG rules engine  
- Results reflect **average gameplay**, not best-case scenarios  
- Card classification (ramp/draw/etc.) is automated and may not be perfect  
- Commander synergy is estimated, not deeply interpreted  

---

## 🚀 Future Improvements

- Manual card role tagging  
- Archetype detection (combo, control, aggro, etc.)  
- Better combo and win-condition recognition  
- Smarter mulligan logic  
- Automatic commander detection  

---

## 🎯 Philosophy

This tool is designed to:

- Be **honest**, not flattering  
- Reflect **real gameplay behavior**  
- Help explain **why a deck performs the way it does**

> A good rating doesn’t prove your deck is strong —  
> it explains how it behaves.

---

## 🧑‍💻 Technical Notes

- Runs entirely in the browser  
- No backend required  
- No API keys needed  
- Fully portable (just open the HTML file)  

---

## 🔥 Enjoy

Test your decks. Challenge assumptions.  
Find out what your deck *actually* does.
