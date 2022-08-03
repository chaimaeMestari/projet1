const mongoose = require("mongoose")
const ActivitySchema = new mongoose.Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    start: {type: String, required: true},
    duration: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    organizers: {type: Array, required: true},
    date: {type: String, required: true},
    attendees: {type: Array, default: []},
    interested: {type: Array, default: []},
    followers: {type: Array, default: []},
    isParticipantsLimited: {type: Boolean, required: true},
    attendeeLimitation: {type: Number},
    price: {type: Number, default: null},
    friendsNumber: {type: Number, required: true},
    topic: {type: String, required: true},
    howToFindMe: {type: String, required: true},
    chat: {type: String}
},
{timestamps: true}
)

module.exports = mongoose.model("Activity", ActivitySchema)