const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/postController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);

module.exports = router;
