import { useState } from "react";

export function App() {
  const [counter, setCounter] = useState(0);

  Main.on("increase-counter", (newCounter) => {
    setCounter(newCounter);
  });

  return (
    <>
      <div className="app">
        <button onClick={() => Main.openNewWindow(counter)}>
          Open New Window
        </button>
        <button onClick={() => Main.increaseCounter(counter + 1)}>
          Increase Counter
        </button>
        <div className="counter">counter: {counter}</div>
      </div>
    </>
  );
}
