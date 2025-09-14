import { Admin } from "../models/authSchema.js";
import { Company } from "../models/companySchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const generateToken = (email) => {
    return jwt.sign(
        { email },
        process.env.JSON_SECRET_KEY,
        { expiresIn: '1h' }
    )
}

export const adminLogin = async (req, res) => {


    const { email, password } = req.body

    try {
        const admin = await Admin.findOne({ email })

        // if (!email) return res.status(400).json({ message: "Email not found..." })

        // const match = await bcrypt.compare(password, user.hash);

        if (admin && (await user.matchPassword(password))) {

            return res.status(200).json({
                id: admin._id,
                email: admin.email,
                token: generateToken(admin.email)
            })
        } else {
            return res.status(401).json({ message: 'invalid credentials' })
        }

        // if (!match) return res.status(400).json({ message: "Invalid Password..." })

        // const token = jwt.sign(
        //     { email: user.email },
        //     process.env.JSON_SECRET_KEY,
        //     { expiresIn: '1h' }
        // )

        // const companies = await Company.find()

        // console.log(companies);
        // return res.status(200).json({ token })

        // res.send("Done...")

    } catch (error) {
        console.log("Admin login ka error: ", error);
        res.status(500).json({ message: 'Error logging in...' });

    }

}

export const adminRegister = async (req, res) => {
    const { email, password, role } = req.body

    // const saltRounds = parseInt(process.env.PassHashingSalt) || 782



    // const salt = await bcrypt.genSalt(parseInt(saltRounds));
    // console.log("this", typeof (salt));

    try {

        const adminExist = await Admin.findOne({ email })

        if (adminExist) return res.status(409).json({ message: "The email already registered..." })

        const saltRounds = parseInt(process.env.PassHashingSalt, 10) || 8;

        const hash = await bcrypt.hash(password, saltRounds);

        const adminData = await Admin.create({
            email,
            password: hash,
            role
        })

        res.status(201).json({
            id: adminData._id,
            email: adminData.email,
            token: generateToken(adminData.email)
        })
        console.log("Response sent successfully...");

    } catch (error) {
        res.status(500).json({ message: `registration error: ${error}` })
    }
}