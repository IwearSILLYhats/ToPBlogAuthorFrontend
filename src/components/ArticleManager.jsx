import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ArticleList from "./ArticleList";
import { useOutletContext } from "react-router-dom";
function ArticleManager() {
  const userData = useOutletContext();
  const [view, setView] = useState(true);
  const { data, loading, error } = useFetch(`/users/${userData.id}/posts`);

  return (
    <main>
      <div className="contentHeader">
        <button onClick={() => setView(true)}>Published</button>
        <button onClick={() => setView(false)}>Drafts</button>
      </div>
      <div className="content">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {data && view && <ArticleList data={data} published={true} />}
        {data && !view && <ArticleList data={data} published={false} />}
      </div>
    </main>
  );
}

export default ArticleManager;
