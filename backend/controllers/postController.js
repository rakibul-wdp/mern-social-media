const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUniquePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      { title, content },
      { new: true }
    );
    if (!post) throw new Error("Post not found or unauthorized");
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.userId,
    });
    if (!post) throw new Error("Post not found or unauthorized");
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes.push(req.userId);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ text, author: req.userId });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
