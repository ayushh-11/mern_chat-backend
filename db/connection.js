const mongoose = require("mongoose");

const connection = async() => {
    try{
       await mongoose.connect(process.env.connectionString)
       console.log("Connected to database")
    }
    catch (error) {
        console.log("Error Connecting to database : "+error);
    }
}

module.exports = connection