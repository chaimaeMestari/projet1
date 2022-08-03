const mongoose = require("mongoose")
const PrivateChatSchema = new mongoose.Schema({
    messages: {type: Array, default: []}
})

module.exports = mongoose.model("PrivateChat", PrivateChatSchema)