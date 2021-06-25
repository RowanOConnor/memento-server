// Express, Mongoose, Cross Origin Refs
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import postRoutes from './routes/posts.js';

// Create express app
const app = express();

// Configure express app
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Setup post routes
app.use('/posts', postRoutes);

const username = 'rowan';
const password = 'gshit';
const CONNECTION_URL = `mongodb+srv://${username}:${password}@memories.yjsod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(error => console.log(error));