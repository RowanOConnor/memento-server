import mongoose from 'mongoose';

// Models
import Post from '../models/post.js';

// Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });

  try {
    await newPost.save();
    res.status(201).json(newPost);
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

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  await Post.findByIdAndRemove(_id);

  res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  // Find post
  const post = await Post.findById(id);

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

  res.json(updatedPost);
}