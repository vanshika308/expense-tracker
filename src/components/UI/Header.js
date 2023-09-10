import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

import { authenticationAction } from '../../store/auth';

const Header = () => {

  const authentication = useSelector(state => state.auth.isAuthenticated);

  

  const dispatch= useDispatch();


  return (
    <div className='navbar'>
      <ul>
        <li><strong>EXPENSE TRACKER</strong></li>
        {authentication && <li><Link to='/home'>Home</Link></li>}
        {authentication && <li><Link to='/products'>Products</Link></li>}
        <li><Link to='/about'>About us</Link></li>
        {authentication && <li><Link to='/profile'>Profile</Link></li>}
        <li>
        {authentication ? (
            <button className="logout" onClick={() => dispatch(authenticationAction.logout())}>
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
