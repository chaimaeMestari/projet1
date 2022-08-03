const mongoose = require('mongoose')
const User = require("../models/User")
const fs = require("fs")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB")
    const content = fs.readFileSync("./users.json")
    const usersdb = JSON.parse(content)
    const users = usersdb[2].data
    users.forEach(user => {
        (new User({
            nickname: user.accountName,
            email: user.email,
            provider: user.provider,
            email_verified_at: user.email_verified_at,
            provider_id: user.provider_id,
            active_status: user.active_status,
            password: user.password,
            avatar: user.avatar,
            gender: user.gender,
            account_type: user.accountType,
            city: user.city,
            birthday: user.dob,
            phone_number: user.phone_number,
            role: user.role,
            language: user.language,
            last_name: user.last_name,
            first_name: user.first_name,
            bio: user.bio,
            dark_mode: user.dark_mode === '1',
            messenger_color: user.messenger_color,
            spoken_language: user.spoken_language,
            undertaking: user.undertaking,
            aboutus: user.aboutus,
            interest: user.interest,
            children: user.children,
            tobacco: user.tobacco,
            alcohol: user.alcohol,
            is_profile_updated: user.is_profile_updated === '1'
        }))
        .save()
        .then(user => console.log(`User ${user.first_name} ${user.last_name} has been added`))
        .catch(err => console.log(err))
    })
})
.catch(err => console.log("Could not connect to MongoDB:", err))
