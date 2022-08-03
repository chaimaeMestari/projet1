const router = require("express").Router()
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const { handleAvatarUpload, verifyEditPasswordToken } = require("../middlewares")
const { generateEmailVerificationCode, sendMail } = require("../utils")
const User = require("../models/User")
const VerifyEmail = require("../models/VerifyEmail")

/**
 * Endpoint for registering a new user
 * Method: POST
 * Body:
 *   Required:
 *     nickname[String]
 *     email[String]
 *     password[String]
 *	   avatar[String]
 *	   gender[String]
 *	   account_type[String]
 *	   language[String]
 *	   last_name[String]
 *	   first_name[String]
 *   Optional:
 *     provider[String]
 *     email_verified_at[String]
 *     provider_id[String]
 *     active_status[String]
 *	   account_name[String]
 *	   city[String]
 *	   dob[String]
 *	   phone_number[String]
 *	   role[String]
 *	   bio[String]
 *	   dark_mode[Boolean]
 *	   messenger_color[String]
 *	   active_status[String]
 *	   spoken_language[Array]
 *	   undertaking[String]
 *	   aboutus[String]
 *	   interest[Array]
 *	   children[String]
 *	   tobacco[String]
 *	   alcohol[String]
 *     is_profile_updated[Boolean]
 * Returns: the new user after storing it in the database or an error
 */
router.post("/register", handleAvatarUpload, async (req, res) => {
    try {
        if(req.body){ 
            console.log(req.body)
            console.log("The hash key is:", process.env.HASH_SECRET_KEY)
            const user = new User({
                ...req.body,
                password: CryptoJS.DES.encrypt(req.body.password, process.env.HASH_SECRET_KEY).toString()
            })
            //console.log("Dehashed:", CryptoJS.AES.decrypt(hashedPassword, process.env.HASH_SECRET_KEY).toString(CryptoJS.enc.Utf8))
            const savedUser = await user.save()
            const emailVerificationCode = generateEmailVerificationCode()
            const verifyEmail = new VerifyEmail({
                code: emailVerificationCode,
                email: req.body.email
            })
            await verifyEmail.save()
            sendMail({
                from: process.env.MAIL_FROM_ADDRESS,
                to: req.body.email,
                subject: process.env.MAIL_SUBJECT,
                text: "",
                html: `<h1>Here is you confirmation code: ${emailVerificationCode}</h1>`
            })
            .then(res => console.log(res))
            .catch(err => res.status(500).json(err))
            const {password, ...info} = savedUser._doc
            
            res.status(201).json(info)
        } else {
            res.status(400).json("Bad credentials")
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

/**
 * Verify the user's email
 * Method: POST
 * Required:
 *   code[String]
 *   email[String]
 * Optional:
 * Returns: a confirmation message or an error
 */
router.post("/verify_email", async (req, res) => {
    try{
        if(req.body.code && req.body.email){
            const verifyEmail = await VerifyEmail.findOne({email: req.body.email})
            console.log(verifyEmail)
            if(verifyEmail.code === req.body.code){
                const today = new Date()
                await User.findOneAndUpdate({email: req.body.email}, {$set: {email_verified_at: today.toLocaleDateString()}}, {new: true})
                await VerifyEmail.findByIdAndDelete(verifyEmail._id)
                res.status(200).json("Email verified successfully")
            } else {
                res.status(400).json("Wrong verification code")
            }
        } else {
            res.status(400).json("Email verification code and email are required")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * Endpoint for initializing a session for creating a new password
 * Method: POST
 * Headers:
 * Body:
 *   Required:
 *     email[String]
 *   Optional:
 * Returns: a session token or an error
 */
router.post("/forgot_password", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
        res.status(307).json({token: token})
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * Endpoint for creating a new password after forgetting the previous one
 * Method: POST
 * Headers:
 *   token[String]
 * Body:
 *   Required:
 *     password[String]
 *   Optional:
 * Returns: the edited user or an error
 */
router.post("/new_password", verifyEditPasswordToken, async (req, res) => {
    if(req.user){
        try {
            const updatedUser = await User.findById(req.user.id, {$set: {password: req.body.password}}, {new: true})
            const {password, ...info} = updatedUser._doc
            res.status(200).json(info)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status("403").json("You are not allowed")
    }
})

/**
 * Endpoint for login
 * Method: POST
 * Required:
 *   email      String
 *   password   String
 * Optional:
 * Returns: a new session token or an error
 */
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            console.log("OK1")
            res.status(401).json("Wrong email or password")
        } else {
            console.log("OK2")
            console.log(process.env.HASH_SECRET_KEY)
            console.log("Encrypted password", user.password)
            const bytes = CryptoJS.DES.decrypt(user.password, process.env.HASH_SECRET_KEY)
            console.log(bytes)
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
            console.log(originalPassword)
            if(req.body.password && req.body.password === originalPassword){
                const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                const {password, ...info} = user._doc
                res.status(200).json({...info, accessToken})
            } else {
                res.status(401).json("Wrong email or password")
            }
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router