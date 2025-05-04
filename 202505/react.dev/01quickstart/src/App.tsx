import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
function App() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

export default App;
