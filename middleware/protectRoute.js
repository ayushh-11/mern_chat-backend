const mongoose = require("mongoose");

const protectRoute = (req, res, next) => {
    const userId = req.session?.sid || req.headers["x-user-id"];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        req.userId = userId.toString();
        return next();
    }

    res.status(401).send({error: "Authorization needed"})
}

module.exports = protectRoute
