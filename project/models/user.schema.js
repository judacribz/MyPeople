const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        index: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    }
}, {
    collection: 'users'
});

module.exports = userSchema;