import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useAuth } from '../features/auth/hooks/useAuth'
import "highlight.js/styles/github-dark.css";

const App = () => {

  const auth = useAuth()

  useEffect(()=>{
     auth.handleGetMe()
  },[])

  return (
    <div>
      <AppRoutes/>
    </div>
  )
}

export default App