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
