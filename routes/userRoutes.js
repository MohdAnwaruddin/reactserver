


const express = require('express');
const { User } = require('../models/users.js');
const bcrypt = require('bcrypt');

const router = express.Router();
//const UserModel = require('../models/User');
 
// Get all users
router.get('/users', async (req, res) => {
  try {
    console.log("Get a specific user by ID");
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Get a specific user by ID
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    console.log("Get a specific user by ID");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Update user information by ID
router.post('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;

  console.log("updating the user");
console.log(password);
  try {
    // Hash the new password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
    }

    // Prepare the update object based on the provided fields
    const updateObject = {};
    if (username) updateObject.username = username;
    if (email) updateObject.email = email;
    if (hashedPassword) updateObject.password = hashedPassword;

    // Update the user document
    const user = await User.findByIdAndUpdate(
      userId,
      updateObject,
      { new: true } // Return the updated user
    );

    console.log(user);
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
    console.log("deleting the user");
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
export default router;