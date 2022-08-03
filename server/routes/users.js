const router = require("express").Router()
const User = require("../models/User")
const { verifyLoginState } = require("../middlewares")

/**
 * Get a logged in user's information
 * Method: GET
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: the user or an error
 */
router.get("/:id", verifyLoginState, async (req, res) => {
    if(req.user){ // Maybe some validation staff here, like if req.user === req.params.id
        try {
            const user = await User.findById(req.params.id)
            const {password, ...info} = user._doc
            res.status(200).json(info)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You are not logged in")
    }
})

/**
 * Update a user's information
 * Method: PUT
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 *   Required:
 *   Optional:
 *     nickname[String]
 *     email[String]
 *     password[String]
 *	   avatar[String]
 *	   gender[String]
 *	   account_type[String]
 *	   language[String]
 *	   last_name[String]
 *	   first_name[String]
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
 * Returns: the updated user or an error
 */
router.put("/", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You are not logged in")
    }
})


module.exports = router