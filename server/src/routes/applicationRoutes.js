import express from 'express';
import createCompanies from '../controllers/applicationController.js';
import companiesData from '../controllers/companyController.js';


const router = express.Router();

router.post('/addCompany', createCompanies);

router.get('/getData', companiesData)

export default router;