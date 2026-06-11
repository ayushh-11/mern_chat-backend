const protectRoute = (req, res, next) => {
    if (req.session.sid)
        next();
    else
        res.status(401).send({error: "Authorization needed"})
}

module.exports = protectRoute