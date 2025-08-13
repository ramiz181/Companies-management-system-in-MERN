import { Company } from './../models/companySchema.js';


const companiesData = async (req, res) => {

    try {

        const companies = await Company.find()

        res.status(200).json(companies)


    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch companies', error: error.message })
    }
}

export const updateCompanies = async (req, res) => {

    try {
        const { id } = req.params
        const { companyName } = req.body

        const companyData = await Company.findByIdAndUpdate(
            id,
            { companyName },
            { new: true }
        )

        if (!companyData) {
            res.status(400).json({ message: "Company not found" })
        }

        console.log("testing update API");
        res.json(updateCompanies)

    } catch (error) {
        console.log(error);

    }

}

export default companiesData;