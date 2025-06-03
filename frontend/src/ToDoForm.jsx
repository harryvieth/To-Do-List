import {useState} from "react"

const ToDoForm = ({updateCallback})=>{

    const [text, setText] = useState("")


    const onSubmit = async (e) =>{
        e.preventDefault()

        const data = {
            text
        }
        const url = "http://127.0.0.1:5000/create_TODO"
        const options={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }
        else{
           updateCallback()
        }
    }

    return(
        <form onSubmit ={onSubmit}>
            <div>
                <label htmlFor = "Text">New Item:</label>
                <input
                    type = "text"
                    id ="Text"
                    value = {text}
                    onChange = {(e)=> setText(e.target.value)}     
                />
            </div>
            <button type ="submit">{"Create"}</button>
        </form>
    );
};

export default ToDoForm