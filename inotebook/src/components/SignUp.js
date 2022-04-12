import React,{useState} from 'react'
import "../index.css"
import {useNavigate} from "react-router-dom";
function SignUp(props) {
    let history = useNavigate();

   const [credentials,setCredentials]=useState({name:"",email:"",password:""});

   const handleChange=(event)=>{
       const {name,value}=event.target;
       setCredentials((prevCredentials)=>{
           return{
               ...prevCredentials,
               [name]:value
           }
       })
   }

   const handleClick= async(event)=>{
       event.preventDefault();
        const response=await fetch("/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
        });
        const json=await response.json();
        console.log("clicked");
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showalert("Succesfully sign up","success")
        }else{
            props.showalert("Sign Up with valid credentials","danger")
        }
    }
   

  return (
    <div>
      <div className="main">
    <p className="sign" align="center">Sign Up</p>
    <form className="form1">
      <input onChange={handleChange} className="un " type="text" name="name" value={credentials.name} align="center" placeholder="Name"/>
      <input onChange={handleChange} className="un " type="email" name="email" value={credentials.email} align="center" placeholder="Email"/>
      <input onChange={handleChange} className="pass" type="password" name="password" value={credentials.password} align="center" placeholder="Password"/>
      <button onClick={handleClick} type="submit" className="submit" align="center">Sign Up</button>
    </form>    
    </div>
    </div>
  )
}

export default SignUp
