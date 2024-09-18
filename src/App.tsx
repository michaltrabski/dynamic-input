import { useState } from "react";

import { DynamicInput } from "./components/DynamicInput";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DynamicInput />
    </>
  );
}

export default App;
