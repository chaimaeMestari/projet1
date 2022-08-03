const { verifyLoginState } = require("../middlewares")
const Chat = require("../models/Chat")

const router = require("express").Router()

/**
 * Endpoint for creating a chat
 * Method POST
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 *   Required:
 *     messages[Array]
 *   Optional:
 * Returns: the created chat
 */
router.post("/:id", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            const chat = new Chat(req.body)
            const savedChat = await chat.save()
            res.status(200).json(savedChat)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

/**
 * Endpoint for getting a chat
 * Method GET
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: the created chat
 */
router.get("/:id", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            const chat = await Chat.findById(req.params.id)
            res.status(200).json(chat)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

/**
 * Endpoint for getting a chat
 * Method PUT
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: the created chat
 */
router.put("/:id", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            const updatedChat = await Chat.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedChat)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

/**
 * Endpoint for deleting a chat
 * Method DELETE
 * Headers:
 *   token[String]  the access token received after logging in
 * Body:
 * Returns: An error if a problem occurs
 */
router.delete("/:id", verifyLoginState, async (req, res) => {
    if(req.user){
        try {
            await Chat.findByIdAndDelete(req.params.id)
            res.status(200).json("Chat deleted")
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not logged in")
    }
})

module.exports = router