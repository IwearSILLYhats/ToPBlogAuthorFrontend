import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import useFetch from "../../../ToPBlogUserFrontend/src/hooks/useFetch";
import { apiPut } from "../util/postForm";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Editor() {
  const { postId } = useParams();
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}`
  );
  const editorData = useRef(null);
  const postTitle = useRef(null);
  const [postStatus, setpostStatus] = useState(null);

  function savePost() {
    const request = apiPut(
      `/posts/${postId}`,
      JSON.stringify({ content: editorData, title: postTitle })
    );
    setpostStatus(request.status);
  }
  function publishPost() {
    const request = apiPut(`/posts/${postId}`);
  }
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <input
            type="text"
            name="title"
            id=""
            defaultValue={data.title || "Untitled Post"}
            onChange={(e) => (postTitle.current = e.target.value)}
          />
          <SimpleEditor
            editorData={editorData.current}
            content={data.post || ""}
          />
          <div>
            <button onClick={savePost}>Save</button>
            {postStatus && <p>{postStatus}</p>}
            <button onClick={publishPost}>Publish</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Editor;
