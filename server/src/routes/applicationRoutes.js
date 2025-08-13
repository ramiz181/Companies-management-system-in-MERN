import express from 'express';
import createCompanies from '../controllers/applicationController.js';
import companiesData, { updateCompanies } from '../controllers/companyController.js';


const router = express.Router();

router.post('/addCompany', createCompanies);

router.get('/getData', companiesData)

router.put('/updateData/:id', updateCompanies)

export default router;