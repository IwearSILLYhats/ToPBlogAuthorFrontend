import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleManager from "./components/ArticleManager.jsx";
import ArticleList from "./components/ArticleList.jsx";
import Editor from "./components/Editor.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: ArticleManager },
      { path: "editor", Component: Editor },
    ],
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
