const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

module.exports = {
    firebase: firebase,

    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
    },
    fbPushUser: function (user, username) {
        var users = firebase
            .database()
            .ref('users');

        // TODO: change to use username stored in database based on current users uid/email
        console.log(firebase.auth());

        var updates = {};
        updates[user.uid] = {
            email: user.email,
            username: username
        };
        users.update(updates);
    },

    fbPushMessage: function (user, message) {
        var messages = firebase
            .database()
            .ref('groups/HackerGroup-2018/events/messages/');

        var updates = {};
        updates[Date.now()] = {
            uid: user.uid,
            content: message
        };
        messages.update(updates);
    }
};