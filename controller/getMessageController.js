const conversationModel = require("../model/conversationModel");
const messageModel = require("../model/messageModel");

const getMessageController = async (req, res) => {
    const { rid: receiverId } = req.params;
    const senderId = req.session.sid;
    try {
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages") ///extract create object of messages (message id stored)
        if (conversation)
            res.send(conversation.messages)
        else
            res.send(null)
    }
    catch (error) {
        if (error) {
            res.send({ error: "No message" })
            throw error
        }
    }


}
module.exports = getMessageController;