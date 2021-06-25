import express from 'express';

import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router();

// /posts Route
router.route('/')

  // GET /posts
  .get(getPosts)

  // POST /posts
  .post(createPost);

export default router;