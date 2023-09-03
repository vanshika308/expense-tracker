import { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import AuthContext from '../../store/AuthContext';

const Header = () => {
  const authcntxt = useContext(AuthContext);

  return (
    <div className='navbar'>
      <ul>
        <li><strong>EXPENSE TRACKER</strong></li>
        {authcntxt.isLoggedIn && <li><Link to='/home'>Home</Link></li>}
        {authcntxt.isLoggedIn && <li><Link to='/products'>Products</Link></li>}
        <li><Link to='/about'>About us</Link></li>
        {authcntxt.isLoggedIn && <li><Link to='/profile'>Profile</Link></li>}
        <li>
          {authcntxt.isLoggedIn ? (
            <button onClick={authcntxt.logout} className="logout">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
