import express from 'express';
import { dbConnected } from './config/DB.js';
import dotenv from 'dotenv';
import router from './routes/applicationRoutes.js';
import cors from 'cors'



dotenv.config();


const app = express();


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

const PORT = process.env.PORT || 4000;
// const PORT = 3000;

dbConnected();

app.use('/api', router)


app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));