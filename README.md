# mobileEscape# 🔐 Mobile Escape – Phone Puzzle Game

**▶ Play the game now:**  
https://mobileappkoder.github.io/mobileEscape/

Welcome to **Mobile Escape**, a fully interactive, escape-room-style phone simulation built entirely with **HTML, CSS, and JavaScript**.  
Crack the PIN, outsmart the apps, and dial the secret number before the system locks you out.  
Your total time becomes the score to beat—good luck!

---

## 📱 Game Overview

Mobile Escape immerses you in a simulated smartphone OS with three escalating puzzles.  
Each puzzle flows naturally into the next, with animations, fake UI elements, and a clean mobile interface.

### **Puzzle 1 — PIN Lock**
- Solve a **4-digit PIN** with logic-based feedback.
- Correct digits are revealed per-slot across attempts.
- You cannot delete numbers.
- Attempts are limited (adjustable in Settings).
- Once all digits are revealed, the phone unlocks.

---

### **Puzzle 2 — App Grid Color Challenge**
- A grid of app icons (size adjustable in Settings).
- Pressing any app temporarily shows a hidden color.
- Choose a color and hit that same color **in a streak**.
- Reach the streak target (e.g., 5 in a row) without breaking it.
- Break your streak? Start over — but the color layout never changes.
- Finish the puzzle before the countdown hits zero!

---

### **Puzzle 3 — Secret Dialer**
- A phone dialer UI with numbers, *, #, backspace, and a call button.
- You must enter a **random 7-digit number** correctly.
- A hidden timer periodically reveals correct digits.
- If the final digit needs to be revealed → **game over**.
- Every correct guess earns **bonus time** (based on your interval setting).
- When all digits match, the call button activates — tap it to win!

---

## ⏱️ Game Timer & Victory
Your **total time from start to finish** is recorded.

At the end of a successful run, you’ll see:
- Your completion time  
- Your best time (saved in your browser)  
- A message encouraging you to beat your record next time

---

## ⚙️ Settings Menu

Players can customize:
- **PIN attempts**  
- **App grid size (rows / columns)**  
- **Target streak length**  
- **Puzzle 2 time limit**  
- **Puzzle 3 hint interval** (15s, 30s, 45s, 60s)  
- **Sound effects** (on/off)

Settings allow everything from casual to intense challenge modes.

---

## 🧩 Technology Used

This game is entirely front-end:

- **HTML5** (no external frameworks)
- **CSS3**  
  - Animations  
  - Transitions  
  - Responsive mobile-first design  
- **Vanilla JavaScript**  
  - Full state machine  
  - Puzzle logic  
  - UI rendering  
  - Timers, streak tracking, next-digit logic  
  - LocalStorage best-time tracking  

No servers, no libraries — completely GitHub Pages compatible.

---

## 📦 Project Structure
/mobileEscape
│
├── index.html # Main game interface and screens
├── style.css # Visual theme, animations, transitions, layout
└── script.js # Game logic, puzzles, state handling


Deploys instantly with GitHub Pages.

---

## 🚀 How to Deploy on GitHub Pages

1. Push `index.html`, `style.css`, and `script.js` to any public GitHub repo.  
2. Go to **Settings → Pages**  
3. Choose: **Deploy from branch → main → root**  
4. Your site will appear at:  
   `https://<username>.github.io/<repository>`  

This project is already live at:  
▶ https://mobileappkoder.github.io/mobileEscape/

---

## 🏆 Future Ideas (Optional Enhancements)
- Difficulty presets (Easy / Normal / Hard)
- Achievement badges
- Sound packs (retro, sci-fi, etc.)
- More puzzles/screens
- Daily time challenges

---

## 🙌 Credits

Designed, developed, and animated with 💻 + 🎨 + ☕  
No frameworks, no libraries — **just clean code**.

Enjoy the game, and try to beat your best time!



