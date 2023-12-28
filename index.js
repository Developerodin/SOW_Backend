import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import qs from 'qs';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import KJUR from 'jsrsasign';
import jwt from 'jsonwebtoken';
import connection from './Configs/db.js';

import multer from 'multer';

import { createReadStream } from "fs";
import adminRouter from './Routes/Admin.Router.js';
import B2BUserRouter from './Routes/B2BUsers.Router.js';
import userRouter from './Routes/Users.Router.js';
import categoryRouter from './Routes/Categories.Router.js';
import productRouter from './Routes/Products.Router.js';
import complaintRouter from './Routes/Complains.Router.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express()
const port = 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.get('/', (req, res) => {
    res.json({
      message: "Sow Server is running ...."
    })
  })
  // app.use((err, req, res, next) => {
  //   if (err instanceof multer.MulterError) {
  //     // A Multer error occurred when uploading.
  //     res.status(400).json({
  //       status: 'fail',
  //       message: err.message,
  //     });
  //   } else if (err) {
  //     // An unknown error occurred.
  //     res.status(500).json({
  //       status: 'error',
  //       message: err.message,
  //     });
  //   } else {
  //     next();
  //   }
  // });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/'); // Set the destination folder for image storage
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for the stored image
    },
  });
  const upload = multer({ storage: storage });
  // app.use('/media', express.static(path.join(__dirname, 'media')));
// app.post('/student_login',loginUser)
// app.post('/student_signup',upload.array('images', 1),createUser)
// app.post('/teacher_login',loginTeacher)
// app.post('/teacher_signup',upload.array('images', 2),createTeacher)
// app.use('/admin',adminRouter)

// JWT Middleware
 const requireToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key'); // Adjust the secret key

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};


app.get("/api/media/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const readStream = createReadStream(`media/${imageName}`);
  readStream.pipe(res);
});

app.use("/admin",adminRouter);
app.use("/api/b2b",B2BUserRouter)
app.use("/api/users",userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/product",productRouter)
app.use("/api/complaint",complaintRouter)


app.listen(port, () =>{
    connection();
    console.log(`Sow Server listening on port ${port}!`)
}

)