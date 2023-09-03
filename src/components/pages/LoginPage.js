import AuthContext from '../../store/AuthContext';
import './Styles/LoginPage.css';
import { useContext, useEffect, useRef,} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const LoginPage = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authcntxt = useContext(AuthContext);

  

  useEffect(() => {
    if (!authcntxt.token) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    }
  }, [authcntxt.token]);


  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg';
    

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
        authcntxt.login(data.idToken, enteredEmail);
        console.log('User Has successfully logged in!!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={submitHandler} className="login-form">
        <div className="form-control">
          <label>Email:</label>
          <input type="email" ref={emailInputRef} required />
        </div>
        <div className="form-control">
          <label>Password:</label>
          <input type="password" ref={passwordInputRef} required />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div>
        <Link to='/forgot'>Forgot Password?</Link>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
