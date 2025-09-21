import jwt from "jsonwebtoken";


const protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const tokenDecode = jwt.verify(token, process.env.JSON_SECRET_KEY)
            // console.log("Line 13 middleware : ", tokenDecode);
            next()

        } catch (error) {
            console.log("Error in companies middleware", error);
        }
    }


}

export default protect;