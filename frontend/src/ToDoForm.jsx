import { useState } from "react";

const ToDoForm = ({ updateCallback }) => {
  const [text, setText] = useState("");
  const [logout, setLogout] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const API_URL = isLocalhost
      ? "http://localhost:5000"
      : "http://3.18.213.147:5000";

    const data = { text };

    const url = `${API_URL}/create_TODO`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="Text">New Item:</label>
          <input
            type="text"
            id="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">{"Create"}</button>
      </form>
    </div>
  );
};

export default ToDoForm;
