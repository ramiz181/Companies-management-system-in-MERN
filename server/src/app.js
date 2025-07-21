import express from 'express';
import { dbConnected } from './config/DB.js';
import dotenv from 'dotenv';


import router from './routes/applicationRoutes.js';

dotenv.config();

import cors from 'cors'

const app = express();


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

const PORT = process.env.PORT || 4000;
// const PORT = 3000;

dbConnected();

app.use('/api', router)


app.listen(PORT, () => console.log(`Server running ${PORT}`));