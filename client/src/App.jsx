import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5001/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => {
        console.error(error);
        setMessage("Could not connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>Aarons Antlers</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;