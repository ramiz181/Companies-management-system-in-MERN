import { Company } from './../models/companySchema.js';


const companiesData = async (req, res) => {

    try {

        const companies = await Company.find()

        res.status(200).json(companies)


    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch companies', error: error.message })
    }
}

export default companiesData;