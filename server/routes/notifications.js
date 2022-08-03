const router = require("express").Router()
const Notification = require("../models/Notification")
const { verifyNotificationHandlingAuthorization, verifyLoginState } = require("../middlewares")

/**
 * Endpoint for creating a new notification
 * Method POST
 * Headers:
 *   token[String]  the access token received after logging in
 *   notification_auth_key[String]  the key required to be allowed make the request
 * Body:
 *   Required:
 *     recipient[String]
 *     message[String]
 *     type[String]
 *   Optional:
 *     location[String]
 * Returns: the created notification or an error
 */
router.post("/", verifyNotificationHandlingAuthorization, verifyLoginState, async (req, res) => {
    if(req.authentificated){
        if(req.user){
            try{
                const notification = await new Notification({author: req.user.id, ...req.body}).save()
                res.status(201).json(notification)
            } catch(err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You are not logged in")
        }
    } else {
        res.status(403).json("You are not allowed")
    }
})

/**
 * Endpoint for getting a notification with a specific id
 * Method GET
 * Headers:
 *   token[String]  the access token received after logging in
 *   notification_auth_key[String]  the key required to be allowed make the request
 * Body:
 * Returns: the notification or an error
 */
 router.get("/my_notifications", verifyNotificationHandlingAuthorization, verifyLoginState, async (req, res) => {
    if(req.authentificated){
        if(req.user){
            try{
                const type = req.query.type
                let notifications
                console.log(type)
                if(type){
                    notifications = await Notification.aggregate([
                        {$match: {
                            $and: [
                                {$expr: {$eq: ['$recipient', req.user.id]}},
                                {$expr: {$eq: ['$type', type]}}
                            ]
                        }},
                        {$sort: {createdAt: -1}}
                    ])
                } else {
                    notifications = await Notification.find({recipient: req.user.id})
                }

                res.status(200).json(notifications)
            } catch(err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You are not logged in")
        }
    } else {
        res.status(403).json("You are not allowed")
    } 
})

/**
 * Endpoint for getting a notification with a specific id
 * Method GET
 * Headers:
 *   token[String]  the access token received after logging in
 *   notification_auth_key[String]  the key required to be allowed make the request
 * Body:
 * Returns: the notification or an error
 */
router.get("/find/:id", verifyNotificationHandlingAuthorization, verifyLoginState, async (req, res) => {
    if(req.authentificated){
        if(req.user){
            try{
                const notification = await Notification.findById(req.params.id)
                res.status(200).json(notification)
            } catch(err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You are not logged in")
        }
    } else {
        res.status(401).json("You are not allowed")
    } 
})

module.exports = router