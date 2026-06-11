logout = (req, res) => {
    req.session.destroy((err) => {
        if (err)
            throw err;
        else{
            
            res.send("User Logout")
        }
    })
    
} 

module.exports = logout;