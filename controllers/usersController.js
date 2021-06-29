// Models
import User from '../models/user.js';

// Security
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Auth
const SECRET = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) return res.status(404).json({ message: 'User doesn\'t exist.' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({
      email: existingUser.email,
      id: existingUser._id
    }, SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ profile: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.log(error);
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match.' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName
    });

    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    }, SECRET, { expiresIn: '1h' });

    res.status(201).json({ profile: newUser, token: token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
}