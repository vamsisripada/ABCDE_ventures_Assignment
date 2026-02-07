import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();
    res.status(201).send({ 
      message: 'User created successfully', 
      user: {
        userId: user._id,
        username: user.username,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }

    if (user.token) {
      return res.status(403).send({ error: 'You are already logged in on another device' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.send({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error during logout' });
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    res.send({
      userId: req.user._id,
      username: req.user.username
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
