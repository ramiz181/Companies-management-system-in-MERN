import express from 'express';
import createCompanies from '../controllers/applicationController.js';
import companiesData, { updateCompanies } from '../controllers/companyController.js';
import { adminLogin, adminRegister } from '../controllers/authController.js';



const router = express.Router();

router.post('/addCompany', createCompanies);

router.get('/getData', companiesData)

router.put('/updateData/:id', updateCompanies)

router.post('/registerAdmin', adminRegister)

router.post('/adminLogin', adminLogin)

export default router;