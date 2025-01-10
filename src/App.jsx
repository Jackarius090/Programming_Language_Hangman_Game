import { useState, useEffect } from "react";
import languages from "./assets/languages.js";
import clsx from "clsx";
import { words } from "./assets/words.js";
import Confetti from "react-confetti";

function FarewellMessage({ language }) {
  const messages = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `We'll miss you, ${language}`,
    `Oh no, not ${language}!`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return <div>{randomMessage}</div>;
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessWord, setGuessWord] = useState("react");

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const lastGuessCorrect =
    guessedLetters &&
    guessWord.toUpperCase().split("").includes(lastGuessedLetter);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !guessWord.toUpperCase().split("").includes(letter)
  ).length;

  const numGuessesLeft = languages.length - (wrongGuessCount - 1);

  const isGameOver = wrongGuessCount >= languages.length - 1;
  const isGameWon = guessWord
    .toUpperCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameFinished = () => {
    return isGameOver || isGameWon;
  };
  const gamefinished = isGameFinished();

  const getLanguage = () => {
    if (wrongGuessCount > 0) {
      return languages[wrongGuessCount - 1].name;
    }
    return null;
  };
  const language = getLanguage();

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
    if (gamefinished) {
      return (
        <span className="guess-word-letter" key={i}>
          {letter}
        </span>
      );
    } else {
      return (
        <span className="guess-word-letter" key={i}>
          {guessedLetters.includes(letter) ? letter : ""}
        </span>
      );
    }
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
          disabled={isGameOver || isGameWon}
          aria-disabled={isGameOver || isGameWon}
          aria-label={`letter ${letter}`}
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
    setGuessWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
  };

  const className = clsx({
    gameStatus: true,
    isGameWon: isGameWon,
    isGameOver: isGameOver,
  });

  return (
    <main>
      {isGameWon ? (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      ) : null}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={className} aria-live="polite" role="status">
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
        ) : null}
        {wrongGuessCount > 0 &&
        !lastGuessCorrect &&
        !isGameWon &&
        !isGameOver ? (
          <FarewellMessage language={language} />
        ) : null}
      </section>
      <section>
        <span className="languages-box">{LanguageTiles}</span>
      </section>
      <section className="display-word-container">{displayWord}</section>
      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {guessWord.toUpperCase().split("").includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {guessWord
            .toUpperCase()
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboard}</section>
      {gamefinished && (
        <button onClick={makeNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}

export default App;
