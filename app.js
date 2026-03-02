const ROUND_SIZE = 10;

const LEVELS = [
  { id: 1, label: "レベル1", desc: "1桁同士の足し算", type: "addition" },
  { id: 2, label: "レベル2", desc: "2桁+1桁の足し算（合計20まで）", type: "addition" },
  { id: 3, label: "レベル3", desc: "10の倍数同士の足し算（合計100まで）", type: "addition" },
  { id: 4, label: "レベル4", desc: "2桁+1桁の足し算（合計100まで）", type: "addition" },
  { id: 5, label: "レベル5", desc: "2桁+10の倍数の足し算（合計100まで）", type: "addition" },
  { id: 6, label: "レベル6", desc: "2桁同士の足し算（合計100まで）", type: "addition" },
  { id: 7, label: "レベル7", desc: "1桁同士の引き算（答えは正の数）", type: "subtraction" },
  { id: 8, label: "レベル8", desc: "10~20からの1桁の引き算", type: "subtraction" },
  { id: 9, label: "レベル9", desc: "10の倍数同士の引き算（10~100）", type: "subtraction" },
  { id: 10, label: "レベル10", desc: "2桁-1桁（繰り下がりなし）", type: "subtraction" },
  { id: 11, label: "レベル11", desc: "2桁-10の倍数（答えは正の数）", type: "subtraction" },
  { id: 12, label: "レベル12", desc: "2桁同士の引き算（繰り下がりなし）", type: "subtraction" },
  { id: 13, label: "レベル13", desc: "2桁+1桁（繰り上がりあり・100まで）", type: "addition" },
  { id: 14, label: "レベル14", desc: "2桁-1桁（繰り下がりあり）", type: "subtraction" },
  { id: 15, label: "レベル15", desc: "2桁と2桁の足し算（繰り上がりあり、100まで）", type: "addition" },
  { id: 16, label: "レベル16", desc: "2桁と2桁の引き算（繰り下がりあり）", type: "subtraction" },
  { id: 17, label: "レベル17", desc: "2桁と2桁の足し算引き算（繰り上がり繰り下がりあり、答えは正の数）", type: "mixed" },
  { id: 18, label: "レベル18", desc: "3桁と1~2桁の足し算（繰り上がりありが問題数の60%、200未満の数同士、答えは正の数）", type: "addition" },
  { id: 19, label: "レベル19", desc: "3桁と1~2桁の引き算（繰り下がりありが問題数の60%、200未満の数同士、答えは正の数）", type: "subtraction" },
  { id: 20, label: "レベル20", desc: "3桁と1~2桁の足し算引き算（繰り上がり繰り下がりありが問題数の60%、合計が1000を超えない正の数）", type: "mixed" },
  { id: 21, label: "レベル21", desc: "2~19の数と2~10の掛け算", type: "multiplication" },
];

const landingView = document.getElementById("landing-view");
const gameView = document.getElementById("game-view");
const levelGrid = document.getElementById("level-grid");
const selectedLevelLabel = document.getElementById("selected-level-label");
const backButton = document.getElementById("back-button");

const timerEl = document.getElementById("timer");
const solvedCountEl = document.getElementById("solved-count");
const remainingCountEl = document.getElementById("remaining-count");
const questionLabel = document.getElementById("question-label");
const feedbackEl = document.getElementById("feedback");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const startButton = document.getElementById("start-button");
const numpad = document.getElementById("numpad");

let selectedLevel = null;
let queue = [];
let currentQuestion = null;
let solvedCount = 0;
let timerId = null;
let startedAt = null;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(list) {
  return list[randomInt(0, list.length - 1)];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestion(a, op, b) {
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { text: `${a} ${op} ${b} = ?`, answer };
}

function generateLevelQuestion(levelId) {
  switch (levelId) {
    case 1: {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      return buildQuestion(a, "+", b);
    }
    case 2: {
      const a = randomInt(10, 19);
      const b = randomInt(1, 9);
      return buildQuestion(a, "+", Math.min(b, 20 - a));
    }
    case 3: {
      const a = randomInt(1, 9) * 10;
      const b = randomInt(1, (100 - a) / 10) * 10;
      return buildQuestion(a, "+", b);
    }
    case 4: {
      const a = randomInt(10, 99);
      const b = randomInt(1, Math.min(9, 100 - a));
      return buildQuestion(a, "+", b);
    }
    case 5: {
      const b = randomInt(1, 9) * 10;
      const a = randomInt(10, 100 - b);
      return buildQuestion(a, "+", b);
    }
    case 6: {
      const a = randomInt(10, 90);
      const b = randomInt(10, 100 - a);
      return buildQuestion(a, "+", b);
    }
    case 7: {
      const a = randomInt(2, 9);
      const b = randomInt(1, a - 1);
      return buildQuestion(a, "-", b);
    }
    case 8: {
      const a = randomInt(10, 20);
      const b = randomInt(1, Math.min(9, a - 1));
      return buildQuestion(a, "-", b);
    }
    case 9: {
      const a = randomInt(2, 10) * 10;
      const b = randomInt(1, a / 10 - 1) * 10;
      return buildQuestion(a, "-", b);
    }
    case 10: {
      const onesA = randomInt(1, 9);
      const a = randomInt(1, 9) * 10 + onesA;
      const b = randomInt(1, onesA);
      return buildQuestion(a, "-", b);
    }
    case 11: {
      const a = randomInt(20, 99);
      const maxTen = Math.floor((a - 1) / 10);
      const b = randomInt(1, maxTen) * 10;
      return buildQuestion(a, "-", b);
    }
    case 12: {
      const tensA = randomInt(2, 9);
      const onesA = randomInt(0, 9);
      const tensB = randomInt(1, tensA);
      const onesB = randomInt(0, onesA);
      const a = tensA * 10 + onesA;
      const b = tensB * 10 + onesB;
      if (a <= b) {
        return generateLevelQuestion(12);
      }
      return buildQuestion(a, "-", b);
    }
    case 13: {
      const onesA = randomInt(1, 9);
      const a = randomInt(1, 9) * 10 + onesA;
      const b = randomInt(10 - onesA, Math.min(9, 100 - a));
      return buildQuestion(a, "+", b);
    }
    case 14: {
      const onesA = randomInt(0, 8);
      const a = randomInt(2, 9) * 10 + onesA;
      const b = randomInt(onesA + 1, 9);
      return buildQuestion(a, "-", b);
    }
    case 15: {
      const a = randomInt(11, 89);
      const minB = Math.max(10, 10 - (a % 10));
      const maxB = 100 - a;
      const b = randomInt(minB, maxB);
      if ((a % 10) + (b % 10) < 10) {
        return generateLevelQuestion(15);
      }
      return buildQuestion(a, "+", b);
    }
    case 16: {
      const onesA = randomInt(0, 8);
      const onesB = randomInt(onesA + 1, 9);
      const tensA = randomInt(2, 9);
      const tensB = randomInt(1, tensA - 1);
      const a = tensA * 10 + onesA;
      const b = tensB * 10 + onesB;
      return buildQuestion(a, "-", b);
    }
    case 17:
      return generateTwoDigitMixed();
    case 18:
      return generateThreeDigitAddition(199);
    case 19:
      return generateThreeDigitSubtraction(199);
    case 20:
      return generateThreeDigitMixedUnder1000();
    case 21: {
      const a = randomInt(2, 19);
      const b = randomInt(2, 10);
      return buildQuestion(a, "×", b);
    }
    default:
      return buildQuestion(1, "+", 1);
  }
}

function generateTwoDigitMixed() {
  if (Math.random() < 0.5) {
    const a = randomInt(10, 89);
    const b = randomInt(10, 99 - a);
    if (!hasCarryForNumbers(a, b)) {
      return generateTwoDigitMixed();
    }
    return buildQuestion(a, "+", b);
  }

  const onesA = randomInt(0, 8);
  const onesB = randomInt(onesA + 1, 9);
  const tensA = randomInt(2, 9);
  const tensB = randomInt(1, tensA - 1);
  const a = tensA * 10 + onesA;
  const b = tensB * 10 + onesB;
  return buildQuestion(a, "-", b);
}

function generateThreeDigitAddition(limit) {
  const a = randomInt(100, limit - 1);
  const b = randomInt(1, Math.min(99, limit - a));
  return buildQuestion(a, "+", b);
}

function generateThreeDigitSubtraction(limit) {
  const a = randomInt(100, limit);
  const b = randomInt(1, Math.min(99, a - 1));
  return buildQuestion(a, "-", b);
}

function generateThreeDigitMixedUnder1000() {
  if (Math.random() < 0.5) {
    return generateThreeDigitAddition(999);
  }
  return generateThreeDigitSubtraction(999);
}

function parseQuestion(question) {
  const [left, op, right] = question.text.split(" ");
  return { a: Number(left), op, b: Number(right) };
}

function hasCarryForNumbers(a, b) {
  return (a % 10) + (b % 10) >= 10;
}

function hasBorrowForNumbers(a, b) {
  return (a % 10) < (b % 10);
}

function hasCarryAddition(question) {
  const { a, b } = parseQuestion(question);
  return hasCarryForNumbers(a, b);
}

function hasBorrowSubtraction(question) {
  const { a, b } = parseQuestion(question);
  return hasBorrowForNumbers(a, b);
}

function generateRound(levelId) {
  if (![18, 19, 20].includes(levelId)) {
    return Array.from({ length: ROUND_SIZE }, () => generateLevelQuestion(levelId));
  }

  const needWithCarry = 6;
  const withCarry = [];
  const withoutCarry = [];

  while (withCarry.length < needWithCarry || withoutCarry.length < ROUND_SIZE - needWithCarry) {
    const q = generateLevelQuestion(levelId);
    const { op } = parseQuestion(q);
    const flag = op === "+" ? hasCarryAddition(q) : hasBorrowSubtraction(q);

    if (flag && withCarry.length < needWithCarry) {
      withCarry.push(q);
    } else if (!flag && withoutCarry.length < ROUND_SIZE - needWithCarry) {
      withoutCarry.push(q);
    }
  }

  return shuffle([...withCarry, ...withoutCarry]);
}

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateTimer() {
  if (!startedAt) {
    timerEl.textContent = "00:00";
    return;
  }
  timerEl.textContent = formatElapsed(Date.now() - startedAt);
}

function updateStatus() {
  solvedCountEl.textContent = solvedCount.toString();
  remainingCountEl.textContent = queue.length.toString();
}

function showNextQuestion() {
  currentQuestion = queue.shift() ?? null;
  updateStatus();

  if (!currentQuestion) {
    finishRound();
    return;
  }

  questionLabel.textContent = currentQuestion.text;
  answerInput.value = "";
}

function finishRound() {
  clearInterval(timerId);
  timerId = null;

  updateTimer();
  questionLabel.textContent = "🎉 クリア！おめでとう！";
  feedbackEl.textContent = `全10問クリア！タイム: ${timerEl.textContent}`;
  feedbackEl.className = "correct";

  toggleNumpad(false);
  startButton.disabled = false;
}

function startRound() {
  if (!selectedLevel) {
    return;
  }

  queue = generateRound(selectedLevel.id);
  solvedCount = 0;
  startedAt = Date.now();
  feedbackEl.textContent = "";
  feedbackEl.className = "";

  startButton.disabled = true;
  toggleNumpad(true);

  if (timerId) {
    clearInterval(timerId);
  }

  updateTimer();
  timerId = setInterval(updateTimer, 250);
  showNextQuestion();
}

function judgeAnswer(event) {
  event.preventDefault();
  if (!currentQuestion || answerInput.value === "") {
    return;
  }

  const typed = Number(answerInput.value);
  if (typed === currentQuestion.answer) {
    solvedCount += 1;
    feedbackEl.textContent = "⭕ 正解！";
    feedbackEl.className = "correct";
  } else {
    queue.push(currentQuestion);
    feedbackEl.textContent = `❌ ちがうよ。正解は ${currentQuestion.answer}。もう一度あとで出るよ。`;
    feedbackEl.className = "incorrect";
  }

  showNextQuestion();
}

function appendDigit(value) {
  if (startButton.disabled === false || !currentQuestion) {
    return;
  }
  if (answerInput.value === "0") {
    answerInput.value = value;
    return;
  }
  answerInput.value += value;
}

function backspaceAnswer() {
  answerInput.value = answerInput.value.slice(0, -1);
}

function clearAnswer() {
  answerInput.value = "";
}

function toggleNumpad(enabled) {
  numpad.querySelectorAll("button").forEach((button) => {
    button.disabled = !enabled;
  });
}

function renderNumpad() {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "←"];
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = key;
    button.className = "key";

    button.addEventListener("click", () => {
      if (/^\d$/.test(key)) {
        appendDigit(key);
      } else if (key === "C") {
        clearAnswer();
      } else {
        backspaceAnswer();
      }
    });

    numpad.appendChild(button);
  });

  const enterButton = document.createElement("button");
  enterButton.type = "button";
  enterButton.className = "key enter";
  enterButton.textContent = "回答";
  enterButton.addEventListener("click", () => answerForm.requestSubmit());
  numpad.appendChild(enterButton);

  toggleNumpad(false);
}

function goToLanding() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  queue = [];
  currentQuestion = null;
  solvedCount = 0;
  startedAt = null;
  answerInput.value = "";
  updateTimer();
  updateStatus();
  startButton.disabled = false;
  toggleNumpad(false);
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  questionLabel.textContent = "「ラウンド開始」を押してください。";

  gameView.classList.add("hidden");
  landingView.classList.remove("hidden");
}

function selectLevel(level) {
  selectedLevel = level;
  selectedLevelLabel.textContent = `${level.label}：${level.desc}`;
  landingView.classList.add("hidden");
  gameView.classList.remove("hidden");
  goToGameIdle();
}

function goToGameIdle() {
  queue = [];
  currentQuestion = null;
  solvedCount = 0;
  startedAt = null;
  answerInput.value = "";
  updateTimer();
  updateStatus();
  startButton.disabled = false;
  toggleNumpad(false);
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  questionLabel.textContent = "「ラウンド開始」を押してください。";
}

function renderLevels() {
  LEVELS.forEach((level) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-button";
    button.innerHTML = `<strong>${level.label}</strong><span>${level.desc}</span>`;
    button.addEventListener("click", () => selectLevel(level));
    levelGrid.appendChild(button);
  });
}

startButton.addEventListener("click", startRound);
answerForm.addEventListener("submit", judgeAnswer);
backButton.addEventListener("click", goToLanding);

renderLevels();
renderNumpad();
updateStatus();
