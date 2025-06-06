import { useState, useEffect } from "react";
import "./App.css";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import LogIn from "./LogIn";
import CreateAccount from "./createAccount";

function App() {
  const [items, setItems] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [showCreate, setShowCreate] = useState(false);

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const API_URL = isLocalhost
    ? "http://localhost:5000" // ← use localhost (not 127.0.0.1) to match frontend
    : "http://3.18.213.147:5000";

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch(`${API_URL}/check_session`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.loggedIn) {
        setLoggedIn(true); // trigger fetchItems via useEffect
      }
    };

    checkSession();
  }, []);

  const fetchItems = async () => {
    const response = await fetch(`${API_URL}/items`, {
      credentials: "include", 
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Fetch /items failed:", response.status, text);
      return;
    }

    const data = await response.json();
    setItems(data.items);
    console.log("Fetched items:", data.items);
  };

  const onUpdate = () => {
    fetchItems();
  };
  return (
    <>
      {loggedIn ? (
        <>
          <ToDoList ToDoItems={items} updateCallback={onUpdate} logOut = {()=> setLoggedIn(false)}/>
          <ToDoForm updateCallback={onUpdate} />
        </>
      ) : showCreate ? (
        <CreateAccount
          onAccountCreated={() => setShowCreate(false)}
          onLogin={() => setLoggedIn(true)}
        />
      ) : (
        <LogIn
          onLogin={() => setLoggedIn(true)}
          onShowCreateAccount={() => setShowCreate(true)}
        />
      )}
    </>
  );
}

export default App;
