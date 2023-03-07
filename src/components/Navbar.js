import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
// hooks
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useThemeContext } from '../hooks/useThemeContext';

const Navbar = () => {
  // themes
  const { bgColor } = useThemeContext();
  // authentication
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={`navbar bg${bgColor}`}>
      <Link to='/'><h1 className='navbar__brand'>MaiGuides</h1></Link>

      <>
        {!user && (
          <div className='navbar__auth'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        )}

        {user && (
          <div className='navbar__actions'>
            <SearchBar />
            <Link to='/create' className='navbar__create'>
              <p>Create Guide</p>
            </Link>
            <button className='navbar__logout' onClick={logout}>Logout</button>
          </div>
        )}
      </>
    </nav>

  )
};

export default Navbar;