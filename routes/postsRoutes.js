const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const {
  createPostValidation,
  updatePostValidation,
  addCommentValidation,
  updateCommentValidation,
} = require("../middleware/validations");

// Post endpoints
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/create", auth, createPostValidation, createPost);
router.put("/update/:id", auth, updatePostValidation, updatePost);
router.delete("/delete/:id", auth, deletePost);

// Comment endpoints
router.put("/comments/add/:id", auth, addCommentValidation, addComment);
router.put("/comments/edit/:id", auth, updateCommentValidation, updateComment);
router.delete("/comments/delete/:id", auth, deleteComment);

module.exports = router;
