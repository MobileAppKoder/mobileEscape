// ======================
// Global Settings & State
// ======================

const settings = {
  pinMaxAttempts: 10,
  puzzle2TimerSeconds: 300, // 5 minutes
  gridRows: 5,
  gridCols: 5,
  targetStreak: 5,
  hintIntervalSeconds: 30,
  soundOn: true,
};

const sessionState = {
  runStartTime: null,
  runEndTime: null,
  bestTimeSeconds: null,
};

// Puzzle 1: PIN
const gameState = {
  secretPin: [1, 2, 3, 4],
  revealed: [false, false, false, false],
  currentAttemptDigits: [null, null, null, null],
  cursorIndex: 0,
  maxAttempts: 10,
  attemptsLeft: 10,
  isLocked: true,
  inEvaluation: false,
};

// Puzzle 2: apps grid
const puzzle2State = {
  gridRows: 5,
  gridCols: 5,
  colors: ["red", "blue", "green", "orange", "yellow"],
  cellColorMap: [],
  targetStreak: 5,
  currentStreak: 0,
  chosenColor: null,
  timerSeconds: 300,
  timerId: null,
  gameOver: false,
};

// Puzzle 3: dialer
const puzzle3State = {
  secretNumber: [],
  revealedDigits: [false, false, false, false, false, false, false],
  userDigits: [null, null, null, null, null, null, null],
  currentIndex: 0,
  hintIntervalSeconds: 30,
  timeToNextHint: 30,
  hintTimerId: null,
  gameOver: false,
  readyToCall: false,
};

// timers
let statusBarIntervalId = null;

// DOM references
let screens;
let bestTimeDisplay;
let pinSlotsEls;
let pinAttemptsText;
let p2GridEl;
let p2TimerEl;
let p2TargetColorEl;
let p2StreakEl;
let dialerDisplayEl;
let dialerHintStatusEl;
let dialerCallBtn;
let endgameModal;
let endgameTitleEl;
let endgameMessageEl;
let endgameTimeEl;
let endgameBestEl;

// ===============
// Initialization
// ===============

window.addEventListener("load", () => {
  cacheDom();
  attachEventListeners();
  initStatusBarClock();
  loadBestTime();
  updateBestTimeDisplay();
  showScreen("splash");
});

// ===============
// DOM Helpers
// ===============

function cacheDom() {
  screens = document.querySelectorAll(".screen");
  bestTimeDisplay = document.getElementById("best-time-display");
  pinSlotsEls = document.querySelectorAll("#pin-slots .pin-slot");
  pinAttemptsText = document.getElementById("pin-attempts-text");
  p2GridEl = document.getElementById("p2-grid");
  p2TimerEl = document.getElementById("p2-timer");
  p2TargetColorEl = document.getElementById("p2-target-color");
  p2StreakEl = document.getElementById("p2-streak");
  dialerDisplayEl = document.getElementById("dialer-display");
  dialerHintStatusEl = document.getElementById("dialer-hint-status");
  dialerCallBtn = document.getElementById("dialer-call");
  endgameModal = document.getElementById("endgame-modal");
  endgameTitleEl = document.getElementById("endgame-title");
  endgameMessageEl = document.getElementById("endgame-message");
  endgameTimeEl = document.getElementById("endgame-time");
  endgameBestEl = document.getElementById("endgame-best");
}

function attachEventListeners() {
  // Splash
  document.getElementById("btn-start").addEventListener("click", startNewRun);
  document
    .getElementById("btn-open-settings")
    .addEventListener("click", openSettingsModal);

  // Settings
  document
    .getElementById("btn-settings-cancel")
    .addEventListener("click", closeSettingsModal);
  document
    .getElementById("btn-settings-save")
    .addEventListener("click", saveSettingsFromModal);

  // PIN keypad
  document.querySelectorAll(".key-pin").forEach((btn) => {
    btn.addEventListener("click", () => {
      const digit = parseInt(btn.dataset.pinDigit, 10);
      handlePinDigit(digit);
    });
  });

  // Puzzle 2 grid uses delegated events (we rebuild grid)
  p2GridEl.addEventListener("mousedown", onP2GridPress);
  p2GridEl.addEventListener("mouseup", onP2GridRelease);
  p2GridEl.addEventListener("touchstart", onP2GridPress, { passive: true });
  p2GridEl.addEventListener("touchend", onP2GridRelease);

  // Dialer keypad
  document.querySelectorAll(".dial-key").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      handleDialerKeyPress(key);
    });
  });

  document
    .getElementById("dialer-backspace")
    .addEventListener("click", handleDialerBackspace);
  dialerCallBtn.addEventListener("click", handleDialerCall);

  // Endgame modal
  document
    .getElementById("btn-endgame-close")
    .addEventListener("click", () => {
      hideEndgameModal();
      showScreen("splash");
    });
  document
    .getElementById("btn-endgame-restart")
    .addEventListener("click", () => {
      hideEndgameModal();
      startNewRun();
    });
}

// ===============
// Screen handling
// ===============

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });
  const target = document.getElementById(`screen-${name}`);
  if (target) {
    target.classList.add("active");
  }
}

// =================
// Status bar clock
// =================

function initStatusBarClock() {
  updateStatusBarTime();
  if (statusBarIntervalId) {
    clearInterval(statusBarIntervalId);
  }
  statusBarIntervalId = setInterval(updateStatusBarTime, 1000);
  // Fake battery percent static for now
  document.getElementById("battery-percent").textContent = "78%";
}

function updateStatusBarTime() {
  const now = new Date();
  document.getElementById("status-time").textContent = formatTime12Hour(now);
}

function formatTime12Hour(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hours}:${minutesStr} ${ampm}`;
}

// ===================
// Best time handling
// ===================

function loadBestTime() {
  const raw = localStorage.getItem("phonePuzzleBestTime");
  if (raw) {
    const sec = parseInt(raw, 10);
    if (!isNaN(sec) && sec > 0) {
      sessionState.bestTimeSeconds = sec;
    }
  }
}

function saveBestTime(seconds) {
  sessionState.bestTimeSeconds = seconds;
  localStorage.setItem("phonePuzzleBestTime", String(seconds));
}

function updateBestTimeDisplay() {
  if (sessionState.bestTimeSeconds == null) {
    bestTimeDisplay.textContent = "Best time: --:--";
  } else {
    bestTimeDisplay.textContent =
      "Best time: " + formatTotalTime(sessionState.bestTimeSeconds);
  }
}

function formatTotalTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ===============
// Settings modal
// ===============

function openSettingsModal() {
  // preload inputs from current settings
  document.getElementById("setting-pin-attempts").value =
    settings.pinMaxAttempts;
  document.getElementById("setting-p2-rows").value = settings.gridRows;
  document.getElementById("setting-p2-cols").value = settings.gridCols;
  document.getElementById("setting-p2-streak").value = settings.targetStreak;
  document.getElementById("setting-p2-mins").value =
    settings.puzzle2TimerSeconds / 60;
  document.getElementById("setting-p3-interval").value =
    settings.hintIntervalSeconds;
  document.getElementById("setting-sound").checked = settings.soundOn;

  document.getElementById("settings-modal").classList.remove("hidden");
}

function closeSettingsModal() {
  document.getElementById("settings-modal").classList.add("hidden");
}

function saveSettingsFromModal() {
  const pinAttempts = parseInt(
    document.getElementById("setting-pin-attempts").value,
    10
  );
  const rows = parseInt(document.getElementById("setting-p2-rows").value, 10);
  const cols = parseInt(document.getElementById("setting-p2-cols").value, 10);
  const streak = parseInt(
    document.getElementById("setting-p2-streak").value,
    10
  );
  const mins = parseInt(document.getElementById("setting-p2-mins").value, 10);
  const interval = parseInt(
    document.getElementById("setting-p3-interval").value,
    10
  );
  const soundOn = document.getElementById("setting-sound").checked;

  if (!isNaN(pinAttempts) && pinAttempts > 0) {
    settings.pinMaxAttempts = pinAttempts;
  }
  if (!isNaN(rows) && rows >= 3 && rows <= 7) {
    settings.gridRows = rows;
  }
  if (!isNaN(cols) && cols >= 3 && cols <= 7) {
    settings.gridCols = cols;
  }
  if (!isNaN(streak) && streak >= 3 && streak <= 10) {
    settings.targetStreak = streak;
  }
  if (!isNaN(mins) && mins >= 1 && mins <= 10) {
    settings.puzzle2TimerSeconds = mins * 60;
  }
  if (!isNaN(interval) && [15, 30, 45, 60].includes(interval)) {
    settings.hintIntervalSeconds = interval;
  }
  settings.soundOn = soundOn;

  closeSettingsModal();
}

// ===============
// Run lifecycle
// ===============

function startNewRun() {
  stopAllTimers();
  resetAllPuzzlesFromSettings();
  sessionState.runStartTime = performance.now();
  sessionState.runEndTime = null;
  showScreen("lock");
}

function stopAllTimers() {
  if (puzzle2State.timerId) {
    clearInterval(puzzle2State.timerId);
    puzzle2State.timerId = null;
  }
  if (puzzle3State.hintTimerId) {
    clearInterval(puzzle3State.hintTimerId);
    puzzle3State.hintTimerId = null;
  }
}

function resetAllPuzzlesFromSettings() {
  // Puzzle 1
  gameState.secretPin = generateRandomPin();
  gameState.revealed = [false, false, false, false];
  gameState.currentAttemptDigits = [null, null, null, null];
  gameState.cursorIndex = 0;
  gameState.maxAttempts = settings.pinMaxAttempts;
  gameState.attemptsLeft = settings.pinMaxAttempts;
  gameState.isLocked = true;
  gameState.inEvaluation = false;
  renderPinSlots();
  updatePinAttemptsText();

  // Puzzle 2
  puzzle2State.gridRows = settings.gridRows;
  puzzle2State.gridCols = settings.gridCols;
  puzzle2State.cellColorMap = [];
  puzzle2State.targetStreak = settings.targetStreak;
  puzzle2State.currentStreak = 0;
  puzzle2State.chosenColor = null;
  puzzle2State.timerSeconds = settings.puzzle2TimerSeconds;
  puzzle2State.timerId = null;
  puzzle2State.gameOver = false;
  renderPuzzle2Timer();
  p2TargetColorEl.textContent = "Target color: --";
  p2StreakEl.textContent = `Streak: 0 / ${puzzle2State.targetStreak}`;
  p2GridEl.innerHTML = "";

  // Puzzle 3
  puzzle3State.secretNumber = [];
  puzzle3State.revealedDigits = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  puzzle3State.userDigits = [null, null, null, null, null, null, null];
  puzzle3State.currentIndex = 0;
  puzzle3State.hintIntervalSeconds = settings.hintIntervalSeconds;
  puzzle3State.timeToNextHint = settings.hintIntervalSeconds;
  puzzle3State.hintTimerId = null;
  puzzle3State.gameOver = false;
  puzzle3State.readyToCall = false;
  dialerCallBtn.disabled = true;
  dialerHintStatusEl.textContent = "";
  renderDialerDisplay();
}

// ===============
// Puzzle 1: PIN
// ===============

function generateRandomPin() {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }
  return arr;
}

function updatePinAttemptsText() {
  pinAttemptsText.textContent = `Attempts remaining: ${gameState.attemptsLeft}`;
}

function getNextUnknownPinIndex() {
  for (let i = 0; i < 4; i++) {
    if (!gameState.revealed[i] && gameState.currentAttemptDigits[i] === null) {
      return i;
    }
  }
  return -1;
}

function renderPinSlots({ showErrors = false } = {}) {
  for (let i = 0; i < 4; i++) {
    const slot = pinSlotsEls[i];
    slot.classList.remove("cursor", "revealed", "error");
    let text = "";
    if (gameState.revealed[i]) {
      text = gameState.secretPin[i];
      slot.classList.add("revealed");
    } else if (
      gameState.currentAttemptDigits[i] !== null &&
      showErrors &&
      gameState.currentAttemptDigits[i] !== gameState.secretPin[i]
    ) {
      text = "*";
      slot.classList.add("error");
    } else if (gameState.currentAttemptDigits[i] !== null) {
      // show the attempted digit during input
      text = gameState.currentAttemptDigits[i];
    } else {
      text = "_";
    }
    slot.textContent = text;
  }
  // cursor highlight
  const idx = getNextUnknownPinIndex();
  if (idx >= 0) {
    pinSlotsEls[idx].classList.add("cursor");
  }
}

function handlePinDigit(digit) {
  if (!gameState.isLocked) return;
  if (gameState.inEvaluation) return;
  if (gameState.attemptsLeft <= 0) return;

  let idx = getNextUnknownPinIndex();
  if (idx === -1) {
    // all unknown positions already filled; ignore extra
    return;
  }

  gameState.currentAttemptDigits[idx] = digit;
  renderPinSlots();

  // If no more unknowns, evaluate attempt
  if (getNextUnknownPinIndex() === -1) {
    evaluatePinAttempt();
  }
}

function evaluatePinAttempt() {
  gameState.inEvaluation = true;

  let newReveal = false;
  for (let i = 0; i < 4; i++) {
    if (!gameState.revealed[i]) {
      if (gameState.currentAttemptDigits[i] === gameState.secretPin[i]) {
        gameState.revealed[i] = true;
        newReveal = true;
      }
    }
  }

  gameState.attemptsLeft -= 1;
  updatePinAttemptsText();
  renderPinSlots({ showErrors: true });

  // Check for success
  if (gameState.revealed.every((x) => x)) {
    // Unlock success
    gameState.isLocked = false;
    setTimeout(() => {
      onPuzzle1Solved();
    }, 600);
    return;
  }

  if (gameState.attemptsLeft <= 0) {
    // Game over from PIN
    setTimeout(() => {
      endGame(false, "You ran out of PIN attempts.");
    }, 700);
    return;
  }

  // Show * for this attempt briefly, then reset unknowns to blanks
  setTimeout(() => {
    gameState.currentAttemptDigits = [null, null, null, null];
    gameState.inEvaluation = false;
    renderPinSlots();
  }, 700);
}

function onPuzzle1Solved() {
  // Small delay then transition
  showScreen("home");
  initPuzzle2();
}

// ===============
// Puzzle 2: apps grid
// ===============

const APP_LIST = [
  { emoji: "📞", label: "Phone" },
  { emoji: "💬", label: "Messages" },
  { emoji: "📧", label: "Mail" },
  { emoji: "📷", label: "Camera" },
  { emoji: "🖼️", label: "Photos" },
  { emoji: "📘", label: "Facebook" },
  { emoji: "🐦", label: "Twitter" },
  { emoji: "📸", label: "Instagram" },
  { emoji: "👾", label: "Discord" },
  { emoji: "🎵", label: "Spotify" },
  { emoji: "▶️", label: "YouTube" },
  { emoji: "🗺️", label: "Maps" },
  { emoji: "🧭", label: "Browser" },
  { emoji: "📝", label: "Notes" },
  { emoji: "🗓️", label: "Calendar" },
  { emoji: "🛠️", label: "Settings" },
  { emoji: "💻", label: "GitHub" },
  { emoji: "🧠", label: "AI" },
  { emoji: "🛒", label: "Shop" },
  { emoji: "🎮", label: "Games" },
  { emoji: "💡", label: "Ideas" },
  { emoji: "📁", label: "Files" },
  { emoji: "🌐", label: "Chrome" },
  { emoji: "✉️", label: "Gmail" },
  { emoji: "📚", label: "Docs" },
];

function initPuzzle2() {
  puzzle2State.currentStreak = 0;
  puzzle2State.chosenColor = null;
  puzzle2State.timerSeconds = settings.puzzle2TimerSeconds;
  puzzle2State.gameOver = false;

  buildPuzzle2Grid();
  renderPuzzle2Timer();
  updatePuzzle2StreakUI();

  if (puzzle2State.timerId) {
    clearInterval(puzzle2State.timerId);
  }
  puzzle2State.timerId = setInterval(() => {
    if (puzzle2State.gameOver) return;
    puzzle2State.timerSeconds -= 1;
    if (puzzle2State.timerSeconds <= 0) {
      puzzle2State.timerSeconds = 0;
      renderPuzzle2Timer();
      puzzle2State.gameOver = true;
      clearInterval(puzzle2State.timerId);
      puzzle2State.timerId = null;
      endGame(false, "You ran out of time on the app grid.");
    } else {
      renderPuzzle2Timer();
    }
  }, 1000);
}

function buildPuzzle2Grid() {
  const rows = puzzle2State.gridRows;
  const cols = puzzle2State.gridCols;
  const totalCells = rows * cols;

  p2GridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  p2GridEl.innerHTML = "";

  // cellColorMap random
  puzzle2State.cellColorMap = [];
  for (let i = 0; i < totalCells; i++) {
    const color =
      puzzle2State.colors[
        Math.floor(Math.random() * puzzle2State.colors.length)
      ];
    puzzle2State.cellColorMap.push(color);
  }

  // apps assignment
  const appsShuffled = [...APP_LIST];
  // simple shuffle
  for (let i = appsShuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [appsShuffled[i], appsShuffled[j]] = [appsShuffled[j], appsShuffled[i]];
  }

  for (let i = 0; i < totalCells; i++) {
    const app = appsShuffled[i % appsShuffled.length];
    const cell = document.createElement("div");
    cell.className = "app-icon";
    cell.dataset.index = String(i);

    const overlay = document.createElement("div");
    overlay.className = "app-color-overlay";
    overlay.style.background = getColorBackground(
      puzzle2State.cellColorMap[i]
    );
    cell.appendChild(overlay);

    const emoji = document.createElement("div");
    emoji.className = "app-emoji";
    emoji.textContent = app.emoji;
    cell.appendChild(emoji);

    const label = document.createElement("div");
    label.className = "app-label";
    label.textContent = app.label;
    cell.appendChild(label);

    p2GridEl.appendChild(cell);
  }
}

function getColorBackground(color) {
  switch (color) {
    case "red":
      return "linear-gradient(135deg,#f97373,#ef4444)";
    case "blue":
      return "linear-gradient(135deg,#38bdf8,#3b82f6)";
    case "green":
      return "linear-gradient(135deg,#4ade80,#22c55e)";
    case "orange":
      return "linear-gradient(135deg,#fb923c,#f97316)";
    case "yellow":
      return "linear-gradient(135deg,#facc15,#eab308)";
    default:
      return "#64748b";
  }
}

function renderPuzzle2Timer() {
  const total = puzzle2State.timerSeconds;
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  const text = `${minutes.toString()}:${seconds
    .toString()
    .padStart(2, "0")}`;
  p2TimerEl.textContent = text;
  p2TimerEl.classList.remove("warning", "danger");
  if (total <= 30) {
    p2TimerEl.classList.add("danger");
  } else if (total <= 60) {
    p2TimerEl.classList.add("warning");
  }
}

function updatePuzzle2StreakUI() {
  const t = puzzle2State.targetStreak;
  const s = puzzle2State.currentStreak;
  p2StreakEl.textContent = `Streak: ${s} / ${t}`;
  if (puzzle2State.chosenColor) {
    p2TargetColorEl.textContent = `Target color: ${puzzle2State.chosenColor}`;
  } else {
    p2TargetColorEl.textContent = "Target color: --";
  }
}

// Events for pressing/releasing app icons

function onP2GridPress(e) {
  const cell = e.target.closest(".app-icon");
  if (!cell) return;
  if (puzzle2State.gameOver) return;

  cell.classList.add("show-color");
}

function onP2GridRelease(e) {
  const cell = e.target.closest(".app-icon");
  if (!cell) return;
  if (puzzle2State.gameOver) return;

  cell.classList.remove("show-color");
  const index = parseInt(cell.dataset.index, 10);
  handlePuzzle2CellTap(index);
}

function handlePuzzle2CellTap(index) {
  const color = puzzle2State.cellColorMap[index];

  if (puzzle2State.currentStreak === 0) {
    // start new streak
    puzzle2State.chosenColor = color;
    puzzle2State.currentStreak = 1;
    updatePuzzle2StreakUI();
    return;
  }

  if (color === puzzle2State.chosenColor) {
    // good
    puzzle2State.currentStreak += 1;
    updatePuzzle2StreakUI();
    if (puzzle2State.currentStreak >= puzzle2State.targetStreak) {
      onPuzzle2Solved();
    }
  } else {
    // mismatch: reset streak and chosenColor
    puzzle2State.currentStreak = 0;
    puzzle2State.chosenColor = null;
    updatePuzzle2StreakUI();
  }
}

function onPuzzle2Solved() {
  puzzle2State.gameOver = true;
  if (puzzle2State.timerId) {
    clearInterval(puzzle2State.timerId);
    puzzle2State.timerId = null;
  }
  // Brief pause then go to dialer
  setTimeout(() => {
    showScreen("dialer");
    initPuzzle3();
  }, 600);
}

// ===============
// Puzzle 3: dialer
// ===============

function initPuzzle3() {
  // random 7-digit number
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }
  puzzle3State.secretNumber = arr;
  puzzle3State.revealedDigits = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  puzzle3State.userDigits = [null, null, null, null, null, null, null];
  puzzle3State.currentIndex = 0;
  puzzle3State.hintIntervalSeconds = settings.hintIntervalSeconds;
  puzzle3State.timeToNextHint = settings.hintIntervalSeconds;
  puzzle3State.gameOver = false;
  puzzle3State.readyToCall = false;
  dialerCallBtn.disabled = true;
  dialerHintStatusEl.textContent = "";
  renderDialerDisplay();

  if (puzzle3State.hintTimerId) {
    clearInterval(puzzle3State.hintTimerId);
  }
  puzzle3State.hintTimerId = setInterval(() => {
    if (puzzle3State.gameOver) return;
    puzzle3State.timeToNextHint -= 1;
    if (puzzle3State.timeToNextHint <= 0) {
      // small glitch feedback
      dialerDisplayEl.classList.add("glitch");
      setTimeout(() => dialerDisplayEl.classList.remove("glitch"), 250);
      revealNextDigitOrLose();
      if (!puzzle3State.gameOver) {
        puzzle3State.timeToNextHint = puzzle3State.hintIntervalSeconds;
      }
    }
  }, 1000);
}

function renderDialerDisplay() {
  const digits = puzzle3State.userDigits;
  let first = "";
  let second = "";
  for (let i = 0; i < 3; i++) {
    first += digits[i] === null ? "_" : digits[i];
  }
  for (let i = 3; i < 7; i++) {
    second += digits[i] === null ? "_" : digits[i];
  }
  dialerDisplayEl.textContent = `${first}-${second}`;
}

function handleDialerKeyPress(key) {
  if (puzzle3State.gameOver) return;

  // Only digits matter for progression, but we can show * and #
  if (!/^[0-9*#]$/.test(key)) return;

  const idx = puzzle3State.currentIndex;
  if (idx > 6) return;

  // If this index already revealed by hint, move to next editable index
  if (puzzle3State.revealedDigits[idx]) {
    moveToNextEditableIndex();
    return;
  }

  // record the pressed key
  if (/^[0-9]$/.test(key)) {
    const digit = parseInt(key, 10);
    puzzle3State.userDigits[idx] = digit;
    renderDialerDisplay();

    if (digit === puzzle3State.secretNumber[idx]) {
      // correct digit
      puzzle3State.timeToNextHint += puzzle3State.hintIntervalSeconds;
      showDialerHintStatus(
        `+${puzzle3State.hintIntervalSeconds}s for correct digit`
      );

      moveToNextEditableIndex();
      if (checkIfNumberCompleteAndCorrect()) {
        lightUpCallButton();
      }
    } else {
      // wrong digit; do not move index
      showDialerHintStatus("Wrong digit for this position");
    }
  } else {
    // * or #, always wrong, but display them (then overridden later)
    puzzle3State.userDigits[idx] = key;
    renderDialerDisplay();
    showDialerHintStatus("* and # won't help here");
  }
}

function moveToNextEditableIndex() {
  for (let i = puzzle3State.currentIndex + 1; i < 7; i++) {
    if (!puzzle3State.revealedDigits[i]) {
      puzzle3State.currentIndex = i;
      return;
    }
  }
  // nothing left
  puzzle3State.currentIndex = 7;
}

function handleDialerBackspace() {
  if (puzzle3State.gameOver) return;

  // find previous index that is not revealed and has something
  let idx = puzzle3State.currentIndex;
  if (idx > 6) idx = 7;
  for (let i = idx - 1; i >= 0; i--) {
    if (!puzzle3State.revealedDigits[i] && puzzle3State.userDigits[i] != null) {
      puzzle3State.userDigits[i] = null;
      puzzle3State.currentIndex = i;
      renderDialerDisplay();
      return;
    }
  }
}

function revealNextDigitOrLose() {
  // find first unrevealed digit
  let idx = -1;
  for (let i = 0; i < 7; i++) {
    if (!puzzle3State.revealedDigits[i]) {
      idx = i;
      break;
    }
  }
  if (idx === -1) {
    // all revealed or completed
    return;
  }

  if (idx === 6) {
    // last digit would be revealed -> game over
    onPuzzle3Loss();
    return;
  }

  // reveal this digit
  puzzle3State.revealedDigits[idx] = true;
  puzzle3State.userDigits[idx] = puzzle3State.secretNumber[idx];
  renderDialerDisplay();
  showDialerHintStatus("A digit was revealed for you");

  // set currentIndex to next unrevealed
  for (let i = 0; i < 7; i++) {
    if (!puzzle3State.revealedDigits[i]) {
      puzzle3State.currentIndex = i;
      return;
    }
  }
  puzzle3State.currentIndex = 7;
}

function onPuzzle3Loss() {
  puzzle3State.gameOver = true;
  if (puzzle3State.hintTimerId) {
    clearInterval(puzzle3State.hintTimerId);
    puzzle3State.hintTimerId = null;
  }
  endGame(false, "The last digit was about to be revealed.");
}

function checkIfNumberCompleteAndCorrect() {
  for (let i = 0; i < 7; i++) {
    if (puzzle3State.userDigits[i] === null) return false;
    if (puzzle3State.userDigits[i] !== puzzle3State.secretNumber[i])
      return false;
  }
  return true;
}

function lightUpCallButton() {
  puzzle3State.readyToCall = true;
  dialerCallBtn.disabled = false;
}

function handleDialerCall() {
  if (!puzzle3State.readyToCall || puzzle3State.gameOver) return;
  puzzle3State.gameOver = true;
  if (puzzle3State.hintTimerId) {
    clearInterval(puzzle3State.hintTimerId);
    puzzle3State.hintTimerId = null;
  }
  endGame(true, "You successfully dialed the secret number!");
}

function showDialerHintStatus(text) {
  dialerHintStatusEl.textContent = text;
  setTimeout(() => {
    if (dialerHintStatusEl.textContent === text) {
      dialerHintStatusEl.textContent = "";
    }
  }, 2000);
}

// ===============
// End game (win/lose)
// ===============

function endGame(didWin, reason) {
  stopAllTimers();
  sessionState.runEndTime = performance.now();

  const totalMs =
    sessionState.runStartTime != null && sessionState.runEndTime != null
      ? sessionState.runEndTime - sessionState.runStartTime
      : 0;
  const totalSeconds = Math.max(0, Math.round(totalMs / 1000));

  if (didWin) {
    const timeStr = formatTotalTime(totalSeconds);
    endgameTitleEl.textContent = "🎉 Congratulations!";
    endgameMessageEl.textContent =
      "You completed all three puzzles and unlocked the phone!";
    endgameTimeEl.textContent = `Your time: ${timeStr}`;

    // best time
    if (
      sessionState.bestTimeSeconds == null ||
      totalSeconds < sessionState.bestTimeSeconds
    ) {
      saveBestTime(totalSeconds);
      updateBestTimeDisplay();
      endgameBestEl.textContent = "New record! This is your time to beat.";
    } else {
      endgameBestEl.textContent =
        "Best time: " + formatTotalTime(sessionState.bestTimeSeconds);
    }
  } else {
    endgameTitleEl.textContent = "Game Over";
    endgameMessageEl.textContent = reason || "The game has ended.";
    endgameTimeEl.textContent = "";
    endgameBestEl.textContent = "";
  }

  showEndgameModal();
}

function showEndgameModal() {
  endgameModal.classList.remove("hidden");
}

function hideEndgameModal() {
  endgameModal.classList.add("hidden");
}

// ===============
// (Optional) Sound
// ===============

function playSound(id) {
  if (!settings.soundOn) return;
  const el = document.getElementById(id);
  if (el && typeof el.play === "function") {
    el.currentTime = 0;
    el.play().catch(() => {});
  }
}
