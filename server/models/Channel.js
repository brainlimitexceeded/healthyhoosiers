const { model, Schema } = require("mongoose");

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Channel", mySchema);
