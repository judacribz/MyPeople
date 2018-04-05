const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');


module.exports = {
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
    },

    fbPushMessage: function (username, message) {
        var messages = firebase.database().ref('groups/HackerGroup-2018/events/messages/');
        var updates = {};

        var email = "jo@joe.com";
        var user = firebase.auth().currentUser;
        if (user) {
            email = user.email;
        }

        updates[Date.now()] = {
            username: email,
            content: message
        };
        messages.update(updates);
    }
};