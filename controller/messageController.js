const conversationModel = require("../model/conversationModel");
const messageModel = require("../model/messageModel");
const mongoose = require("mongoose")
const {getReceiverSocketId, io} = require("../socket/socket")

const messageController = async (req, res) => {
    //convert ids to objecttype
    const senderId = new mongoose.Types.ObjectId(req.session.sid);
    const receiverId = new mongoose.Types.ObjectId(req.params.rid);
    const message = req.body.msg;

    //query conversation
    let conversation = await conversationModel.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    //creating conversation
    if (!conversation){
        conversation = await conversationModel.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = new messageModel({
        senderId,
        receiverId,
        message
    })   
    
    if(newMessage)
        conversation.messages.push(newMessage._id)

    
    await Promise.all([newMessage.save(),
        conversation.save()
    ])

    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
    res.send("Message = " + message + senderId + receiverId)
}

module.exports = messageController;