import React from 'react'
import {Routes,Route} from "react-router"
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import Dashboard from '../features/chat/pages/Dashboard'
import Protected from '../features/auth/components/Protected'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Protected><Dashboard/></Protected>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes