import { useState, useEffect } from 'react'
import './App.css'
import ToDoForm from './ToDoForm'
import ToDoList from './ToDoList';

function App() {

  const [items, setItems] = useState([]);

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const API_URL = isLocalhost
    ? "http://127.0.0.1:5000"
    : "http://3.18.213.147:5000";
 

  useEffect(() => {
    fetchItems()
  }, []);



  const fetchItems = async () => {
    const response = await fetch(`${API_URL}/items`);
    const data = await response.json();
    setItems(data.items);
    console.log(data.items);
  };

  const onUpdate = ()=>{
    fetchItems()
  }

  return (
    <> 
      <ToDoList ToDoItems={items} updateCallback={onUpdate}/>
      <ToDoForm updateCallback = {onUpdate}/>
    </>
  )
}

export default App
