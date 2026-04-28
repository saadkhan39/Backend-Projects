import React from 'react'
import AppRoutes from './AppRoutes'
import "./feature/shared/styles/global.scss"
import AuthContext from './feature/auth/context/AuthContext'

const App = () => {
  return (
    <AuthContext>
      <AppRoutes/>
    </AuthContext>
  )
}

export default App