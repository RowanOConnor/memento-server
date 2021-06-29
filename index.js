// Express, Mongoose, Cross Origin Refs
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// Create express app
const app = express();

// Configure express app
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Setup post routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Landing page route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the memories API');
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(error => console.log(error));