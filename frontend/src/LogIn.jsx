import {useState} from "react"

const LogIn = ({onLogin, onShowCreateAccount})=>{

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const onSubmit = async (e) =>{
        e.preventDefault()

        const data = {
            username,
            password
        }

        const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

        const API_URL = isLocalhost
        ? "http://localhost:5000"
        : "http://3.18.213.147:5000";

        const url = `${API_URL}/login`
        const options={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }
        else{
           onLogin()
        }
    }

    return(
        <div>
        <form onSubmit ={onSubmit}>
            <div>
                <label htmlFor = "Text1">Username:</label>
                <input
                    type = "text"
                    id ="Text1"
                    value = {username}
                    onChange = {(e)=> setUsername(e.target.value)}     
                />
            </div>
            <div>
                <label htmlFor = "Text2">Password:</label>
                <input
                    type = "text"
                    id ="Text2"
                    value = {password}
                    onChange = {(e)=> setPassword(e.target.value)}     
                />
            </div>
            <button type ="submit">Log In</button>
        </form>
        <p>Register</p>
        <button type="button" onClick={onShowCreateAccount}>
          Create Account
        </button>
        </div>
    );
};

export default LogIn