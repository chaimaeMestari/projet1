const mongoose = require("mongoose")
const ChatSchema = new mongoose.Schema({
    messages: {type: Array, default: []}
})

module.exports = mongoose.model("Chat", ChatSchema)