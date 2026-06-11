const express = require("express")
const router = express.Router();
const login = require("../controller/loginController")
const signup = require("../controller/signinController")
const logout = require("../controller/logoutController")


router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)

module.exports = router;
