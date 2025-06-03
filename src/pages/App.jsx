import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import useLocal from "../hooks/useLocal";

function App() {
  const [user, setUser] = useLocal("user", null);
  return (
    <>
      <Header userData={{ user, setUser }} />
      {user && <Outlet context={user} />}
      {!user && <h1>Login to access your articles</h1>}
    </>
  );
}

export default App;
