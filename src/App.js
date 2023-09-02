import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/UI/Header';
import LoginPage from './components/pages/LoginPage';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import HomePage from './components/pages/HomePage';

function App() {
  const authcntxt = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/home" exact>
          {authcntxt.isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authcntxt.isLoggedIn ? <LoginPage /> : <Redirect to="/home" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
