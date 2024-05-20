const userSchema = new mongoose.Schema({
    accountCreated: { type: String, required: true }, // Assuming date is converted to a string
    fullName: { type: String, required: true },
    security: {
        address: { type: String, required: true },
        dob: { type: String, required: true }, // Assuming date is converted to a string
        email: { type: String, required: true },
        lastLogin: { type: String, required: true }, // Assuming date is converted to a string
        passwordHash: { type: String, required: true }, // Store the hashed password
        phoneNumber: { type: String, required: true },
        status: { type: String, required: true },
        twoFactorAuthentication: { type: String, required: true } // Assuming boolean is converted to a string
    }
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;
