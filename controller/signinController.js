const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const { io } = require("../socket/socket");

const signup = async(req, res) => {
    const { fullName, userName, password, gender, profilePic } = req.body;

    try {
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.send({ error: "Username already exist" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            fullName,
            userName,
            password: hash,
            gender,
            profilePic: profilePic || "",
        });

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        io.emit("newUser", userWithoutPassword);
        res.send({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Signup failed. Please try again." });
    }
}

module.exports = signup;
