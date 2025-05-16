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
  const [publishStatus, setPublishStatus] = useState(null);
  const [postStatus, setpostStatus] = useState(null);

  async function savePost() {
    console.log("Clicking submit...");
    let updatedPost = {};
    if (editorData.current !== null) {
      updatedPost.content = JSON.stringify(editorData.current);
    }
    if (postTitle.current !== null) {
      updatedPost.title = postTitle.current;
    }
    if (publishStatus !== null) {
      updatedPost.published = publishStatus;
    }
    if (updatedPost.content || updatedPost.title || updatedPost.published) {
      const request = await apiPut(`/posts/${postId}`, updatedPost);
      setpostStatus(request);
    } else {
      setpostStatus("Tried to submit post, but no changes recorded.");
    }
  }
  function publishPost() {
    if (publishStatus === null) setPublishStatus(false);
    setPublishStatus(!publishStatus);
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
            onChange={(e) => {
              postTitle.current = e.target.value;
            }}
          />
          <SimpleEditor
            editorData={editorData}
            content={JSON.parse(data.content) || ""}
          />
          <div>
            {postStatus?.success && (
              <p className="success">{postStatus.success}</p>
            )}
            {postStatus?.error && <p className="error">{postStatus}</p>}
            <button onClick={savePost}>Save</button>
            <button onClick={publishPost}>
              {publishStatus ? "Unpublish" : "Publish"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Editor;
