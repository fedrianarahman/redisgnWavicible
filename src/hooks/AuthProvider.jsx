import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [token,setToken] = useState(null) 

    const handleLogout = (e)=>{
      e.preventDefault();
        window.localStorage.removeItem("token");
        navigate("/login");
    }

    const value ={
        token,
        onLogout : handleLogout,
        getToken : ()=> window.localStorage.getItem("token")
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider