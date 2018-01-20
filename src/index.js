import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// init private keys
dotenv.config();

import auth from './routes/auth';

const app = express();
mongoose.connect(process.env.MONGODB_URI);

//parse application/json data
app.use(bodyParser.json());

// route mounting middleware config
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Server running on port 8080'));
