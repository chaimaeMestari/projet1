const router = require("express").Router()
const Activity = require("../models/Activity")
const Chat = require("../models/Chat")
const { verifyLoginState } = require("../middlewares")
const { handleActivityImageUpload } = require("../middlewares")

/**
 * Endpoint for creating a new activity
 * Method POST
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 *   Required:
 *     title[String]
 *     description[String]
 *     img[String]
 *     organizers[Array]
 *     date[String]
 *     start[String]
 *     duration[String]
 *     address[String]
 *     topic[String]
 *     isParticipantsLimited[Boolean]
 *     attendeeLimitation[Number]
 *     friendsNumber[Number]
 *   Optional:
 *     price[Number]
 *     howToFindMe[String]
 *     attendees[Array]
 *     followers[Array]
 * Returns: the new activity
 */
router.post("/", verifyLoginState, handleActivityImageUpload, async (req, res) => {
    if(req.user){
        try {
            const chat = await (new Chat({
                messages: []
            })).save()
            const activity = new Activity({...req.body, chat: chat._id, organizers: [req.user.id]})
            const savedActivity = await activity.save()
            res.status(201).json(savedActivity)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Your are not logged in")
    }
})

/**
 * Endpoint for getting all activities
 * Method GET
 * Headers:
 * Body:
 * Returns: the activities or an error
 */
router.get("/all", async (req, res) => {
    try {
        const activities = await Activity.aggregate([
            { $sort: { updatedAt: -1 } },
            { $sort: { start: 1 } }
        ])

        res.status(200).json(activities)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * Endpoint for getting your own activies or those you are attending to
 * Method GET
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: the activities or an error
 */
router.get("/my_activities", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            const activities = await Activity.aggregate([
                {
                    $match: {
                        $or: [
                            { organizers: { $all: [req.user.id] } },
                            { attendees: { $all: [req.user.id] } }
                        ]
                    }
                },
                { $sort: { updatedAt: -1 } },
                { $sort: { start: 1 } }
            ])
            
            res.status(200).json(activities)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

/**
 * Endpoint for getting an activity with a specific id
 * Method GET
 * Headers:
 * Body:
 * Returns: the requested activity or an error
 */
router.get("/find/:id", async (req, res) => {
    try{
        const activity = await Activity.findById(req.params.id)
        res.status(200).json(activity)
    } catch(err) {
        res.status(500).json(err)
    }
})

/**
 * Endpoint for editting an activity with a specific id
 * Method PUT
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 *   Required:
 *   Optional:
 *     title[String]
 *     description[String]
 *     img[String]
 *     date[String]
 *     start[String]
 *     duration[String]
 *     address[String]
 *     followers[Array]
 *     topic[String]
 *     isParticipantsLimited[Boolean]
 *     attendeeLimitation[Number]
 *     friendsNumber[Number]
 *     price[Number]
 *     howToFindMe[String]
 * Returns: the updated activity or an error
 */
router.put('/:id', verifyLoginState, async (req, res) => {
    if(req.user){
        if(!req.body.chat){
            if(req.body.organizers) res.status(401).json("Please use /api/activities/<activity_id>/organizers to edit the organizers")
            if(req.body.attendees) res.status(401).json("Please use /api/activities/<activity_id>/attendees to edit the attendees")
            try {
                const activity = await Activity.findById(req.params.id)
                if(activity.organizers.indexOf(req.user.id)){
                    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                    res.status(200).json(updatedActivity)
                } else {
                    res.status(401).json("You are not an organizer of this activity")
                }
            } catch(err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You cannot edit the chat")
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

/**
 * Endpoint for editing an activity's organizers
 * Method PUT
 * Headers:
 *   token[String] the access token received after logging in
 * Body:
 *   Required:
 *     organizers[Array]
 *   Optional:
 * Returns: the edited activity or an error
 */
router.put("/:id/organizers", verifyLoginState, async (req, res) => {
    if(req.user) {
        try {
            let operation
            if(req.query && req.query.operation){
                operation = req.query.operation
            } else {
                operation = "add"
            }

            const {organizers, ...others} = req.body
            if(organizers && Object.keys(others).length === 0){
                let updatedActivity
                if(operation === "add") {
                    updatedActivity = await Activity.findByIdAndUpdate(
                        req.params.id,
                        {$addToSet: {organizers: {$each: organizers}}},
                        {new: true}
                    )
                } else {
                    updatedActivity = await Activity.findByIdAndUpdate(
                        req.params.id,
                        {$pullAll: {organizers: organizers}},
                        {new: true}
                    )
                }
                
                res.status(200).json(updatedActivity)
            } else {
                res.status(401).json("Only 'organizers' parameter is required")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Your are not logged in")
    }
})

/**
 * Endpoint for editing an activity's attendees
 * Method PUT
 * Headers:
 *   token[String] the access token received after logging in
 * Body:
 *   Required:
 *     attendees[Array]
 *   Optional:
 * Returns: the edited activity or an error
 */
router.put("/:id/attendees", verifyLoginState, async (req, res) => {
    if(req.user) {
        try {
            let operation
            if(req.query && req.query.operation){
                operation = req.query.operation
            } else {
                operation = "add"
            }

            const {attendees, ...others} = req.body
            if(attendees && Object.keys(others).length === 0){
                let updatedActivity
                if(operation === "add") {
                    updatedActivity = await Activity.findByIdAndUpdate(
                        req.params.id,
                        {$addToSet: {attendees: {$each: attendees}}},
                        {new: true}
                    )
                } else {
                    updatedActivity = await Activity.findByIdAndUpdate(
                        req.params.id,
                        {$pullAll: {attendees: attendees}},
                        {new: true}
                    )
                }
                
                res.status(200).json(updatedActivity)
            } else {
                res.status(401).json("Only 'attendees' parameter is required")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Your are not logged in")
    }
})


/**
 * Endpoit for deleting an activity with a specific id
 * Method DELETE
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: An error if a problem occurs
 */
router.delete("/:id", verifyLoginState, async (req, res) => {
    if(req.user){
        try{
            const activity = await Activity.findById(req.params.id)
            if(req.user.id in activity.organizers){
                await Chat.findByIdAndDelete(activity.chat)
                await Activity.findByIdAndDelete(req.params.id)
                res.status(200).json("Activity deleted")
            } else {
                res.status(401).json("You are not an organizer of this activity")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})


module.exports = router