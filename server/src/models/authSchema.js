import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const adminLoginSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        require: [true, "username is required"]
    },

    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },

    password: {
        type: String,
        require: [true, "Password is require"],
        minlength: 6
    },

    hash: {
        type: String
    },

    role: {
        type: String,
        enum: ["superadmin", "admin"],
        default: "superadmin"
    },

    lastLogin: {
        type: Date,
    },
})


adminLoginSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.hash)
}

export const Admin = mongoose.model('Admin', adminLoginSchema);