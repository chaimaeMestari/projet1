const mongoose = require("mongoose")
const VerifyEmailSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    code: {type: String, required: true}
},
{timestamps: true}
)

module.exports = mongoose.model("VerifyEmail", VerifyEmailSchema)