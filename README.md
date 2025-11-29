# 🌌 **NEON ASCENSION**  
*A Retro Synthwave Roguelike Experience*

NEON ASCENSION is a fast-paced, neon-infused roguelike where you descend through an ever-changing procedural dungeon filled with monsters, scrolls, shrines, and deadly encounters. Built with a retro ASCII aesthetic and synthwave flair, every run challenges you to survive, adapt, and push for a new high score.

Play directly on mobile or desktop — full touch controls included.

---

## 🎮 **Gameplay Overview**

You control a lone hero represented by the **@** glyph, navigating a neon dungeon filled with:

- Procedurally generated floors  
- Monsters that get stronger with depth  
- Treasure, shrines, and magic scrolls  
- Turn-based tactical combat  
- Class-unique abilities  
- Permanent high-score tracking per class  

Every action counts — one wrong move, and the neon fades to black.

---

## 🧪 **Features**

### 🔹 **Retro ASCII Roguelike Engine**
- Drunkard-walk procedural generation  
- FOV lighting system  
- Pixelated neon tiles rendered on HTML canvas  
- Smooth camera movement  
- Animated particles, damage numbers, and glows  

### 🔹 **Three Fully Playable Classes**
Each class has unique mechanics, stats, scrolls, and progression.

---

## ⚔️ **Classes**

### 🛡️ **WARRIOR**
- High HP and melee power  
- Gains **+1 STR per level**  
- Scrolls of **Fury** empower the next hit (double damage, heal 5 HP)  
- HUD shows **STR** instead of MP  

### 🗡️ **ROGUE**
- Agile critical-hit specialist  
- Gains **+5% crit per level**  
- Scrolls of **Invisibility** grant 3 turns unseen and a guaranteed **Backstab**  
- HUD shows **CRIT%**  
- Backstab = `(STR + 2) × 3`

### 🔥 **MAGE**
- Fragile, high-damage caster  
- Starts with **Fireball** (AOE, costs 5 MP)  
- Gains **+1 max mana** per level  
- Scrolls grant a **10HP Spellshield**  
- HUD shows **MP**  
- Fireball damage scales `(3 + level × 0.65)`

---

## 🧩 **Dungeon Elements**

### 🟪 Stairs
Advance to the next depth and reset the floor.

### 🟨 Shrines
Refill all potions once per floor.

### 🟦 Scrolls
Class-specific magical powerups.

### 🟥 Monsters
Enemies scale by depth and include:

- Rat (r)  
- Goblin (g)  
- Orc (o)  
- Dragon (D)

Each has unique HP and STR scaling.

---

## 🎹 **Controls**

### **Keyboard**
| Action | Key |
|--------|-----|
| Move | Arrow Keys |
| Attack / Interact | **A** |
| Magic / Scroll | **F** |
| Potion | **P** |
| Stats | **I** (toggle open/close) |
| Menu | **M** |
| Pass (no longer allowed) | `.` |

### **Mobile Touch Controls**
Includes a full 3×3 digital D-pad with action buttons:

- MAGIC(F)  
- ACT(A)  
- MENU(M)  
- HEAL(P)  
- STATS(I)

---

## 🏆 **Scoring System**

Your score is calculated as:

Highscores are stored **per class** using browser local storage and displayed on the title screen.

---

## 💀 **Game Over**
When HP reaches zero, the run ends.  
Your high score is saved automatically if the run beats your previous record.

---

## 🖥️ **Technical Features**

- HTML5 Canvas rendering  
- Pure JavaScript engine  
- Neon CRT scanline overlay  
- Custom synthwave UI  
- Persistent localStorage highscores  
- Fullscreen support  
- Responsive UI for desktop + mobile  
- Manual, menu system, stats screen  

---

## 🚀 **How to Run**
Simply open:


Or play directly via GitHub Pages.

The game is 100% client-side — no backend required.

---

## 🧩 **Favicon**
Includes a custom neon icon designed specifically for this project.

To change it:

```html
<link rel="icon" type="image/png" href="favicon.png">

/index.html        Main game (HTML + JS + CSS combined)
/manifest.json     Progressive Web App settings
/favicon.png       Custom neon rogue icon
