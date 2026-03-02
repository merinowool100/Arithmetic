:root {
  font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
  color: #13243c;
  background-color: #f2f7ff;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.app {
  width: min(95vw, 760px);
  background: #fff;
  border-radius: 16px;
  padding: 1.1rem;
  box-shadow: 0 8px 20px rgba(12, 28, 51, 0.14);
}

h1,
h2 {
  margin-top: 0;
  text-align: center;
}

.description {
  margin-top: 0;
  text-align: center;
}

.panel {
  border: 2px solid #d6e4ff;
  border-radius: 12px;
  padding: 0.8rem;
  margin-top: 0.85rem;
}

.hidden {
  display: none;
}

.level-grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 0.6rem;
}

.level-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  text-align: left;
  background: #edf4ff;
  color: #163a73;
  border: 1px solid #bfd3f8;
}

.level-button span {
  font-size: 0.88rem;
}

.info-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.info-panel p {
  margin: 0;
}

.status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem;
}

.status p {
  margin: 0;
}

.question-area {
  text-align: center;
}

#question-label {
  font-size: 1.7rem;
  margin: 0.4rem 0 1rem;
}

form {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

input,
button {
  font-size: 1.1rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #9bb7e8;
}

input {
  text-align: center;
  font-size: 1.4rem;
  width: 180px;
}

button {
  background: #2459b5;
  color: #fff;
  border: none;
}

button:disabled,
input:disabled {
  opacity: 0.5;
}

.numpad {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(70px, 1fr));
  gap: 0.5rem;
  max-width: 320px;
  margin-inline: auto;
}

.key {
  min-height: 56px;
  font-size: 1.3rem;
  font-weight: 700;
}

.key.enter {
  grid-column: 1 / -1;
  background: #137a2f;
}

.controls {
  text-align: center;
}

#feedback {
  min-height: 1.4rem;
  margin: 0.6rem 0 0;
  font-weight: 700;
}

.correct {
  color: #006d2f;
}

.incorrect {
  color: #b31217;
}

@media (max-width: 520px) {
  #question-label {
    font-size: 1.3rem;
  }

  .info-panel {
    flex-direction: column;
    align-items: stretch;
  }

  input,
  button {
    width: 100%;
  }

  .numpad {
    max-width: 100%;
  }
}
