import express from 'express';
import { dbConnected } from './config/DB.js';
import dotenv from 'dotenv';
import Company from './models/companySchema.js';

dotenv.config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

dbConnected();

app.post('/', async (req, res) => {

    const { name, noo } = req.body

    const data = await Company.create({
        name,
        noo
    })
    return res.send(data)
})


app.listen(PORT, () => console.log(`Server running ${PORT}`));