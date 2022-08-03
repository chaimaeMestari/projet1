const multer = require("multer")
const { randomString } = require("./utils")
const jwt = require("jsonwebtoken")
const avatarImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/app/public/users-avatar-test/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    const extension = file.originalname.split(".")[1]
    const filename = randomString(30) + '.' + extension
    req.body.avatar = 'storage/app/public/users-avatar-test/' + filename
    cb(null, filename)
  }
})

const activityImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/app/public/activites-images/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    const extension = file.originalname.split(".")[1]
    const filename = randomString(30) + '.' + extension
    req.body.avatar = 'storage/app/public/activites-images/' + filename
    cb(null, filename)
  }
})
  
const avatarUpload = multer({ storage: avatarImageStorage })
const eventImageUpload = multer({ storage: activityImageStorage })

const lib = {}

/**
 * Middleware for handling avatar upload
 * req 
 * res 
 * next 
 */
lib.handleAvatarUpload =  avatarUpload.any()

lib.handleActivityImageUpload = eventImageUpload.any()

/**
 * Verify whether the user is logged in or not
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
lib.verifyLoginState = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        try{
            const token = authHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = user
            next()
        } catch(err) {
            res.status(403).json("Token is not valid!")
        }
    } else {
        return res.status(401).json("You are not authentificated")
    }
}

/**
 * Make sure the request sender is allowed to handle notifications in the database
 * @param req 
 * @param res 
 * @param next 
 */
lib.verifyNotificationHandlingAuthorization = (req, res, next) => {
  const authHeader = req.headers.notification_auth_key
  console.log(authHeader, process.env.NOTIFICATION_AUTHORIZATION_KEY, authHeader === process.env.NOTIFICATION_AUTHORIZATION_KEY)
  if(authHeader && authHeader === process.env.NOTIFICATION_AUTHORIZATION_KEY){
    req.authentificated = true
    next()
  } else {
    res.status(401).json("Your are not allowed")
  }
}

lib.verifyEditPasswordToken = (req, res, next) => {
  const token = req.headers.token
  if(token){
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = user
      next()
    } catch(err) {
      res.status(403).json("Token is not valid!")
    }
  } else {
    res.status(403).json("Token required in request headers")
  }
}


module.exports = lib