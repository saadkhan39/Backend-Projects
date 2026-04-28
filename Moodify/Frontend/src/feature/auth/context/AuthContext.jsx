import React, { createContext, useState } from 'react'

export const AuthDataContext = createContext()


const AuthContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  return (
   <AuthDataContext.Provider value={{user,setUser,loading,setLoading}}>
    {children}
   </AuthDataContext.Provider>
  )
}

export default AuthContext