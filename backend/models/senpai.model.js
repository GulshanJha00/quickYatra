const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const senpaiSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name should be more than 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name should be more than 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //to make email case insensitive
        minlength: [3, "Email should be more than 3 characters long"],
    },
    password: {    
        type: String,
        required: true,
        minlength: [6, "Password should be more than 6 characters long"],
        select: false //when we find user password don't go to db
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            enum: ["red", "blue", "green", "yellow"],
            default: "red",
            required: true
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate number should be more than 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity should be at least 1"]
        },
        vehicleType: {
            type: String,
            enum: ["car", "bike", "auto"],
            required: true
        },
        location:{
            lat:{
                type: Number,
            },
            lng:{
                type: Number,
            }
        }
    },
});

senpaiSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};
senpaiSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
senpaiSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};
module.exports = mongoose.model('senpai', senpaiSchema);