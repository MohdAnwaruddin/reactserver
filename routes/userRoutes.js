const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user by ID
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user information by ID
router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user by ID
router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
