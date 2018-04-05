const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

module.exports = {
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
    },

    fbPushMessage: function (username, message) {
        var messages = firebase
            .database()
            .ref('groups/HackerGroup-2018/events/messages/');

        var email = 'joe@joe.com';
        firebase
            .auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    email = user.email;
                }
            });

        var updates = {};
        updates[Date.now()] = {
            username: email,
            content: message
        };
        messages.update(updates);
    }
};