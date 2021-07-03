import mongoose from 'mongoose';

// Models
import Post from '../models/post.js';

// Posts
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    // Limit to 12 posts per page, get start index of first post on given page
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments();

    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({
      posts: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    });
  } catch (error) {
    res.status(404).send(error);
  }
}

export const getPostsBySearch = async (req, res) => {
  const { page, q, tags } = req.query;

  try {
    // Convert to Regex to help MongoDB search more efficiently, case independent
    const regex = new RegExp(q, 'i');

    // Looking for documents matching search query, or with common tags
    const mongoQuery = { $or: [ { title: regex }, { tags: { $in: tags.split(',') } } ] };

    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments(mongoQuery);

    const posts = await Post.find(mongoQuery).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({
      posts: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    });
  } catch (error) {
    res.status(404).send(error);
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });

  try {
    await newPost.save();
    res.status(201).json({ newPost: newPost });
  } catch (error) {
    res.status(409).send(error);
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id: _id }, { new: true });

  res.status(200).json({ updatedPost: updatedPost });
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  await Post.findByIdAndRemove(_id);

  res.status(200).json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  // Find post
  const post = await Post.findById(_id);

  // See if user has liked the post
  const index = post.likes.findIndex((likeUserId) => likeUserId === String(req.userId));
  if (index === -1) {
    // User has not liked the post, like it
    post.likes.push(req.userId);
  } else {
    // User has liked the post, dislike it
    post.likes = post.likes.filter((likeUserId) => likeUserId !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, { likes: post.likes }, { new: true });

  res.status(200).json({ updatedPost: updatedPost });
}