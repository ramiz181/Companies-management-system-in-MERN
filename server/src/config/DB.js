
import mongoose from "mongoose";

export const dbConnected = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_URL)

        console.log("MongoDB connected");


    } catch (error) {

        console.log(`error in DB connection ${error}`);
        process.exit(1);
    }
}