const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create list Schema
const ListSchema = new Schema({
    todo: {
        type: String
    }
});
//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    list: [ListSchema]
});


module.exports = User = mongoose.model('user', UserSchema);