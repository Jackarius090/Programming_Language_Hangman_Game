import { useState } from "react";
import languages from "./assets/languages.js";
import clsx from "clsx";

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessWord, setGuessWord] = useState("jack");

  const LanguageTiles = languages.map((language, i) => {
    return (
      <div
        key={i}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
          padding: "5px",
          borderRadius: "4px",
          margin: "5px",
        }}
      >
        {language.name}
      </div>
    );
  });

  const guessWordArray = guessWord.toUpperCase().split("");
  const displayWord = guessWordArray.map((letter, i) => {
    return (
      <span className="guess-word-letter" key={i}>
        {guessedLetters.includes(letter) ? letter : ""}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboard = alphabet
    .toUpperCase()
    .split("")
    .map((letter, i) => {
      const isCorrect =
        guessedLetters.includes(letter) &&
        guessWord.toUpperCase().includes(letter);
      const isWrong =
        guessedLetters.includes(letter) &&
        !guessWord.toUpperCase().includes(letter);

      const className = clsx({
        keyboardButton: true,
        correct: isCorrect,
        wrong: isWrong,
      });
      return (
        <button
          onClick={() => {
            handleLetter(letter);
          }}
          className={className}
          key={i}
        >
          {letter}
        </button>
      );
    });

  const handleLetter = (letter) => {
    setGuessedLetters((prev) => {
      if (guessedLetters.includes(letter)) {
        return [...prev];
      }
      return [...prev, letter];
    });
  };

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!</p>
      </section>
      <section className="languages-box">{LanguageTiles}</section>
      <section className="display-word-container">{displayWord}</section>
      <section className="keyboard">{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;
