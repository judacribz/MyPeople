const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

var fbInitialized = false;

module.exports = {
    firebase: firebase,

    fbInitialized: fbInitialized,

    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
        fbInitialized = true;
    },
    fbPushUser: function (user, username) {

        var users = firebase
            .database()
            .ref('users');

        // TODO: change to use username stored in database based on current users uid/email
        console.log(firebase.auth());

        var displayName;
        user.providerData.forEach(profile => {
            displayName = profile.displayName;
        });
        var updates = {};
        updates[user.uid] = {
            email: user.email,
            username: displayName //username
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