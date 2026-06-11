const express = require("express")
const router = express.Router();
const messageController = require("../controller/messageController")
const getMessageController = require("../controller/getMessageController")
const protectRoute = require("../middleware/protectRoute")

router.post("/send/:rid", protectRoute, messageController);
router.get("/:rid",protectRoute, getMessageController);

module.exports = router;