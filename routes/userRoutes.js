import express from 'express';

import { signin, signup } from '../controllers/usersController.js';

const router = express.Router();

// /users/signin Route
router.route('/signin', cors())

  // POST /users/signin
  .post(signin);

// /users/signup Route
router.route('/signup', cors())

  // POST /users/signup
  .post(signup);

export default router;