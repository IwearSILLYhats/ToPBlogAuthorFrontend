import { useState } from "react";
import useFetch from "../../../ToPBlogUserFrontend/src/hooks/useFetch";
import ArticleList from "./ArticleList";

function ArticleManager() {
  const [view, setView] = useState(true);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/users/userid/posts`
  );

  return (
    <main>
      <div className="contentHeader">
        <button onClick={() => setView(true)}>Published</button>
        <button onClick={() => setView(false)}>Drafts</button>
      </div>
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && view && <ArticleList />}
        {data && !view && <ArticleList />}
      </div>
    </main>
  );
}

export default ArticleManager;
