import { useState, useRef } from "react";

const App = () => {
  const [items, setItems] = useState(["Card 1", "Card 2", "Card 3", "Card 4"]);

  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItemIndex.current = index;

    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    e.dataTransfer.setDragImage(img, 0, 0);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDragEnter = (targetIndex: number) => {
    const sourceIndex = dragItemIndex.current;

    if (sourceIndex !== null && sourceIndex !== targetIndex) {
      const newList = [...items];
      const movedItem = newList[sourceIndex];

      newList.splice(sourceIndex, 1);
      newList.splice(targetIndex, 0, movedItem);

      dragItemIndex.current = targetIndex;

      setItems(newList);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-7">
      {items.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={(e) => handleDragEnd(e)}
          className="p-4 bg-blue-500 text-white cursor-move rounded shadow-md"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default App;
