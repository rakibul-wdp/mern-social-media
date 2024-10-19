import { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Social Media Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Like ({post.likes.length})
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  Comment ({post.comments.length})
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Comment
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {post.comments.map((comment, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-semibold">
                      {comment.author.username}:{" "}
                    </span>
                    {comment.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
