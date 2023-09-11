import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

import { authenticationAction } from '../../store/auth';
import { themeActions } from '../../store/theme';

const Header = () => {

  const authentication = useSelector(state => state.auth.isAuthenticated);

  const isDarkTheme = useSelector(state => state.theme.isDark);
  const dispatch = useDispatch();

  // Function to toggle the theme
  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme()); // Dispatch the toggleTheme action
  };

  // Add or remove the 'dark' attribute based on the theme state
  const currentTheme = isDarkTheme ? 'dark-theme' : 'light-theme';


  return (
    <div className={`navbar ${currentTheme}`}> {/* Apply the currentTheme class here */}
      <ul>
        <li>
          <strong>EXPENSE TRACKER</strong>
        </li>
        {authentication && <li><Link to='/home'>Home</Link></li>}
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
        <li>
  <button className="toggle-theme-button" onClick={toggleThemeHandler}>
    Toggle Theme
  </button>
</li>

      </ul>
    </div>
  );
};

export default Header;
