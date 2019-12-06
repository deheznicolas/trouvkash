const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    country: String,
    // color: String,
    // name: String,
    // icon: String,
    // url: String,
    // created_at: String,
    // updated_at: String,
});

module.exports = mongoose.model("Posts", PostSchema);
