import { Company } from './../models/companySchema.js';

const createCompanies = async (req, res) => {

    try {

        const { companyName, companyID, departments, ceo, email, phone, location, status, registerDate, website, employees,
            updatedAt } = req.body

        // const { city, country, streetAddress } = req.body.location;

        const data = await Company.create({
            companyName,
            companyID,
            departments,
            ceo,
            email,
            phone,
            location,
            status,
            registerDate,
            website,
            employees,
            updatedAt,
        })

        return res.send(data)

    }
    catch (error) {
        console.error("Error creating company", error);
        return res.status(500).json({ message: 'Failed to create company', error: error.message });
    }
};

export default createCompanies;