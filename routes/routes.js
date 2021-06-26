import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/controllers.js';

const router = express.Router();

// /posts Route
router.route('/')

  // GET /posts
  .get(getPosts)

  // POST /posts
  .post(createPost);

// /posts/:id Route
router.route('/:id')

  // PATCH /posts/:id
  .patch(updatePost)

  // DELETE /posts/:id
  .delete(deletePost);

// /posts/:id/like Route
router.route('/:id/like')

  // PATCH /posts/:id/like
  .patch(likePost);

export default router;