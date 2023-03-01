const { validationResult } = require("express-validator");
const Post = require("../models/Post");

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const PAGE_LIMIT = 2;

  try {
    const count = await Post.countDocuments();
    const posts = await Post.find()
      .populate("author", "-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_LIMIT)
      .limit(PAGE_LIMIT);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(count / PAGE_LIMIT),
      totalPosts: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "-password"
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, userId } = req.body;

    const post = new Post({
      title,
      author: userId,
      description,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.author.toString() !== req.body.UserId.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;

    const savedPost = await post.save();

    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.comments.length > 0) {
      return res.status(400).json({ msg: "Cannot delete post with comments" });
    }

    await post.deleteOne();

    res.json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
