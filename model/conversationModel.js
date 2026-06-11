const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "message",
        default : [],
        required : true
    }]
},{timestamps : true})

const conversationModel = mongoose.model("conversation", conversationSchema);
module.exports = conversationModel;