import express from 'express';
import { dbConnected } from './config/DB.js';
import dotenv from 'dotenv';
import router from './routes/applicationRoutes.js';
import cors from 'cors'



dotenv.config();


const app = express();


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.frontendURL,
    credentials: true,
}));

app.get("/health", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 4000;

dbConnected();

app.use('/api', router)


app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));