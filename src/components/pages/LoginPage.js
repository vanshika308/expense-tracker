import AuthContext from '../../store/AuthContext';
import './LoginPage.css'
import { useContext, useEffect, useRef,useState } from 'react';

const LoginPage =()=>{


     const emailInputRef = useRef();
     const passwordInputRef = useRef();
     const[isLogin,setIsLogin]=useState(false);
     const authcntxt = useContext(AuthContext);

     useEffect(() => {
        if (!authcntxt.token) {
          emailInputRef.current.value = '';
          passwordInputRef.current.value = '';
        }
      }, [authcntxt.token]);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      };

      const SubmitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword=passwordInputRef.current.value;

        let url;
        if(isLogin){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg'
        }else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg'
        }

        fetch(url,{
            method:'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                res.json().then(data=>{
                    console.log(data);
                    alert(data.error.message);
                })
            }
        }).then(
            (data)=>{
                setIsLogin(true);
                authcntxt.login(data.idToken,enteredEmail)
                console.log('User Has successfully logged in!!');
        }).catch(error =>{
            console.log(error);
        })

    }

    return(
        <div className="login-page">
      <form className='login-form' >
        <label>Email</label>
        <input placeholder='Enter Your Email'
        type='email'
        required ref={emailInputRef}></input><br/>
        <label>Password</label>
        <input placeholder='Enter Your Password'
        type='text'
        required ref={passwordInputRef}></input><br/>
        <button className='login-button'type="submit" onClick={SubmitHandler}>
        {isLogin?'Login':'Sign up'}</button><br/>
        <button type='button' className='status' onClick={switchAuthModeHandler}>
        {isLogin ? 'Create new account' : 'Login with existing account'}
      </button>
      </form>

      </div>
    );
}

export default LoginPage;