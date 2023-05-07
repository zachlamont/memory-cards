import React, { useState, useEffect } from "react";

const cardDeck = [
  "2♣️",
  "2♦️",
  "2♥️",
  "2♠️",
  "3♣️",
  "3♦️",
  "3♥️",
  "3♠️",
  "4♣️",
  "4♦️",
  "4♥️",
  "4♠️",
  "5♣️",
  "5♦️",
  "5♥️",
  "5♠️",
  "6♣️",
  "6♦️",
  "6♥️",
  "6♠️",
  "7♣️",
  "7♦️",
  "7♥️",
  "7♠️",
  "8♣️",
  "8♦️",
  "8♥️",
  "8♠️",
  "9♣️",
  "9♦️",
  "9♥️",
  "9♠️",
  "10♣️",
  "10♦️",
  "10♥️",
  "10♠️",
  "J♣️",
  "J♦️",
  "J♥️",
  "J♠️",
  "Q♣️",
  "Q♦️",
  "Q♥️",
  "Q♠️",
  "K♣️",
  "K♦️",
  "K♥️",
  "K♠️",
  "A♣️",
  "A♦️",
  "A♥️",
  "A♠️",
];

function MemoryGame() {
  const [cardList, setCardList] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setSelectedCards([]);
    setGameOver(false);
    setCardList(getRandomCards(3));
    setScore(0);
  };

  const getRandomCards = (numCards) => {
    const randomCards = [];
    while (randomCards.length < numCards) {
      const card = cardDeck[Math.floor(Math.random() * cardDeck.length)];
      if (!randomCards.includes(card)) {
        randomCards.push(card);
      }
    }
    return randomCards;
  };

  const handleCardClick = (card) => {
    if (selectedCards.includes(card)) {
      resetGame();
    } else {
      const newSelectedCards = [...selectedCards, card];
      setSelectedCards(newSelectedCards);
      setScore(score + 1);
      if (newSelectedCards.length === cardList.length) {
        if (
          JSON.stringify(newSelectedCards.sort()) ===
          JSON.stringify(cardList.sort())
        ) {
          const newNumCards = cardList.length + 1;
          setSelectedCards([]);
          setCardList(getRandomCards(newNumCards));
          if (score + 1 > bestScore) {
            setBestScore(score + 1);
          }
          setScore(score + 1);
        } else {
          resetGame();
        }
      }
    }
  };

  const renderCards = () => {
    // Shuffle the card list using the Fisher-Yates shuffle algorithm
    const shuffledCards = [...cardList];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    // Render the shuffled cards
    return shuffledCards.map((card, index) => (
      <div
        key={index}
        onClick={() => handleCardClick(card)}
        className={`card ${
          card.includes("♣") || card.includes("♠") ? "black" : "red"
        }`}
      >
        {card}
      </div>
    ));
  };

  return (
    <div>
      <h1>Memory Game</h1>
      {gameOver ? (
        <div>
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
          <h2>Click on Each Card Once</h2>
          {renderCards()}
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
