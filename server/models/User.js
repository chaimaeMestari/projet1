const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    provider: {type: String, default: ""},
    email_verified_at: {type: String, default: null},
    provider_id: {type: String, default: ""},
    active_status: {type: String, default: ""},
    password: {type: String, required: true},
	avatar: {type: String, required: true},
	gender: {type: String, required: true},
	account_type: {type: String, required: true},
	city: {type: String, default: ""},
	birthday: {type: String, default: ""},
	phone_number: {type: String, default: ""},
	role: {type: String, default: ""},
	language: {type: String, required: true},
	last_name: {type: String, required: true},
	first_name: {type: String, required: true},
	bio: {type: String, default: ""},
	dark_mode: {type: Boolean, default: false},
	messenger_color: {type: String, default: ""},
	spoken_language: {type: Array, default: []},
	undertaking: {type: String, default: ""},
	aboutus: {type: String, default: ""},
	interest: {type: Array, default: []},
	children: {type: String, default: ""},
	tobacco: {type: String, default: ""},
	alcohol: {type: String, default: ""},
    is_profile_updated: {type: Boolean, default: false}
},
{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)