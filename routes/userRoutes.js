const express = require("express")
const router = express.Router();
const userController = require("../controller/userController")
const protectRoute = require("../middleware/protectRoute") 

router.get("/chats",protectRoute, userController)

module.exports = router