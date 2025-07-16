import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    // Basic company information
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },

    // Company identification
    // registrationNumber: {
    //     type: String,
    //     unique: true,
    //     sparse: true,
    //     trim: true
    // },

    // Contact information
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },

    phone: {
        type: String,
        trim: true
    },

    address: {
        type: String
        // street: String,
        // city: String,
        // state: String,
        // country: String,
        // postalCode: String
    },

    // Company settings
    // timezone: {
    //     type: String,
    //     default: 'UTC'
    // },
    // workDays: {
    //     type: [Number], // 0-6 (Sunday-Saturday)
    //     default: [1, 2, 3, 4, 5] // Monday-Friday by default
    // },
    // workStartTime: {
    //     type: String, // Store as "HH:MM" format
    //     default: '09:00'
    // },
    // workEndTime: {
    //     type: String,
    //     default: '17:00'
    // },

    // References to other collections
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // admins: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // hrUsers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }],

    // Status and timestamps
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},

    //     {
    //         timestamps: true, // Automatically manage createdAt and updatedAt
    //         toJSON: { virtuals: true },
    //         toObject: { virtuals: true }
    //     });

    // // Virtual for employee count
    // companySchema.virtual('employeeCount', {
    //     ref: 'User',
    //     localField: '_id',
    //     foreignField: 'companyId',
    //     count: true
    // });

    // // Indexes for better query performance
    // companySchema.index({ name: 1 });
    // companySchema.index({ createdBy: 1 });
    // companySchema.index({ isActive: 1 });

    // // Middleware to update timestamps
    // companySchema.pre('save', function (next) {
    //     this.updatedAt = Date.now();
    //     next();
    // }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;