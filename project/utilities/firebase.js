const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');
const cheerio = require('cheerio');
const $ = cheerio.load('<div id="chatArea">...</div>');

module.exports = {
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
    },

    fbPushMessage: function (username, message) {
        var messages = firebase.database().ref('groups/HackerGroup-2018/events/messages/');
        var updates = {};
        updates[Date.now()] = {
            username: "Joe",
            content: message
        };
        messages.update(updates);
    }
};