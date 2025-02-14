import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePost = ({ isCreatePostOpen, setIsCreatePostOpen, setPosts }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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
      setIsCreatePostOpen(false);
    } catch (err) {
      toast.error("Failed to create post:", err);
    }
  };

  return (
    <Dialog
      open={isCreatePostOpen}
      onClose={() => setIsCreatePostOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-3xl space-y-4 bg-white p-5">
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
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreatePost;
