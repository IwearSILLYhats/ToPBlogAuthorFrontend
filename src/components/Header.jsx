import "./Header.css";
import { NavLink } from "react-router-dom";
import useLocal from "../hooks/useLocal";
import Profile from "./Profile";

function Header() {
  const [token, setToken] = useLocal("jwtToken", null);
  const [user, setUser] = useLocal("username", null);
  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <nav>
      <NavLink to="/">LOGO HERE</NavLink>
      <input type="text" name="search" id="" placeholder="Search" />
      {user === null ? (
        <div>
          <NavLink to="/login">Login</NavLink>
        </div>
      ) : (
        <Profile user={user} logout={logout} />
      )}
    </nav>
  );
}

export default Header;
