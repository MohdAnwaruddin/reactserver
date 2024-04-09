import express from "express"
import cors from "cors";
import bodyParser from "body-parser"
import productRoutes from "./routes/productRoutes.js"
import   connect   from "./mongoose.js";
import helmet from 'helmet';
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"

//import userRoutes from "./routes/userRoutes.js"
//import User from "./models/users.js.js" 



import accountController from "./controllers/user.js"
//const config = require("./config.js");

import jwt from "jsonwebtoken"


//const jwt = require('jsonwebtoken'); 

const app = express();
app.use(
    cors(
        {
            origin: 'https://reactclient2-c9grwycl9-mohammad-anwaruddins-projects.vercel.app/' ,
    // allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
        }
    )
    );

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

app.listen(3001, () => { console.log('Server started.') });

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


