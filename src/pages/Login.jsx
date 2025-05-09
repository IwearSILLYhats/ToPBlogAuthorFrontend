import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(event.target));
      const fetchData = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!fetchData.ok) {
        throw new Error(`HTTP error: Status ${fetchData.status}`);
      }
      const responseData = await fetchData.json();
      localStorage.setItem(
        "jwtToken",
        JSON.stringify("Bearer " + responseData.token)
      );
      localStorage.setItem("username", JSON.stringify(responseData.user));
      console.log(responseData);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <NavLink to="/">LOGO HERE</NavLink>
      <div className="formWrapper">
        <form action="/login" method="get" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="loginEmail" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="loginPassword" />
          {error && <p>{error.message}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
