// Importing dependencies
const express = require("express")
const mongoose = require("mongoose")
const { createAgent } = require('@forestadmin/agent')
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose')
const cors = require("cors")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const activitiesRoute = require("./routes/activities")
const chatsRoute = require("./routes/chats")
const notificationsRoute = require("./routes/notifications")
require("dotenv").config()

// Initializing the server
const server = express()

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Could not connect to MongoDB:", err))

// Import the requirements

// Create your Forest Admin agent
// This must be called BEFORE all other middlewares on the express app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  agentUrl: process.env.FOREST_AGENT_URL,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
})
  // Create your Mongoose datasource (using the default connection)
  .addDataSource(createMongooseDataSource(mongoose.connection))
  // Replace `myExpressApp` by your Express application
  .mountOnExpress(server)
  .start();

// Setting the server middlewares
server.use(cors())
server.use(express.json())
server.use("/users-avatar", express.static(__dirname + "/storage/app/public/users-avatar"))
server.use("/categories", express.static(__dirname + "/storage/app/public/category"))
server.use("/event-images", express.static(__dirname + "/storage/app/public/event-images"))
server.use("/events", express.static(__dirname + "/storage/app/public/events"))
server.use("/topics", express.static(__dirname + "/storage/app/public/topics"))

// Routing requests
server.use("/api/auth", authRoute)
server.use("/api/users", usersRoute)
server.use("/api/activities", activitiesRoute)
server.use("/api/chats", chatsRoute)
server.use("/api/notifications", notificationsRoute)

server.get("/", (req, res) => {
    res.status(200).json("Bonjour")
})
// Launching the server
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))