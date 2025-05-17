import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ArticleList from "./ArticleList";

function ArticleManager() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [view, setView] = useState(true);
  const { data, loading, error } = useFetch(`/users/${user.id}/posts`);

  return (
    <main>
      <div className="contentHeader">
        <button onClick={() => setView(true)}>Published</button>
        <button onClick={() => setView(false)}>Drafts</button>
      </div>
      <div className="content">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {data && view && <ArticleList data={data} draft={true} />}
        {data && !view && <ArticleList data={data} draft={false} />}
      </div>
    </main>
  );
}

export default ArticleManager;
