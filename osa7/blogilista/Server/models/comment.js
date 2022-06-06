const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
