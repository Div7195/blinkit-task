import express from 'express'
import dbConnection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
  origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'DELETE'],
}));
app.use('/',Router);
const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

dbConnection(USERNAME, PASSWORD);