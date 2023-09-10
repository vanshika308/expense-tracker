import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Header';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import SignUpPage from './components/pages/SignupPage';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';
import { useSelector } from 'react-redux';

function App() {

  const authentication = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          {authentication? <HomePage/> : <LoginPage/>}
        </Route> 
        <Route path='/profile' exact>
          {authentication? <ProfilePage /> : <Redirect to="/login" />}
        </Route>
        <Route path='/login'>
          {!authentication ? <LoginPage /> : <Redirect to="/home" />}
        </Route>
        <Route path='/signup'>
          {!authentication ? <SignUpPage /> : <Redirect to="/login" />}
        </Route>
        <Route path='/forgot' component={ForgotPassword} />
        <Route path='/home'>
          {authentication? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
