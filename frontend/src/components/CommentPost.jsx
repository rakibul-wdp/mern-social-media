/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentPost = ({ setPosts, postId }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://mern-social-media-rakibul-wdp.onrender.com/api/posts/${postId}/comment`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get(
        "https://mern-social-media-rakibul-wdp.onrender.com/api/posts"
      );
      setPosts(res.data);
      setCommentText("");
    } catch (err) {
      toast.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleAddComment}
        className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentPost;
