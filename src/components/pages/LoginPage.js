import AuthContext from '../../store/AuthContext';
import './LoginPage.css';
import { useContext, useEffect, useRef, useState } from 'react';

const LoginPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const authcntxt = useContext(AuthContext);

  useEffect(() => {
    if (!authcntxt.token) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';
    }
  }, [authcntxt.token]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    // Check if passwords match
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            console.log(data);
            alert(data.error.message);
          });
        }
      })
      .then((data) => {
        setIsLogin(true);
        authcntxt.login(data.idToken, enteredEmail);
        console.log('User Has successfully logged in!!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <form className='login-form' >
        <label>Email</label>
        <input placeholder='Enter Your Email' type='email' required ref={emailInputRef}></input><br />
        <label>Password</label>
        <input placeholder='Enter Your Password' type='password' required ref={passwordInputRef}></input><br />

        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              placeholder='Confirm Your Password'
              type='password'
              required
              ref={confirmPasswordInputRef}
            ></input>
          </>
        )}

        <button className='login-button' type="submit" onClick={SubmitHandler}>
          {isLogin ? 'Login' : 'Sign up'}
        </button><br />
        <button type='button' className='status' onClick={switchAuthModeHandler}>
          {isLogin ? "Don't have an account? Sign up" : 'Login with an existing account'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
