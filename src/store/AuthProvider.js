import {  useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider= (props)=>{

    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    const [email, setEmail] =useState(storedEmail);
    const [token, setToken] =useState(storedToken);

    const loginHandler=(token,email)=>{
        setEmail(email);
        setToken(token);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
    }

    const logoutHandler=()=>{
        setEmail("");
        setToken("");
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }
  
    const userIsLoggedIn= !! token;
   
    const authContextValue={
        email: email,
        token : token,
        login: loginHandler,
        logout: logoutHandler,
        isLoggedIn : userIsLoggedIn
    }

    return(
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;