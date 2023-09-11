import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Styles/SignUpPage.css';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  const isDarkTheme = useSelector((state) => state.theme.isDark);

  const currentTheme = isDarkTheme ? 'dark-theme' : 'light-theme';

  const authentication = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!authentication) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';
    }
  }, [authentication]);

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
    <div className={`signup-page ${currentTheme}`}>
      <form className={`signup-form ${currentTheme}`}>
        <label>Email</label>
        <input
          type="email"
          required
          ref={emailInputRef}
          className={`${currentTheme}`}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          required
          ref={passwordInputRef}
          className={`${currentTheme}`}
        />
        <br />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          ref={confirmPasswordInputRef}
          className={`${currentTheme}`}
        />

        <button
          className={`signup-button ${currentTheme}`}
          type="submit"
          onClick={SubmitHandler}
        >
          Sign up
        </button>
        <br />
        <button
          type="button"
          className={`status ${currentTheme}`}
          onClick={redirectToLoginPage}
        >
          Already have an account? Sign in
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
