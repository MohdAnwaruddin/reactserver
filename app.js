const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes.js");
const connect = require("./mongoose.js");
const helmet = require('helmet');
const userRoutes = require("./routes/userRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");

//const userRoutes = require("./routes/userRoutes.js");
//const User = require("./models/users.js.js"); 

const accountController = require("./controllers/user.js");
//const config = require("./config.js");

const jwt = require("jsonwebtoken");


//const jwt = require('jsonwebtoken'); 

const app = express();
app.use(
    cors() );

app.use(helmet
        ({
        referrerPolicy: { policy: 'no-referrer-when-downgrade' }
      })
      );
      
app.use(bodyParser.json());

    connect().then(() => {

    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });



  app.get('/', (req, res) => { res.send('Introduction JWT Auth'); });
  app.get('/profile', verifyToken, accountController.profile);
  app.post('/login', accountController.login);
  app.post('/register', accountController.register);
  app.post('/contact', contactRoutes.contact);

  //app.use('/api', userRoutes);


app.use('/products', productRoutes);
app.use('/user' , userRoutes)
app.use('/cart', cartRoutes)
//app.use('/api' , contactRoutes)


const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    
   
  let token = req.headers['x-access-token'] || req.headers['authorization'];

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
app.listen(process.env.PORT || 8000, () => { console.log('Server started.') });



