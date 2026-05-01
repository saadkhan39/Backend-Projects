import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './feature/auth/page/Register'
import Login from './feature/auth/page/Login'
import Protected from './feature/auth/components/Protected'
import Home from './feature/home/page/Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Protected><Home/></Protected>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes