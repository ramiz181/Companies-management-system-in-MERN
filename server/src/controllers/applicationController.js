import { Company } from './../models/companySchema.js';

const createCompanies = async (req, res) => {

    try {

        const { name, email, phone, address, departments, isActive, createdAt, updatedAt } = req.body

        const data = await Company.create({
            name,
            email,
            phone,
            address,
            departments,
            isActive,
            createdAt,
            updatedAt,
        })

        return res.send(data)

    }
    catch (error) {
        console.log(error);
    }
};


export default createCompanies;