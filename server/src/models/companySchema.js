// /models/companySchema.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({


    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']

    },
    companyID: {
        type: String,
        required: true,
        unique: true,
    },

    departments: [{
        type: String,
        required: true
    }],

    ceo: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },

    phone: {
        type: String,
        required: true,
    },
    location: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Pending'],
        default: 'Pending',
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
    website: {
        type: String,
    },
    employees: {
        type: Number,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

},
);

export const Company = mongoose.model('Company', companySchema);
