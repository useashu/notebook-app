import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../index.css"

function Login(props) {
    
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history=useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [name]: value
            }
        })
    };

    const handleClick= async(event)=>{
        event.preventDefault();
         const response=await fetch("/api/auth/login",{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body: JSON.stringify({ email:credentials.email, password:credentials.password})
         });
         const json=await response.json();
        
         console.log(json);
         if(json.success){
             localStorage.setItem('token',json.authtoken);
             history("/");
             const username=json.username;
             localStorage.setItem('username',username);
             props.showalert("Succesfully Logged In","success");
         }else{
             props.showalert("Invalid credentials","danger")
         }
     }
    
    return (
        <div>
            <div className="main">
                <p className="sign" align="center">Sign in</p>
                <form className="form1">
                <input onChange={handleChange} className="un " type="email" name="email" value={credentials.email} align="center" placeholder="Email" />
                <input onChange={handleChange} className="pass" type="password" name="password" value={credentials.password} align="center" placeholder="Password" />
                <button onClick={handleClick} type="submit" className="submit" align="center">Sign In</button>
                </form>
                <p className="forgot" align="center">Forgot Password?</p>
            </div>
        </div>
    )
}

export default Login
