const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupSchema = new Schema({
    channels: [{
        name: String,
        messages: [{
            username: String,
            content: String,
            timestamp: String
        }]
    }],
    members: [String]
}, {
    collection: 'groups'
});

module.exports = groupSchema;