const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true }
});

const messageSchema = mongoose.model("Message", messageSchema);

module.exports = messageSchema;
