import mongoose from 'mongoose';
import Post from '../models/posts.js';

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
  const newPost = new Post(post);

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

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, { $inc: { likeCount: 1 }}, { new: true });

  res.json(updatedPost);
}