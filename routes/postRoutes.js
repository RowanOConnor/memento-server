import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';

// Middleware
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// /posts Route
router.route('/')

  // GET /posts
  .get(getPosts)

  // POST /posts
  .post(auth, createPost);

// /posts/:id Route
router.route('/:id')

  // PATCH /posts/:id
  .patch(auth, updatePost)

  // DELETE /posts/:id
  .delete(auth, deletePost);

// /posts/:id/like Route
router.route('/:id/like')

  // PATCH /posts/:id/like
  .patch(auth, likePost);

export default router;