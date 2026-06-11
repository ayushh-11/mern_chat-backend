const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")

login = async(req, res) => {
    const { userName, password } = req.body;
    await userModel.findOne({ userName })
        .then(result => {
            if (result) {
                bcrypt.compare(password, result.password, (err, bcryptResult) => {
                    if (err) throw err;
                    if (bcryptResult) {
                        req.session.sid = result._id;
                        res.send({success:true,user : result});
                    }
                    else
                        res.send({error:"Incorrect password"})
                })
            }
            else{
                res.send({error : "Incorrect Username"})
            }
        })

}

module.exports = login;
