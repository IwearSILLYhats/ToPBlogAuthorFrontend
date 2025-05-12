import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import useLocal from "../hooks/useLocal";
import Profile from "./Profile";
import { apiPost } from "../util/postForm";

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useLocal("jwtToken", null);
  const [user, setUser] = useLocal("user", null);
  function logout() {
    setToken(null);
    setUser(null);
  }
  async function newPost() {
    const post = await apiPost(`/posts`);
    console.log(post);
    if (post.ok) {
      navigate(`/posts/${post.id}`);
    }
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
        <div>
          <button onClick={newPost}>+ New Post</button>
          <Profile user={user} logout={logout} />
        </div>
      )}
    </nav>
  );
}

export default Header;
