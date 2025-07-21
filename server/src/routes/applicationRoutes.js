import express from 'express';
import createCompanies from '../controllers/applicationController.js';


const router = express.Router();

router.post('/addCompany', createCompanies);

export default router;