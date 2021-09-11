const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "author", "admin", "moderator"];
db.post = require("./posts.model");
db.topic_child = require("./topic_child.model");
// db.topic_parent = require("./topic_parent.model");

module.exports = db;
