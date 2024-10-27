import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/posts",
        { title: newPost.title, content: newPost.content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      setNewPost({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

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

  const handleUpdatePost = async (postId) => {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    if (newTitle && newContent) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/posts/${postId}`,
          { title: newTitle, content: newContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to update post:", err);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Social Media Posts</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
            <button
              onClick={handleCreatePost}
              className="w-full bg-blue-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Like ({post.likes.length})
                </button>
                <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Comment ({post.comments.length})
                </button>
                <button
                  onClick={() => handleUpdatePost(post._id)}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Delete
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
                  className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-blue-700"
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
