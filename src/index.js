import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import auth from './routes/auth';
import users from './routes/users';

// init private keys
dotenv.config();

const app = express();
mongoose.connect(process.env.MONGODB_URI);

// parse application/json data
app.use(bodyParser.json());

// route mounting middleware config
app.use('/api/auth', auth);
app.use('/api/users', users);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Server running on port 8080'));
