import { useState } from "react";

const ToDoItem = ({ item, onDelete }) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <tr>
      <td className={completed ? "completed" : ""}>{item.text}</td>
      <td>
        <button onClick={toggleCompleted}>
          {completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(item.item_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDoItem;
