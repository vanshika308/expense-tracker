import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import './Styles/SignUpPage.css';

const SignUpPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const authcntxt = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authcntxt.token) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';
    }
  }, [authcntxt.token]);


  const redirectToLoginPage = () => {
    history.push('/login'); 
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg';

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
          return res.json().then((data) => {
            alert(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then(() => {
        setIsLogin(true);
        history.push('/login'); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <form className="signup-form">
        <label>Email</label>
        <input
          placeholder="Enter Your Email"
          type="email"
          required
          ref={emailInputRef}
        />
        <br />
        <label>Password</label>
        <input
          placeholder="Enter Your Password"
          type="password"
          required
          ref={passwordInputRef}
        />
        <br />
        <label>Confirm Password</label>
        <input
          placeholder="Confirm Your Password"
          type="password"
          required
          ref={confirmPasswordInputRef}
        />

        <button className="signup-button" type="submit" onClick={SubmitHandler}>
          Sign up
        </button>
        <br />
        <button type="button" className="status" onClick={redirectToLoginPage}>
          Already have an account? Sign in
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
