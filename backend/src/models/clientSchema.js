const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true, // Ensures the 'name' field is required
        // Ensures the 'name' field values are unique
        minlength: 2,   // Minimum length for the 'name'
        maxlength: 50   // Maximum length for the 'name'
    },
    email: {
        type: String,
        required: true,  // Ensures the 'email' field is required
        unique: true,    // Ensures the 'email' field values are unique
        // Validate email format using a regular expression
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: (props) =>
                `${props.value} is not a valid phone number! Please enter a 10-digit mobile number.`,
        },
    },
    country: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        max: 999999, // Define the maximum value for the phone number
        required: true,
    }
});


module.exports = mongoose.model('User', userSchema);