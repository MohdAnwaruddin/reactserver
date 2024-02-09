const express = require('express');
const app = express();
const User = require('./models/user.js');
const accountController = require('./controllers/accountController');
const bodyParser = require('body-parser');
const config = require("./config.js");
const jwt = require('jsonwebtoken'); // Import jsonwebtoken module
app.use(bodyParser.urlencoded({ extended: false }));

const { connect } = require("./Database_mongoose.js");
const mongoose = require('mongoose');

connect().then((connectedClient) => {
    client = connectedClient;
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

app.get('/', (req, res) => { res.send('Introduction JWT Auth'); });
app.get('/profile', verifyToken, accountController.profile);
app.post('/login', accountController.login);
app.post('/register', accountController.register);
app.listen(3000, () => { console.log('Server started.') });


const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    
    //const jwt = require('jsonwebtoken');
    let token = req.headers['x-access-token'] || req.headers['authorization'];
 // const token = req.headers['authorization'];

 if (token && token.startsWith('Bearer ')) {

    token = token.slice(7, token.length);
   
    }
    
  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    console.log(config.jwtSecret);
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
    req.user = decoded;
    next();
  });
}
