import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import AuthContext from '../../store/AuthContext'; // Import your AuthContext
import './Styles/SignUpPage.css';


const SignUpPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const authcntxt = useContext(AuthContext);
  const history = useHistory(); // Get the history object

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

  const redirectToLoginPage = () => {
    history.push('/login'); // Navigate to the login page
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

    let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg';
  

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
        redirectToLoginPage(); // Redirect after successful signup
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <form className="signup-form">
        <label>Email</label>
        <input placeholder="Enter Your Email" type="email" required ref={emailInputRef} />
        <br />
        <label>Password</label>
        <input placeholder="Enter Your Password" type="password" required ref={passwordInputRef} />
        <br />

        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Your Password"
              type="password"
              required
              ref={confirmPasswordInputRef}
            />
          </>
        )}

        <button className="signup-button" type="submit" onClick={SubmitHandler}>
          {isLogin ? 'Login' : 'Sign up'}
        </button>
        <br />
        <button type="button" className="status" onClick={redirectToLoginPage}>
          Already have an account? Sign in
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
