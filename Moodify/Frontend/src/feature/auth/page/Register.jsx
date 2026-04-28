import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/page.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const {loading,handleRegister} = useAuth()

  const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

 async function submitHandler (e){
    e.preventDefault()

    await handleRegister({username,email,password})
    navigate("/")
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input value={username} onInput={(e)=>{
            setUsername(e.target.value)
          }}
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
          />
          <input value={email} onInput={(e)=>{
            setEmail(e.target.value)
          }}
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
          />
          <input  value={password} onInput={(e)=>{
            setPassword(e.target.value)
          }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button>Register</button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
