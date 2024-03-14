import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { values, connect_database } from './config.js';
import path from 'path';
import axios from 'axios';
import fs from 'fs';


//routes 
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import graphRouter from './routes/graph.js';

const file_path = path.resolve()
const app = express();
app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(file_path + '/uploads'))

// routes 
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/graph', graphRouter);

// Connecting to the MongoDB database
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);
connect_database();

app.get('/', (req, res) => {
  res.json({ response: 'hello bro' });
});


const writeToFile = async (payload) => {
  const filename = 'teams-poc-report', extension = 'json';
  let outputFile = filename + '.' + extension;
  console.log({ outputFile })
  if (fs.existsSync(outputFile)) outputFile = filename + '_updated.' + extension;

  const payloadJson = JSON.stringify(payload, null, 2);

  await fs.writeFile(outputFile, payloadJson, (error) => console.log(error));
  return;
}



app.post('/github-webhook', (req, res) => {
  const eventName = req.headers['x-github-event'];
  const eventData = req.body;

  const message = getMessage(req.body);


  console.log(message);

  // write payload to a file
  writeToFile(message);

  // // Send message to Teams
  axios.post(values.webhooks_url, message)
    .then(response => {
      console.log('Message sent to Teams');
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error sending message to Teams:', error);
      res.sendStatus(500);
    });

  res.send('something')
});


app.post('/share-summary', async (req, res) => {
  const message = req.body;
  console.log(message);
  // writeToFile(message);

  try {
    const response = await axios.post(values.webhooks_url, message);
    console.log('Message sent to Teams');
    res.status(200).json({
      success: true,
      msg: 'Summary shared to the teams channel.'
    })
  } catch (error) {
    console.error('Error sending message to Teams:', error.message, { error });
    res.status(500).json({
      success: false,
      msg: 'There was an error while sharing the summary to the teams channel.',
      errorMessage: error.message
    })
  }
});

app.post('/curl-check', async (req, res) => {
  console.log({ response: req.body })

  res.status(200).json({
    response: req.body,
  })
});




app.listen(values.PORT, () => {
  console.log(`Server is running on port ${values.PORT}`);
});


// https://6e2c-121-241-162-10.ngrok-free.app

