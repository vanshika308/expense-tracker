import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Header';
import LoginPage from './components/pages/LoginPage';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import ProfilePage from './components/pages/ProfilePage';
import SignUpPage from './components/pages/SignupPage';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';

function App() {
  const authcntxt = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <LoginPage/>
        </Route>
        {authcntxt.isLoggedIn && <HomePage/>}
        <Route path="/profile" exact>
          {authcntxt.isLoggedIn ? <ProfilePage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authcntxt.isLoggedIn ? <LoginPage /> : <Redirect to="/home" />}
        </Route>
        <Route path="/signup">
          {!authcntxt.isLoggedIn ? <SignUpPage/> : <Redirect to="/profile" />}
        </Route>
        <Route path='/forgot'>
          <ForgotPassword/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
