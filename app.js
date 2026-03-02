const ROUND_SIZE = 10;

const PLAYER_CHARACTERS = [
  { name: "ヘラクレスオオカブト", image: "assets/characters/hercules.png" },
  { name: "スマトラオオヒラタクワガタ", image: "assets/characters/sumatra.png" },
  { name: "スピノサウルス", image: "assets/characters/spino.png" },
  { name: "ティラノサウルス", image: "assets/characters/tyranno.png" },
  { name: "ティタノボア", image: "assets/characters/titanoboa.png" },
  { name: "ファイアードレイク", image: "assets/characters/firedrake.png" },
];

const ENEMIES = [
  { name: "ミイデラゴミムシ", image: "assets/enemies/miidera.png" },
  { name: "パラケラテリウム", image: "assets/enemies/paraceratherium.png" },
  { name: "スミロドン", image: "assets/enemies/smilodon.png" },
  { name: "アルゲンタヴィス", image: "assets/enemies/argentavis.png" },
  { name: "ネプチューンオオカブト", image: "assets/enemies/neptune.png" },
  { name: "ライオン", image: "assets/enemies/lion.png" },
  { name: "キリン", image: "assets/enemies/giraffe.png" },
  { name: "カバ", image: "assets/enemies/hippo.png" },
  { name: "プルスサウルス", image: "assets/enemies/purussaurus.png" },
  { name: "ホホジロザメ", image: "assets/enemies/shark.png" },
  { name: "メガロドン", image: "assets/enemies/megalodon.png" },
  { name: "テリジノサウルス", image: "assets/enemies/therizino.png" },
  { name: "アロサウルス", image: "assets/enemies/allosaurus.png" },
  { name: "トリケラトプス", image: "assets/enemies/triceratops.png" },
  { name: "オニヤンマ", image: "assets/enemies/oniyanma.png" },
  { name: "デスストーカー", image: "assets/enemies/deathstalker.png" },
  { name: "コーカサスオオカブト", image: "assets/enemies/caucasus.png" },
  { name: "アルゼンチノサウルス", image: "assets/enemies/argentinosaurus.png" },
  { name: "インペリアルマンモス", image: "assets/enemies/imperial_mammoth.png" },
  { name: "オオエンマハンミョウ", image: "assets/enemies/enma.png" },
  { name: "応龍", image: "assets/enemies/ou_ryu.png" },
  { name: "レインボーサーペント", image: "assets/enemies/rainbow_serpent.png" },
  { name: "ムシュフシュ", image: "assets/enemies/mushhushshu.png" },
  { name: "ヒュドラ", image: "assets/enemies/hydra.png" },
  { name: "ヴリトラ", image: "assets/enemies/vritra.png" },
];

const ARITHMETIC_LEVELS = [
  { id: 1, label: "レベル1", desc: "1桁同士の足し算" },
  { id: 2, label: "レベル2", desc: "2桁+1桁の足し算（合計20まで）" },
  { id: 3, label: "レベル3", desc: "10の倍数同士の足し算（合計100まで）" },
  { id: 4, label: "レベル4", desc: "2桁+1桁の足し算（合計100まで）" },
  { id: 5, label: "レベル5", desc: "2桁+10の倍数の足し算（合計100まで）" },
  { id: 6, label: "レベル6", desc: "2桁同士の足し算（合計100まで）" },
  { id: 7, label: "レベル7", desc: "1桁同士の引き算（答えは正の数）" },
  { id: 8, label: "レベル8", desc: "10~20からの1桁の引き算" },
  { id: 9, label: "レベル9", desc: "10の倍数同士の引き算（10~100）" },
  { id: 10, label: "レベル10", desc: "2桁-1桁（繰り下がりなし）" },
  { id: 11, label: "レベル11", desc: "2桁-10の倍数（答えは正の数）" },
  { id: 12, label: "レベル12", desc: "2桁同士の引き算（繰り下がりなし）" },
  { id: 13, label: "レベル13", desc: "2桁+1桁（繰り上がりあり・100まで）" },
  { id: 14, label: "レベル14", desc: "2桁-1桁（繰り下がりあり）" },
  { id: 15, label: "レベル15", desc: "2桁と2桁の足し算（繰り上がりあり、100まで）" },
  { id: 16, label: "レベル16", desc: "2桁と2桁の引き算（繰り下がりあり）" },
  { id: 17, label: "レベル17", desc: "2桁と1桁の足し算引き算（繰り上がりあり、答えは正の数）" },
  { id: 18, label: "レベル18", desc: "2桁と2桁の足し算引き算（繰り上がり繰り下がりあり、答えは正の数）" },
  { id: 19, label: "レベル19", desc: "3桁と1~2桁の足し算（繰り上がり60%、200未満）" },
  { id: 20, label: "レベル20", desc: "3桁と1~2桁の引き算（繰り下がり60%、200未満）" },
  { id: 21, label: "レベル21", desc: "3桁と1~2桁の足し算引き算（繰り上がり繰り下がり60%、1000以下）" },
];

const MULTIPLICATION_LEVELS = [
  ...Array.from({ length: 19 }, (_, i) => ({ id: i + 1, label: `レベル${i + 1}`, desc: `${i + 1}の段（×1~×10）` })),
  { id: 20, label: "レベル20", desc: "2~9同士の掛け算" },
  { id: 21, label: "レベル21", desc: "11~19 と 2~9 の掛け算" },
];

const modeView = document.getElementById("mode-view");
const levelView = document.getElementById("level-view");
const gameView = document.getElementById("game-view");
const levelGrid = document.getElementById("level-grid");
const levelViewTitle = document.getElementById("level-view-title");
const selectedLevelLabel = document.getElementById("selected-level-label");
const selectedCharacterLabel = document.getElementById("selected-character-label");
const characterGrid = document.getElementById("character-grid");
const playerImage = document.getElementById("player-image");
const enemyImage = document.getElementById("enemy-image");
const playerNameEl = document.getElementById("player-name");
const enemyNameEl = document.getElementById("enemy-name");
const playerHpEl = document.getElementById("player-hp");
const enemyHpEl = document.getElementById("enemy-hp");
const solvedCountEl = document.getElementById("solved-count");
const questionLabel = document.getElementById("question-label");
const feedbackEl = document.getElementById("feedback");
const effectOverlay = document.getElementById("effect-overlay");
const enemyFighter = document.getElementById("enemy-fighter");
const victoryText = document.getElementById("victory-text");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const numpad = document.getElementById("numpad");
const startButton = document.getElementById("start-button");

let selectedTrack = null;
let selectedLevel = null;
let selectedCharacter = null;
let enemyCharacter = null;
let currentQuestion = null;
let solvedCount = 0;
let playerHp = 10;
let enemyHp = ROUND_SIZE;
let askedSet = new Set();

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
const buildQuestion = (a, op, b) => ({ text: `${a} ${op} ${b} = ?`, answer: op === "+" ? a + b : op === "-" ? a - b : a * b });

function generateArithmeticQuestion(levelId) {
  switch (levelId) {
    case 1: return buildQuestion(randomInt(1, 9), "+", randomInt(1, 9));
    case 2: { const a = randomInt(10, 19); return buildQuestion(a, "+", randomInt(1, Math.min(9, 20 - a))); }
    case 3: { const a = randomInt(1, 9) * 10; return buildQuestion(a, "+", randomInt(1, (100 - a) / 10) * 10); }
    case 4: { const a = randomInt(10, 99); return buildQuestion(a, "+", randomInt(1, Math.min(9, 100 - a))); }
    case 5: { const b = randomInt(1, 9) * 10; return buildQuestion(randomInt(10, 100 - b), "+", b); }
    case 6: { const a = randomInt(10, 90); return buildQuestion(a, "+", randomInt(10, 100 - a)); }
    case 7: { const a = randomInt(2, 9); return buildQuestion(a, "-", randomInt(1, a - 1)); }
    case 8: { const a = randomInt(10, 20); return buildQuestion(a, "-", randomInt(1, Math.min(9, a - 1))); }
    case 9: { const a = randomInt(2, 10) * 10; return buildQuestion(a, "-", randomInt(1, a / 10 - 1) * 10); }
    case 10: { const o = randomInt(1, 9); return buildQuestion(randomInt(1, 9) * 10 + o, "-", randomInt(1, o)); }
    case 11: { const a = randomInt(20, 99); return buildQuestion(a, "-", randomInt(1, Math.floor((a - 1) / 10)) * 10); }
    case 12: {
      const ta = randomInt(2, 9), oa = randomInt(0, 9), tb = randomInt(1, ta), ob = randomInt(0, oa);
      const a = ta * 10 + oa, b = tb * 10 + ob;
      return a <= b ? generateArithmeticQuestion(12) : buildQuestion(a, "-", b);
    }
    case 13: {
      const oa = randomInt(1, 9), a = randomInt(1, 9) * 10 + oa;
      return buildQuestion(a, "+", randomInt(10 - oa, Math.min(9, 100 - a)));
    }
    case 14: { const oa = randomInt(0, 8); return buildQuestion(randomInt(2, 9) * 10 + oa, "-", randomInt(oa + 1, 9)); }
    case 15: {
      const a = randomInt(11, 89), b = randomInt(Math.max(10, 10 - (a % 10)), 100 - a);
      return (a % 10) + (b % 10) >= 10 ? buildQuestion(a, "+", b) : generateArithmeticQuestion(15);
    }
    case 16: {
      const oa = randomInt(0, 8), ob = randomInt(oa + 1, 9), ta = randomInt(2, 9), tb = randomInt(1, ta - 1);
      return buildQuestion(ta * 10 + oa, "-", tb * 10 + ob);
    }
    case 17: return Math.random() < 0.5
      ? (() => { const oa = randomInt(1, 9), a = randomInt(1, 9) * 10 + oa; return buildQuestion(a, "+", randomInt(10 - oa, 9)); })()
      : (() => { const a = randomInt(10, 99); return buildQuestion(a, "-", randomInt(1, Math.min(9, a - 1))); })();
    case 18: return Math.random() < 0.5
      ? (() => { const a = randomInt(10, 89), b = randomInt(10, 99 - a); return (a % 10) + (b % 10) >= 10 ? buildQuestion(a, "+", b) : generateArithmeticQuestion(18); })()
      : (() => { const oa = randomInt(0, 8), ob = randomInt(oa + 1, 9), ta = randomInt(2, 9), tb = randomInt(1, ta - 1); return buildQuestion(ta * 10 + oa, "-", tb * 10 + ob); })();
    case 19: { const a = randomInt(100, 198); return buildQuestion(a, "+", randomInt(1, Math.min(99, 199 - a))); }
    case 20: { const a = randomInt(100, 199); return buildQuestion(a, "-", randomInt(1, Math.min(99, a - 1))); }
    case 21: return Math.random() < 0.5
      ? (() => { const a = randomInt(100, 998); return buildQuestion(a, "+", randomInt(1, Math.min(99, 999 - a))); })()
      : (() => { const a = randomInt(100, 999); return buildQuestion(a, "-", randomInt(1, Math.min(99, a - 1))); })();
    default: return buildQuestion(1, "+", 1);
  }
}

function generateMultiplicationQuestion(levelId) {
  if (levelId <= 19) {
    const used = new Set([...askedSet].map((x) => x.split(" = ?")[0]));
    const options = shuffle(Array.from({ length: 10 }, (_, i) => `${levelId} × ${i + 1}`)).filter((t) => !used.has(t));
    if (!options.length) return null;
    const [a, , b] = options[0].split(" ");
    return buildQuestion(Number(a), "×", Number(b));
  }
  if (levelId === 20) return buildQuestion(randomInt(2, 9), "×", randomInt(2, 9));
  return buildQuestion(randomInt(11, 19), "×", randomInt(2, 9));
}

function generateUniqueQuestion() {
  for (let i = 0; i < 600; i += 1) {
    const q = selectedTrack === "multiplication"
      ? generateMultiplicationQuestion(selectedLevel.id)
      : generateArithmeticQuestion(selectedLevel.id);
    if (!q) continue;
    if (!askedSet.has(q.text)) {
      askedSet.add(q.text);
      return q;
    }
  }
  return null;
}

function updateStatus() {
  selectedCharacterLabel.textContent = selectedCharacter?.name ?? "-";
  playerNameEl.textContent = selectedCharacter?.name ?? "-";
  enemyNameEl.textContent = enemyCharacter?.name ?? "-";
  playerHpEl.textContent = playerHp;
  enemyHpEl.textContent = enemyHp;
  solvedCountEl.textContent = solvedCount;
}

function setFighters() {
  if (selectedCharacter) {
    playerImage.src = selectedCharacter.image;
  }
  if (enemyCharacter) {
    enemyImage.src = enemyCharacter.image;
  }
}

function showEffect(isCorrect) {
  effectOverlay.textContent = isCorrect ? "正解" : "間違い";
  effectOverlay.className = `effect-overlay show ${isCorrect ? "correct-hit" : "wrong-hit"}`;
  setTimeout(() => {
    effectOverlay.className = "effect-overlay";
  }, 380);
}

function finishBattle(win) {
  currentQuestion = null;
  toggleNumpad(false);
  startButton.disabled = false;

  if (win) {
    feedbackEl.textContent = "🏆 勝利！";
    questionLabel.textContent = "敵をたおした！";
    enemyFighter.classList.add("defeated");
    victoryText.classList.remove("hidden");
  } else {
    feedbackEl.textContent = "💥 敗北...";
    questionLabel.textContent = "HPが0になった...";
  }
}

function showNextQuestion() {
  if (enemyHp <= 0) return finishBattle(true);
  if (playerHp <= 0) return finishBattle(false);

  const q = generateUniqueQuestion();
  if (!q) return finishBattle(false);
  currentQuestion = q;
  questionLabel.textContent = q.text;
  answerInput.value = "";
}

function startRound() {
  if (!selectedLevel || !selectedCharacter || !enemyCharacter) return;
  askedSet = new Set();
  solvedCount = 0;
  playerHp = 10;
  enemyHp = ROUND_SIZE;
  feedbackEl.textContent = "バトル開始！";
  enemyFighter.classList.remove("defeated");
  victoryText.classList.add("hidden");
  startButton.disabled = true;
  toggleNumpad(true);
  updateStatus();
  showNextQuestion();
}

function judgeAnswer(event) {
  event.preventDefault();
  if (!currentQuestion || answerInput.value === "") return;

  if (Number(answerInput.value) === currentQuestion.answer) {
    enemyHp -= 1;
    solvedCount += 1;
    feedbackEl.textContent = "⚔️ こうげき成功！";
    showEffect(true);
  } else {
    playerHp -= 1;
    feedbackEl.textContent = `🩸 ダメージ！正解は ${currentQuestion.answer}`;
    showEffect(false);
  }
  updateStatus();
  showNextQuestion();
}

function appendDigit(v) {
  if (startButton.disabled === false || !currentQuestion) return;
  answerInput.value = answerInput.value === "0" ? v : answerInput.value + v;
}

function toggleNumpad(enabled) {
  numpad.querySelectorAll("button").forEach((b) => {
    b.disabled = !enabled;
  });
}

function renderNumpad() {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "←"];
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.textContent = key;
    button.addEventListener("click", () => {
      if (/^\d$/.test(key)) appendDigit(key);
      else if (key === "C") answerInput.value = "";
      else answerInput.value = answerInput.value.slice(0, -1);
    });
    numpad.appendChild(button);
  });

  const enter = document.createElement("button");
  enter.type = "button";
  enter.className = "key enter";
  enter.textContent = "攻撃";
  enter.addEventListener("click", () => answerForm.requestSubmit());
  numpad.appendChild(enter);
  toggleNumpad(false);
}

function renderCharacterSelect() {
  PLAYER_CHARACTERS.forEach((ch) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "character-button";
    button.innerHTML = `<img src="${ch.image}" alt="${ch.name}"><span>${ch.name}</span>`;
    button.addEventListener("click", () => {
      selectedCharacter = ch;
      characterGrid.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      updateStatus();
      setFighters();
    });
    characterGrid.appendChild(button);
  });
}

function renderLevels(track) {
  levelGrid.innerHTML = "";
  const levels = track === "multiplication" ? MULTIPLICATION_LEVELS : ARITHMETIC_LEVELS;
  levelViewTitle.textContent = track === "multiplication" ? "掛け算のレベルを選んでね" : "足し算・引き算のレベルを選んでね";

  levels.forEach((level) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-button";
    button.innerHTML = `<strong>${level.label}</strong><span>${level.desc}</span>`;
    button.addEventListener("click", () => {
      selectedLevel = level;
      enemyCharacter = ENEMIES[randomInt(0, ENEMIES.length - 1)];
      selectedLevelLabel.textContent = `${level.label}：${level.desc}`;
      setFighters();
      updateStatus();
      feedbackEl.textContent = `敵は「${enemyCharacter.name}」だ！`;
      enemyFighter.classList.remove("defeated");
      victoryText.classList.add("hidden");
      questionLabel.textContent = "「ラウンド開始」を押してください。";
      currentQuestion = null;
      startButton.disabled = false;
      toggleNumpad(false);
      levelView.classList.add("hidden");
      gameView.classList.remove("hidden");
    });
    levelGrid.appendChild(button);
  });
}

function showModeView() {
  modeView.classList.remove("hidden");
  levelView.classList.add("hidden");
  gameView.classList.add("hidden");
}

document.getElementById("mode-arithmetic").addEventListener("click", () => {
  selectedTrack = "arithmetic";
  renderLevels(selectedTrack);
  modeView.classList.add("hidden");
  levelView.classList.remove("hidden");
});

document.getElementById("mode-multiplication").addEventListener("click", () => {
  selectedTrack = "multiplication";
  renderLevels(selectedTrack);
  modeView.classList.add("hidden");
  levelView.classList.remove("hidden");
});

document.getElementById("back-to-mode-button").addEventListener("click", showModeView);
document.getElementById("back-button").addEventListener("click", () => {
  gameView.classList.add("hidden");
  levelView.classList.remove("hidden");
  toggleNumpad(false);
  startButton.disabled = false;
  currentQuestion = null;
});

answerForm.addEventListener("submit", judgeAnswer);
startButton.addEventListener("click", startRound);

renderCharacterSelect();
renderNumpad();
updateStatus();
showModeView();
