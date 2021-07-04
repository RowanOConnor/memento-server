import express from 'express';

import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentOnPost } from '../controllers/postsController.js';

// Middleware
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// /posts Route
router.route('/')

  // GET /posts
  .get(getPosts)

  // POST /posts
  .post(auth, createPost);

// /posts/search Route
router.route('/search')

  // GET /posts/search
  .get(getPostsBySearch);

// /posts/:id Route
router.route('/:id')

  .get(getPost)

  // PATCH /posts/:id
  .patch(auth, updatePost)

  // DELETE /posts/:id
  .delete(auth, deletePost);

// /posts/:id/like Route
router.route('/:id/like')

  // PATCH /posts/:id/like
  .patch(auth, likePost);

// /posts/:id/comment Route
router.route('/:id/comment')

  // PATCH /posts/:id/comment
  .patch(auth, commentOnPost);

export default router;