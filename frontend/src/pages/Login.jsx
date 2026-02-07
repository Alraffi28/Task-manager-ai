import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import "../style/login.css"

export default function Login() {
    const [email , setEmail] = useState("")
    const [error , setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = () =>{
        const trimedEmail = email.trim()
        if(!trimedEmail){
            setError("Email is required")
            return;
        }

        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailVal.test(trimedEmail)){
            setError("Enter a valid email")
            return;
        }
        localStorage.setItem("email" , trimedEmail)
        navigate("/dashboard")
    }
  return (
    <div className="login-container">
      <div className="login-card">  
        <h2 className="login-title">Login</h2>
        <input type="email" placeholder="Enter Email"
        className="login-input"
        value={email} 
        onChange={(e)=>{
          setEmail(e.target.value)
          setError("")}}/>
        {error && <p className="login-error">{error}</p>}
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}



