import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ ToDoItems, updateCallback, logOut }) => {
 

  
    const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

    const API_URL = isLocalhost
    ? "http://localhost:5000"
    : "http://3.18.213.147:5000";

  const onLogout = async (e) => {

    const url = `${API_URL}/logout`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      logOut();
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete_todo/${id}`,{credentials: include});
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>To-Do Items</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ToDoItems.map((item) => (
            <ToDoItem key={item.item_id} item={item} onDelete={onDelete} />
          ))}
        </tbody>
      </table>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ToDoList;
