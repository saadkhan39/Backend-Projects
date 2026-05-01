import React from 'react'
import AppRoutes from './AppRoutes'
import "./feature/shared/styles/global.scss"
import AuthContext from './feature/auth/context/AuthContext'
import SongContext from './feature/home/context/SongContext'

const App = () => {
  return (
    <AuthContext>
      <SongContext>
        <AppRoutes/>
      </SongContext>
    </AuthContext>
  )
}

export default App