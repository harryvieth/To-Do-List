import { useState, useEffect } from 'react'
import './App.css'
import ToDoForm from './ToDoForm'
import ToDoList from './ToDoList';

function App() {

  const [items, setItems] = useState([]);
 

  useEffect(() => {
    fetchItems()
  }, []);


  const fetchItems = async () => {
    const response = await fetch("http://127.0.0.1:5000/items");
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
