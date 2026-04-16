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

### 1. Mana Speed
How quickly the deck ramps into meaningful plays.

- **0** — Very slow, clunky  
- **1** — Minimal ramp  
- **2** — Normal casual ramp  
- **3** — Good ramp, reliable acceleration  
- **4** — Fast starts, efficient mana  
- **5** — Explosive fast mana  

---

### 2. Card Advantage & Consistency
How well the deck keeps drawing and finding resources.

- **0** — Runs out of cards  
- **3** — Strong draw engines  
- **5** — Tutors + redundancy + filtering  

---

### 3. Interaction
How effectively the deck can stop opponents.

- **0** — Almost none  
- **3** — Solid interaction suite  
- **5** — Highly efficient, layered interaction  

---

### 4. Commander Dependence
How much the deck relies on its commander.

- **0** — Deck fails without commander  
- **3** — Works but better with commander  
- **5** — Fully independent shell  

---

### 5. Win Speed
How fast the deck realistically wins.

- **0** — Turn 12+  
- **3** — Turn 6–9  
- **5** — Turn 3–5  

---

### 6. Win Quality
How reliable and compact the win condition is.

- **0** — No clear win plan  
- **3** — Strong synergy-based finish  
- **5** — Deterministic combo  

---

### 7. Resilience
How well the deck recovers from disruption.

- **0** — Dies to one wipe  
- **3** — Can rebuild  
- **5** — Extremely resilient  

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
