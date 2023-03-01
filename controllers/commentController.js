const { validationResult } = require("express-validator");
const Post = require("../models/Post");

const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const { text, userId } = req.body;

    const newComment = {
      text,
      author: userId,
    };

    post.comments.push(newComment);

    const savedPost = await post.save();

    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === req.body.commentId
    );
    if (commentIndex === -1) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    const comment = post.comments[commentIndex];

    if (comment.author.toString() !== req.body.userId.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post.comments[commentIndex].text = req.body.text;

    const savedPost = await post.save();

    res.json(savedPost.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === req.body.commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    const comment = post.comments[commentIndex];

    if (comment.author.toString() !== req.body.userId.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post.comments.splice(commentIndex, 1);

    const savedPost = await post.save();

    res.json(savedPost.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { addComment, updateComment, deleteComment };
