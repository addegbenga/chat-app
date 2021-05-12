const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    from: {
      type: String,
    },
    userFrom:{
      type:String
    },
    userTo:{
      type:String
    },
    to: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
