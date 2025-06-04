import React from "react"

const ToDoList = ({ToDoItems, updateCallback}) =>{  
    const onDelete = async (id) =>{
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_todo/${id}`, options)
            if (response.status=== 200){
                updateCallback()
            }
            else{
                console.error("Failed to delete")
            }
        }
        catch(error){
            alert(error)
        }
       }   
   
   return <div>
        <h2>To-Do Items</h2>
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                </tr>
            </thead>
            <tbody>
                {ToDoItems.map((ToDoItem)=>(
                    <tr key = {ToDoItem.item_id}>
                        <td>{ToDoItem.text}</td>
                        <td>
                            <button>Update</button>
                            <button onClick = {()=>onDelete(ToDoItem.item_id)}>Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ToDoList