import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const Navbar = () => {
  const { token, onLogout, isDatasetUser } = useAuth();

  return (
    <nav className="navbar">
      <Link className="nav-logo" to="/">
        Book Recommendation
      </Link>
      
       
        {token && (
          <ul className="nav-pages">
           <li>
          <Link to="/">Home</Link>
        </li>
          <li>
            <Link to="/my-library">My Library</Link>
          </li>
          <li>
            <Link to="/recommend">Recommend</Link>
          </li>
          {!isDatasetUser && (
          <li>
          <Link to="/top10">Top 10 Books</Link>
        </li>
          )}
        </ul>
        )}
        

      <ul className="nav-actions">
        {!token ? (
          <>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/register" className="button sign-up">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" onClick={onLogout}>
                Sign Out
              </Link>
            </li>
            <li>
              <Link to="/recommend-personalized" className="button recommend">
                Personalized Recommendation
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
