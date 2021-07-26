const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// throws error if fields marked as unique are not unique
userSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("Users", userSchema);
