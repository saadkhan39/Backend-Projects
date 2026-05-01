import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style/page.scss"
import {useAuth} from "../hooks/useAuth"


const Login = () => {

  const {loading,handleLogin} =useAuth()

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function submitHandler(e){
    e.preventDefault()

    await handleLogin({email,password})
    navigate("/")
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler} >
                <input value={email} onInput={(e)=>{
                  setEmail(e.target.value)
                }} type="text" placeholder='Enter Email' name='email' id='email' />
                <input value={password} onInput={(e)=>{
                  setPassword(e.target.value)
                }} type="password" name="password" id="password" placeholder='Enter password' />
                <button className='primary-btn'>Login</button>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </form>
        </div>
    </main>
  )
}

export default Login