const mongoose = require("mongoose");
const schema = require("./../database/database.schema");
const mongo = require("./../database/database.service");
const ProductDetail = schema.product_detail;
const ChatMessage = schema.chat_message;

let send_message = async function (req, res) {
  let body = req.body;
  let senderId = body.SenderId;
  let receiverId = body.ReceiveId;
  try {
    let messageObj = new ChatMessage();
    messageObj.content = body.Message;
    messageObj.ReceiveId = body.ReceiveId;
    messageObj.SenderId = body.SenderId;
    await messageObj.save();
    // const messages = await ChatMessage.find({
    //   $or: [
    //     { SenderId: senderId, ReceiveId: receiverId },
    //     { SenderId: receiverId, ReceiveId: senderId },
    //   ],
    // }).sort({ createdAt: 'asc' });
    res.json({
      data: messageObj,
    });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
  };

  let read_history_messages = async function (req, res) {
    let body = req.body;
    let senderId = body.SenderId;
    let receiverId = body.ReceiveId;
    try {
      const messages = await ChatMessage.find({
        $or: [
          { SenderId: senderId, ReceiveId: receiverId },
          { SenderId: receiverId, ReceiveId: senderId },
        ],
      }).sort({ createdAt: 'asc' });
      res.json({
        data: messages,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
    };

  module.exports = {
    read_history_messages: read_history_messages,
    send_message: send_message
  };