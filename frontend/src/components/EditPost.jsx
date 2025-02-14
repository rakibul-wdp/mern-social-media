/* eslint-disable react/prop-types */
import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const EditPost = ({ isEditPostOpen, setIsEditPostOpen, postId, setPosts }) => {
  const [editPost, setEditPost] = useState({ title: "", content: "" });

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        { title: editPost.title, content: editPost.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      setEditPost({ title: "", content: "" });
      setIsEditPostOpen(false);
    } catch (err) {
      toast.error("Failed to update post:", err);
    }
  };

  return (
    <Dialog
      open={isEditPostOpen}
      onClose={() => setIsEditPostOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-3xl space-y-4 bg-white p-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editPost.title}
                onChange={(e) =>
                  setEditPost({ ...editPost, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Content"
                value={editPost.content}
                onChange={(e) =>
                  setEditPost({ ...editPost, content: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
              <button
                onClick={handleUpdatePost}
                className="w-full bg-blue-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-700"
              >
                Edit Post
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditPost;
