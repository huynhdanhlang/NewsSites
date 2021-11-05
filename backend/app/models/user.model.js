const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  }).plugin(mongoosePaginate)
);

module.exports = User;
