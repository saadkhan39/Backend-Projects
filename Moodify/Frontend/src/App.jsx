import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import "./feature/shared/styles/global.scss"
import AuthContext from './feature/auth/context/AuthContext'
import SongContext from './feature/home/context/SongContext'
import { useAuth } from './feature/auth/hooks/useAuth'

const AppContent = () => {

  const { handleGetMe } = useAuth()

  useEffect(() => {
    handleGetMe()
  }, [])

  return <AppRoutes />
}

const App = () => {
  return (
    <AuthContext>
      <SongContext>
        <AppContent />
      </SongContext>
    </AuthContext>
  )
}

export default App