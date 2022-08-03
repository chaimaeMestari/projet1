const mongoose = require("mongoose")
const NotificationSchema = new mongoose.Schema({
    author: {type: String, required: true},
    recipient: {type: String, required: true},
    message: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: String, default: null}
},
{timestamps: true}
)

module.exports = mongoose.model("Notification", NotificationSchema)