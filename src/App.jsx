import { useState } from "react";
import languages from "./assets/languages.js";
import clsx from "clsx";

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessWord, setGuessWord] = useState("jack");

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !guessWord.toUpperCase().split("").includes(letter)
  ).length;

  const isGameOver = wrongGuessCount >= languages.length - 1;
  const isGameWon = guessWord
    .toUpperCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const LanguageTiles = languages.map((lang, i) => {
    const isLost = i < wrongGuessCount;
    const className = clsx({
      chip: true,
      lost: isLost,
    });
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className={className} style={styles} key={lang.name}>
        {lang.name}
      </span>
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

  const makeNewGame = () => {
    setGuessWord("newword");
    setGuessedLetters([]);
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
        {isGameWon ? (
          <>
            <h2>You win!</h2>
            <p>Well done!</p>
          </>
        ) : isGameOver ? (
          <>
            <h2>You lose!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        ) : (
          ""
        )}
      </section>
      <section>
        <span className="languages-box">{LanguageTiles}</span>
      </section>
      <section className="display-word-container">{displayWord}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && (
        <button onClick={makeNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}

export default App;
