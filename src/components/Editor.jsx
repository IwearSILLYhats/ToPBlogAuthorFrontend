import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import useFetch from "../../../ToPBlogUserFrontend/src/hooks/useFetch";
import { apiDelete, apiPut } from "../util/postForm";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editor() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}`
  );
  const editorData = useRef(null);
  const postTitle = useRef(null);
  const [publishStatus, setPublishStatus] = useState(null);
  const [postStatus, setpostStatus] = useState(null);
  const [deletePost, setDeletePost] = useState(false);

  async function savePost() {
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
    if (deletePost) {
      const deleteRequest = await apiDelete(`/posts/${postId}`);
      if (deleteRequest.error) {
        return setpostStatus(deleteRequest.error);
      }
      setpostStatus(deleteRequest);
      return setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (
      updatedPost.content ||
      updatedPost.title ||
      updatedPost.published !== null
    ) {
      const request = await apiPut(`/posts/${postId}`, updatedPost);
      setpostStatus(request);
    } else {
      setpostStatus({
        error: "Submit canceled, no changes made.",
      });
    }
  }
  function publishPost() {
    if (publishStatus === null) setPublishStatus(data.published);
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
            {postStatus?.error && <p className="error">{postStatus.error}</p>}
            <button onClick={savePost}>Save</button>
            <button onClick={publishPost}>
              {publishStatus ? "Unpublish" : "Publish"}
            </button>
            <button onClick={() => setDeletePost(!deletePost)}>
              {deletePost ? "Cancel Delete" : "Delete Post"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Editor;
