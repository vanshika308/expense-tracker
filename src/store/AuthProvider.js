import {  useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider= (props)=>{

    const [email, setEmail] =useState();
    const [token, setToken] =useState();

    const loginHandler=(token,email)=>{
        
        setEmail(email);
        setToken(token);
    }

    const logoutHandler=()=>{
        setEmail("");
        setToken("");
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