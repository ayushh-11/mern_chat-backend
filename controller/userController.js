const userModel = require("../model/userModel")

const userController = (req, res) => {
    const filteredUser = userModel.find({_id : {$ne : req.session.sid}}).select("-password")
    .then(result => {
        if(result)
            res.send(result);
    })
    console.log(filteredUser)
}
module.exports = userController;