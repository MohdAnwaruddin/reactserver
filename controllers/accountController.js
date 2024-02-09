const User = require("../models/user");
const config = require("../config.js");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const payload = { 
      id: user.id, 
      expire: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    };

    const token = jwt.sign(payload, config.jwtSecret);
    console.log(config.jwtSecret);
    res.json({ token: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.register = async function (req, res) {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({ 
      email: req.body.email, 
      username: req.body.username 
    });

    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.profile = function(req, res) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  });
};
