import { useState } from "react";
import type { MouseEvent } from "react";

interface Card {
  id: number;
  name: string;
  description: string;
}

const App = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      name: "card1",
      description: "blablabla",
    },
    {
      id: 2,
      name: "card2",
      description: "lalalala",
    },
    {
      id: 3,
      name: "card2",
      description: "lalalala",
    },
  ]);
  const [firstIndex, setFirstIndex] = useState<number | null>(null);

  const swapArrayElem = (e: MouseEvent<HTMLDivElement>) => {
    const currentIndex = Number(e.currentTarget.dataset.cardId);

    if (firstIndex === null) {
      setFirstIndex(currentIndex);
    } else {
      const secondIndex = currentIndex;

      if (firstIndex !== secondIndex) {
        const draft = [...cards];

        const temp = draft[firstIndex];
        draft[firstIndex] = draft[secondIndex];
        draft[secondIndex] = temp;

        setCards(draft);
      }

      setFirstIndex(null);
    }
  };

  return (
    <div>
      {cards.map((card, index) => {
        return (
          <div
            className="max-w-[320px] bg-red-200 rounded-2xl"
            onClick={swapArrayElem}
            data-card-id={index}
          >
            <p>{card.id}</p>
            <p>{card.name}</p>
            <p>{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
